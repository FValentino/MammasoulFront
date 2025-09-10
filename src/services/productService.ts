import axios from "axios";
import { api } from "../client";
import type { Product } from "../types/product";

//get all products
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

//get products in sale
export async function getProductsInSale():Promise<Product[]>{
  try {
    const result = await api.get<Product[]>("/products/sale")

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

//find product by id
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

//find products by category
export async function findProductsByCategory(idCategory:number):Promise<Product[]>{
  try {
    const result = await api.get<Product[]>(`/products/category/${idCategory}`)

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