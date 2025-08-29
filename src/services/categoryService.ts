import type { Category } from "../types/category";

const categoriesData =[
  {
    id: 1,
    name: "Bolsos",
    image: "/elegant-recycled-leather-tote.png",
  },
  {
    id: 2,
    name: "Carteras",
    image: "/placeholder-ervoi.png",
  },
  {
    id: 3,
    name: "Mochilas",
    image: "/urban-eco-friendly-green-backpack.png",
  },
  {
    id: 4,
    name: "Bandoleras",
    image: "/artisanal-recycled-leather-bag.png",
  },
  {
    id: 5,
    name: "Clutches",
    image: "/placeholder-jhf58.png",
  },
  {
    id: 6,
    name: "Accesorios",
    image: "/modern-sustainable-fanny-pack.png",
  },
]

//get all categories
export function getAllcategories():Category[]{
  return(categoriesData)
}

//find Category by id
export function getCategoryById(id:number):Category|string{
  const category = categoriesData.find((cat)=>cat.id === id)
  if (category){
    return (category);
  }else{
    return "Categoryo no encontrado"
  }
}
