import { AuthClient } from "@/client/uala/auth.client";
import dotenv from 'dotenv';

dotenv.config();

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export class UalaAuthService {
  private static token: string | null = null;
  private static expiresAt: number = 0;

  static async getAccessToken(): Promise<string> {
    const now = Date.now();

  
    if (this.token && now < this.expiresAt) {
      return this.token;
    }

    const authClient = new AuthClient(
      process.env.UALA_USERNAME!,
      process.env.UALA_CLIENT_ID!,
      process.env.UALA_SECRET_ID!
    );

    const response: TokenResponse = await authClient.getToken();

    this.token = response.access_token;
    this.expiresAt = now + response.expires_in * 1000; 

    return this.token;
  }
}

