import logger from './logger';
import dotenv from 'dotenv';
import mongoose from 'mongoose'

dotenv.config();

type SecretValue = {
    version: Number;
    value: any;
    created_at: String;
    created_by_id: String;
}

type Secret = {
    name: String;
    type: String;
    latest_version: Number;
    created_at: String;
    created_by_id: String;
    static_version: SecretValue;
}

type MongoDBCredentials = {
    DB_USER: string;
    DB_PASSWORD: string;
}


async function authVault(): Promise<string> {
    const clientID = process.env.VAULTCREDENTIALS_CLIENT_ID;
    const clientSecret = process.env.VAULTCREDENTIALS_CLIENT_SECRET;
    const authUrl = 'https://auth.idp.hashicorp.com/oauth2/token';

    const params = new URLSearchParams({
        client_id: clientID!,
        client_secret: clientSecret!,
        grant_type: 'client_credentials',
        audience: 'https://api.hashicorp.cloud'
    });

    try {
        const response = await fetch(authUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params
        });
        const data = await response.json();
        logger.info("Authorized successfully for accessing hashicorp vault.")
        return data.access_token;
    } catch (error) {
        throw new Error(`Error authenticating with HashiCorp: ${error}`);
    }
}


async function getVaultData(): Promise<{ secrets: Secret[] }> {
    const vaultAuthToken = await authVault();
    const vaultUrl = "https://api.cloud.hashicorp.com/secrets/2023-11-28/organizations/cbe9ad8b-a431-4de9-a1a3-c8a955e69019/projects/5e0dc991-3bac-4f17-92f7-2cafaf686b5a/apps/abhishektatachar-portfolio/secrets:open"

    try {
        const vaultResponse = await fetch(vaultUrl, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${vaultAuthToken}`
            }
        });
        const vaultData = await vaultResponse.json();
        logger.info("Successfully retrieved data from vault");
        return vaultData;
    } catch (error) {
        throw new Error(`Error fetching data from vault: ${error}`);
    }
}

async function getMongoDBCredentials(): Promise<MongoDBCredentials> {
    try {
        const secrets: Secret[] = (await getVaultData()).secrets;
        let mongoDBCredentials: MongoDBCredentials = {
            DB_USER: '',
            DB_PASSWORD: ''
        };

        secrets.forEach((secret) => {
            if (secret?.name === "DB_USER") {
                mongoDBCredentials.DB_USER = secret.static_version.value;
            } 
            if (secret?.name === "DB_PASSWORD") {
                mongoDBCredentials.DB_PASSWORD = secret.static_version.value;
            }
        });

        return mongoDBCredentials;
    } catch (error) {
        throw new Error(`Failed to retrieve MongoDB credentials from vault: ${error}`);
    }
}


export async function connectToDB(): Promise<void> {
    try {
        const credentials = await getMongoDBCredentials();
        let mongoDbUrl = process.env.MONGODB_URL;
        mongoDbUrl = mongoDbUrl?.replace("<db_username>", encodeURIComponent(credentials.DB_USER)).replace("<db_password>", encodeURIComponent(credentials.DB_PASSWORD));
        await mongoose.connect(mongoDbUrl as string);
        logger.info("MongoDB Connected Successfully!");
        return;
    } catch (error) {
        throw new Error(`MongoDB Connection Failed: ${error}`);
    }
}