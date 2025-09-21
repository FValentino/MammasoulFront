import type { Purchase } from "../types";
import axios from "axios";
import { api } from "../client"


export async function createPurchase(data: Purchase): Promise<Purchase> {
  try{
    const result = await api.post("/purchases/", data)

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

export async function updatePurchase(data: Purchase): Promise<Purchase> {
  try{
    const result = await api.post(`/purchases/${data.id}`, data)

    if(!result){
      throw new Error('error updateing purchase')
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