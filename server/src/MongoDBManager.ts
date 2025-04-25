import logger from './logger';
import dotenv from 'dotenv';
import mongoose from 'mongoose'
import { VaultManager } from './VaultManager';

dotenv.config({ path: require('path').resolve(process.cwd(), '.env') });

type MongoDBCredentials = {
    DB_USER: string;
    DB_PASSWORD: string;
}

export class MongoDBManager {

    private vaultClientId: string;
    private vaultClientSecret: string;
    private vaultUrl: string;
    private mongoDBUrl: string;

    constructor() {
        this.vaultClientId = process.env.VITE_VAULTCREDENTIALS_CLIENT_ID || '';
        this.vaultClientSecret = process.env.VITE_VAULTCREDENTIALS_CLIENT_SECRET || '';
        this.vaultUrl = process.env.VITE_VAULTCREDENTIALS_URL || '';
        this.mongoDBUrl = process.env.VITE_MONGODB_URL || '';
    }

    private async getMongoDBCredentials(): Promise<MongoDBCredentials> {
        let mongoDBCredentials: MongoDBCredentials = {
            DB_USER: '',
            DB_PASSWORD: ''
        };
        try {
            if (this.vaultClientId === '' || this.vaultClientSecret === '') {
                throw new Error('Vault client ID or client secret is undefined');
            }
            const vaultManager = new VaultManager(this.vaultClientId, this.vaultClientSecret);
            const vaultSecrets = await vaultManager.getVaultSecrets(this.vaultUrl);
            vaultSecrets.forEach((secret) => {
                if (secret?.name === "DB_USER") {
                    mongoDBCredentials.DB_USER = secret.static_version.value;
                } 
                if (secret?.name === "DB_PASSWORD") {
                    mongoDBCredentials.DB_PASSWORD = secret.static_version.value;
                }
            });

        }
        catch (error) {
            throw new Error(`Failed to retrieve MongoDB credentials from vault: ${error}`);
        }
        return mongoDBCredentials;
    } 

    async connectToDB(): Promise<void> {
        try {
            const credentials: MongoDBCredentials = await this.getMongoDBCredentials();
            if (credentials.DB_USER == '' || credentials.DB_PASSWORD == ''){
                throw new Error('Failed to fetch MongoDB credentials');
            }
            this.mongoDBUrl = this.mongoDBUrl?.replace("<db_username>", encodeURIComponent(credentials.DB_USER)).replace("<db_password>", encodeURIComponent(credentials.DB_PASSWORD));
            await mongoose.connect(this.mongoDBUrl as string);
            logger.info("MongoDB Connected Successfully!");
            return;
        } catch (error) {
            throw new Error(`MongoDB Connection Failed: ${error}`);
        }
    }
}