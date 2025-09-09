import type { Category } from "../types";
import axios from "axios";
import { api } from "../client"

const categoriesData =[
  {
    id: 1,
    name: "Bolsos",
    image: "/elegant-recycled-leather-tote.png",
    active: true
  },
  {
    id: 2,
    name: "Carteras",
    image: "/placeholder-ervoi.png",
    active: true
  },
  {
    id: 3,
    name: "Mochilas",
    image: "/urban-eco-friendly-green-backpack.png",
    active: true
  },
  {
    id: 4,
    name: "Bandoleras",
    image: "/artisanal-recycled-leather-bag.png",
    active: true
  },
  {
    id: 5,
    name: "Clutches",
    image: "/placeholder-jhf58.png",
    active: true
  },
  {
    id: 6,
    name: "Accesorios",
    image: "/modern-sustainable-fanny-pack.png",
    active: true
  },
]

// get all categories
export async function getAllCategories(): Promise<Category[]> {
  try{
    const result = await api.get<Category[]>("/categories")

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

// get all active categories
export async function getAllActiveCategories(): Promise<Category[]> {
  try{
    const result = await api.get<Category[]>("/categories")

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

//find Category by id
export function getCategoryById(id:number):Category|null{
  const category = categoriesData.find((cat)=>cat.id === id)
  if (category){
    return (category);
  }else{
    return null;
  }
}
