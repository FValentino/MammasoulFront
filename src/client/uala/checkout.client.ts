export interface CheckoutPayload {
  amount: string;
  description: string;
  notification_url: string;
  callback_fail: string;
  callback_success: string;
  external_reference: string;
}

export interface CheckoutResponse {
  uuid: string;
  amount: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  external_reference: string;
  links: {
    checkout_link: string;
    success: string;
    failed: string;
  };
}

export class CheckoutClient {
  private url = "https://checkout.developers.ar.ua.la/v2/api/checkout";

  constructor(private accessToken: string) {}

  async createCheckout(payload: CheckoutPayload): Promise<CheckoutResponse> {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Ualá error: ${error}`);
    }

    return response.json();
  }
}
