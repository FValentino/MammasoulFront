import type { Visitor } from "../types";
import axios from "axios";
import { api } from "../client"


export async function createVisitor(data: Visitor): Promise<Visitor> {
  try{
    const result = await api.post("/visitors", data)

    if(!result){
      throw new Error('Visitor not found')
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

export async function updateVisitor(data: Visitor): Promise<Visitor> {
  try{
    const result = await api.patch(`/visitors/${data.id}`, data)

    if(!result){
      throw new Error('Visitor not found')
    }
    
    return result.data ;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error en Axios:", error.message);

      if (error.response) {
        // El servidor respondió con un error
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
      } else if (error.request) {
        // La petición se hizo pero no hubo respuesta
        console.error("No se recibió respuesta del servidor.");
      } else if (error.code === "ECONNABORTED") {
        console.error("La petición tardó demasiado (timeout).");
      }
    } else {
      console.error("Error inesperado:", error);
    }

    throw error;
  }
}

