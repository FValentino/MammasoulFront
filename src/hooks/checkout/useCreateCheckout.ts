import { useMutation } from "@tanstack/react-query";
import type { CheckoutPayload, CheckoutResponse } from "../../types";
import { createCheckout } from "../../services";



export function useCreateCheckout() {
  return useMutation<CheckoutResponse, Error, CheckoutPayload>({
    mutationFn: (data: CheckoutPayload) => createCheckout(data),
  })
}
