import type { CheckoutPayload, CheckoutResponse } from "../types";
import axios from "axios";
import { api } from "../client"


export async function createCheckout(data: CheckoutPayload): Promise<CheckoutResponse> {

  const localPurchase = localStorage.getItem("visitor");
  const purchase = localPurchase ? JSON.parse(localPurchase) : null;

  try{
    const result = await api.post(`/purchases/${purchase.id}/checkout/uala`, data)

    if(!result){
      throw new Error('error creating checkaout')
    }
    
    return result.data ;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        console.error("La petición tardó demasiado (timeout).");
      } else {
        console.error("Error de Axios:", error.message);
      }
    }
    console.log("Error inesperado: ", error)

    throw error;
  }
}