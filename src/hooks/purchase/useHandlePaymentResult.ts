import { useEffect, useState } from "react";
import type { Visitor, ProductCart, Purchase, PurchaseDetail } from "../../types"; 
import { useCreatePurchaseDetail } from ".";
import { useUpdateToClient } from "../visitor/useUpdateToClient";
import { useUpdatePurchase } from "./useUpdatePurchase";

interface PaymentResultState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useHandlePaymentResult(approved: boolean) {
  const { mutate: createPurchaseDetail } = useCreatePurchaseDetail();
  const { mutate: updateVisitor } = useUpdateToClient();
  const { mutate: updatePurchase } = useUpdatePurchase();

  const [state, setState] = useState<PaymentResultState>({
    loading: false,
    error: null,
    success: false,
  });

  useEffect(() => {
    if (!approved) return;

    const localPurchase = localStorage.getItem("purchase");
    const localVisitor = localStorage.getItem("visitor");
    const localCart = localStorage.getItem("shoppingCart");

    const purchase: Purchase | null = localPurchase ? JSON.parse(localPurchase) : null;
    const visitor: Visitor | null = localVisitor ? JSON.parse(localVisitor) : null;
    const cart: ProductCart[] | null = localCart ? JSON.parse(localCart) : null;

    if (!visitor || !purchase || !cart || cart.length === 0) return;

    setState({ loading: true, error: null, success: false });

    try {
      updateVisitor(visitor);
      updatePurchase(purchase);

      let completed = 0;
      let hasError = false;

      cart.forEach((product) => {
        const purchaseData : PurchaseDetail = {
          purchaseId: Number(purchase.id),
          productId: product.id,
          quantity: product.quantity,
          price: product.price,
          subtotal: Number(product.price) * Number(product.quantity),
        };

        createPurchaseDetail(purchaseData, {
          onSuccess: () => {
            completed += 1;
            if (completed === cart.length && !hasError) {
              setState({ loading: false, error: null, success: true });
            }
          },
          onError: (error) => {
            hasError = true;
            console.error("Error creando detalle de compra:", error);
            setState({ loading: false, error: String(error), success: false });
          },
        });
      });
    } catch (err) {
      console.error("Error procesando el pago:", err);
      setState({ loading: false, error: String(err), success: false });
    }
  }, [approved, createPurchaseDetail, updateVisitor, updatePurchase]);

  return state;
}
