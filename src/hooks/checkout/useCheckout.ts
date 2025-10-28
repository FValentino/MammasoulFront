import { useState } from "react";
import type { CheckoutResponse, PaymentParams } from "../../types"; 
import { useCreateCheckout } from "./useCreateCheckout";
import { useCart } from "../../context";
import { useNavigate } from "react-router-dom";

export function useCheckout() {
  const { mutate: createCheckout } = useCreateCheckout();
  const { total, cart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const visitorData = localStorage.getItem("visitor");
  const client = visitorData ? JSON.parse(visitorData) : null;

  const checkout = () => {

    if (!client) return console.error("No hay cliente");
    setIsLoading(true); 

    const description = cart.reduce(
      (partial, product) => partial + " " + product.name,
      ""
    );

    const data: PaymentParams = {
      clientData: client,
      cartDetails: cart,
      total: total,
      description: description
    }

    createCheckout(data, {
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
    
  };

  return { checkout, isLoading };
}
