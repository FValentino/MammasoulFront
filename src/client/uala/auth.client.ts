export class AuthClient {
  private url = "https://auth.developers.ar.ua.la/v2/api/auth/token";

  constructor(
    private username: string,
    private clientId: string,
    private clientSecretId: string
  ) {}

  async getToken() {
    const payload = {
      username: this.username,
      client_id: this.clientId,
      client_secret_id: this.clientSecretId,
      grant_type: "client_credentials",
    };

    console.log("UALA AUTH PAYLOAD:", payload);

    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("RESPONSE AUTH:", response.status);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("UALA AUTH ERROR BODY:", errorBody);
      throw new Error("Error obteniendo token Ualá");
    }

    return response.json();
  }
}
