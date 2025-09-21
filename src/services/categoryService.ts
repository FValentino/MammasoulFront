import type { Category } from "../types";
import axios from "axios";
import { api } from "../client"


export async function getAllActiveCategories(): Promise<Category[]> {
  try{
    const result = await api.get<Category[]>("/categories", {params: {is_active: true}})

    if(!result){
      throw new Error('Categories not found')
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

export async function getCategoryById(id:number):Promise<Category>{
  try{
    const result = await api.get(`/categories/${id}`)
    if (!result){
      throw new Error ('Category not found')
    }
    return result.data;
  }catch(error){
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
