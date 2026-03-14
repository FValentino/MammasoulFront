import { AuthClient } from "@/client/uala/auth.client";

interface TokenResponse {
  access_token: string;
  expires_in: number;
}

export class UalaAuthService {
  private static token: string | null = null;
  private static expiresAt = 0;

  static async getAccessToken(): Promise<string> {
    const now = Date.now();

    if (this.token && now < this.expiresAt) {
      return this.token;
    }

    const client = new AuthClient(
      process.env.UALA_USERNAME!,
      process.env.UALA_CLIENT_ID!,
      process.env.UALA_SECRET_ID!
    );

    const response: TokenResponse = await client.getToken();

    this.token = response.access_token;
    this.expiresAt = now + response.expires_in * 1000;

    return this.token;
  }
}
