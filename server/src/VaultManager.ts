import logger from './logger';

export interface SecretValue {
    version: number;
    value: any;
    created_at: string;
    created_by_id: string;
}

export interface Secret {
    name: string;
    type: string;
    latest_version: number;
    created_at: string;
    created_by_id: string;
    static_version: SecretValue;
}

export class VaultManager {
    private accessToken: string;

    constructor(private clientId: string, private clientSecret: string) {
        this.accessToken = '';
    }

    private async initialize(): Promise<void> {
        const authUrl = 'https://auth.idp.hashicorp.com/oauth2/token';
        const body = new URLSearchParams({
            client_id: this.clientId!,
            client_secret: this.clientSecret!,
            grant_type: 'client_credentials',
            audience: 'https://api.hashicorp.cloud'
        });
        try {
            const response = await fetch(authUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: body
            });
            const data = await response.json();
            logger.info("Authorized successfully for accessing hashicorp vault.")
            this.accessToken = data.access_token;
        } catch (error) {
            throw new Error(`Error authenticating with HashiCorp: ${error}`);
        }
    }

    async getVaultSecrets(vaultUrl: string): Promise<Secret[]> {
        await this.initialize();
        try {
            const vaultResponse = await fetch(vaultUrl, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.accessToken}`
                }
            });
            const vaultData = await vaultResponse.json();
            logger.info("Successfully retrieved data from vault");
            return vaultData['secrets'];
        } catch (error) {
            throw new Error(`Error fetching data from vault: ${error}`);
        }
    }
}