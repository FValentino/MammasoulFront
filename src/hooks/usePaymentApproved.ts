// hooks/useHandlePaymentResult.ts
import { useEffect } from "react";
import { useCreateClient, useCreatePurchase } from "./index";
import type { Client, ProductCart, Purchase, PurchaseDetail } from "../types"; 
import { useCreatePurchaseDetail } from "./purchase";

export function useHandlePaymentResult(approved: boolean) {
  const { mutate: createClient } = useCreateClient();
  const { mutate: createPurchase } = useCreatePurchase();
  const { mutate: createPurchaseDetail } = useCreatePurchaseDetail();

  useEffect(() => {
    if (!approved) return; 

    const localClient = localStorage.getItem("client");
    const localCart = localStorage.getItem("shoppingCart")

    let client: Client | null = localClient ? JSON.parse(localClient) : null;
    const cart: ProductCart[] | null = localCart ? JSON.parse(localCart) : null;

    if (!client) return;

    createClient(client, {
      onSuccess: (newClient: Client) => {
        client = newClient;
        console.log("Cliente creado:", newClient);

        createPurchase(
          { clientId: Number(newClient.id), total: 0 },
          {
            onSuccess: (purchase: Purchase) => {
              console.log("Compra creada:", purchase);
              
              cart?.map((product)=>{
                const purchaseData = {
                  purchaseId: Number(purchase.id),
                  productId: product.id,
                  quantity: product.quantity,
                  price: product.price,
                  subtotal: Number(product.price) * Number(product.quantity)
                }

                createPurchaseDetail(purchaseData, {
                  onSuccess: (purchaseDetail: PurchaseDetail) =>{
                    console.log("Detalle creado: ", purchaseDetail)
                  },
                  onError: (error) => {
                    console.error("Error creando compra:", error);
                  }
                })
              })
              
            },
            onError: (error) => {
              console.error("Error creando compra:", error);
            },
          }
        );
      },
      onError: (error) => {
        console.error("Error creando cliente:", error);
      },
    });
  }, [approved, createClient, createPurchase, createPurchaseDetail]);
}
