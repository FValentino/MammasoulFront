import type { Purchase } from "../types";
import axios from "axios";
import { api } from "../client"


export async function createPurchase(data: Purchase): Promise<Purchase> {
  try{
    const result = await api.post("/purchase/create", data)

    if(!result){
      throw new Error('error creating purchase')
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