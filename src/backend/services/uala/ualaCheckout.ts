import { CheckoutClient } from "@/client/uala/checkout.client";
import { UalaAuthService } from ".";

export class UalaCheckoutService {
  static async createCheckout(
    amount: string,
    description: string,
    notification_url: string,
    callback_fail: string,
    callback_success: string,
    external_reference: string
  ) {
    
    const accessToken = await UalaAuthService.getAccessToken();

    const checkoutClient = new CheckoutClient(accessToken);

    return checkoutClient.createCheckout({
      amount,
      description,
      notification_url,
      callback_fail,
      callback_success,
      external_reference
    });
  }
}
