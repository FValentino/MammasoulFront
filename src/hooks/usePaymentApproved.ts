// hooks/useHandlePaymentResult.ts
import { useEffect } from "react";
import { useCreateClient, useCreatePurchase } from "./index";
import type { Client, Purchase } from "../types"; 

export function useHandlePaymentResult(approved: boolean) {
  const { mutate: createClient } = useCreateClient();
  const { mutate: createPurchase } = useCreatePurchase();

  useEffect(() => {
    if (!approved) return; 

    const localClient = localStorage.getItem("client");
    let client: Client | null = localClient ? JSON.parse(localClient) : null;

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
  }, [approved, createClient, createPurchase]);
}
