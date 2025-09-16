import type { PurchaseDetail } from "../types";
import axios from "axios";
import { api } from "../client"


export async function createPurchaseDetail(data: PurchaseDetail): Promise<PurchaseDetail> {
  try{
    const result = await api.post("/purchase/detail/create", data)

    if(!result){
      throw new Error('error creating purchaseDetail')
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

    throw error;
  }
}