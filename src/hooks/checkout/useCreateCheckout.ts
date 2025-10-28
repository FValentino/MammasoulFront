import { useMutation } from "@tanstack/react-query";
import type { CheckoutResponse, PaymentParams } from "../../types";
import { createCheckout } from "../../services";

export function useCreateCheckout() {
  return useMutation<CheckoutResponse, Error, PaymentParams>({
    mutationFn: (data: PaymentParams) => createCheckout(data),
  })
}
