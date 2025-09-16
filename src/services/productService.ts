import axios from "axios";
import { api } from "../client";
import type { Product } from "../types/product";

export async function getAllProducts():Promise<Product[]>{

  try{
    const result = await api.get<Product[]>("/products/active")

    if (!result) {
      throw new Error ("Products not found")
    }
    return result.data

  } catch (error){
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

export async function getFeaturedProducts():Promise<Product[]>{
  try {
    const result = await api.get<Product[]>("/products/feature")

    if (!result){
      throw new Error ("Products not found")
    }

    return result.data;
  } catch (error){
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

export async function getProductById(id:number):Promise<Product>{
 try {
    const result = await api.get<Product>(`/products/${id}`)

    if (!result){
      throw new Error ("Product not found")
    }

    return result.data;
  } catch (error){
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
