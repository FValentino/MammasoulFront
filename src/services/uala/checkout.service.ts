import { CheckoutClient } from "@/client/uala/checkout.client";
import { UalaAuthService } from "./auth.service";

export class UalaCheckoutService {
  static async createCheckout(
    amount: string,
    description: string,
    notification_url: string,
    callback_fail: string,
    callback_success: string,
    external_reference: string
  ) {
    const token = await UalaAuthService.getAccessToken();
    const client = new CheckoutClient(token);

    return client.createCheckout({
      amount,
      description,
      notification_url,
      callback_fail,
      callback_success,
      external_reference,
    });
  }
}
