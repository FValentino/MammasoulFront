import { useState } from "react";
import type { CheckoutPayload, CheckoutResponse, Purchase } from "../../types"; 
import { useCreateCheckout } from "./useCreateCheckout";
import { useCart } from "../../context";
import { useCreatePurchase } from "../purchase";
import { useNavigate } from "react-router-dom";

export function useCheckout() {
  const { mutate: createCheckout } = useCreateCheckout();
  const { mutate: createPurchase } = useCreatePurchase();
  const { total, cart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const visitorData = localStorage.getItem("visitor");
  const client = visitorData ? JSON.parse(visitorData) : null;
  console.log("VISITOR:", client)

  const checkout = () => {
    console.log("VISITOR:", client)
    if (!client) return console.error("No hay cliente");
    setIsLoading(true); 

    const description = cart.reduce(
      (partial, product) => partial + " " + product.name,
      ""
    );

    const purchase: Purchase = {
      clientId: client.id,
      total: total
    };

    createPurchase(purchase, {
      onSuccess: (newPurchase: Purchase) => {
        const payload: CheckoutPayload = {
          amount: String(total),
          description,
          externalReference: "order_" + newPurchase.id
        };
        localStorage.setItem("purchase", JSON.stringify(newPurchase))

        createCheckout(payload, {
          onSuccess: (newCheckout: CheckoutResponse) => {
            window.open(newCheckout.links.checkout_link, "_blank", "noopener,noreferrer");
            setIsLoading(false);
            navigate("/");
          },
          onError: (error) => {
            console.error("Error creando el checkout:", error);
            setIsLoading(false); 
          },
        });
      },
      onError: (error) => {
        console.error("Error creando la compra:", error);
        setIsLoading(false); // 🔹 Termina la carga incluso si hay error
      },
    });
  };

  return { checkout, isLoading };
}
