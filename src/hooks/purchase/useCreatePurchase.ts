import { useMutation } from "@tanstack/react-query";
import type { Purchase } from "../../types";
import { createPurchase } from "../../services";

export function useCreatePurchase() {
  return useMutation<Purchase, Error, Purchase>({
    mutationFn: (data: Purchase) => createPurchase(data),
  })
}
