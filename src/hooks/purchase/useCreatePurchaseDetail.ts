import { useMutation } from "@tanstack/react-query";
import type { PurchaseDetail } from "../../types";
import { createPurchaseDetail } from "../../services";

export function useCreatePurchaseDetail() {
  return useMutation<PurchaseDetail, Error, PurchaseDetail>({
    mutationFn: (data: PurchaseDetail) => createPurchaseDetail(data),
  })
}
