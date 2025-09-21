import { useMutation } from "@tanstack/react-query";
import type { Purchase } from "../../types";
import { updatePurchase } from "../../services";

export function useUpdatePurchase() {
  return useMutation<Purchase, Error, Purchase>({
    mutationFn: (data: Purchase) => updatePurchase(data),
  })
}
