import type { Product } from "../types/product";
import product from "../assets/images/producto-generico.webp"

const productsData: Product[] = [
  { id: 1, name: "Bolso Tote Elegante", price: 120, image: product, stock: 1, category: 1 }, 
  { id: 2, name: "Cartera Minimalista", price: 45, image: product, stock: 2, category: 2 }, 
  { id: 3, name: "Mochila Urbana", price: 90, image: product, stock: 3, category: 3 }, 
  { id: 4, name: "Bandolera Artesanal", price: 75, image: product, stock: 4, category: 4 }, 
  { id: 5, name: "Clutch de Noche", price: 60, image: product, stock: 5, category: 5 }, 
  { id: 6, name: "Riñonera Moderna", price: 50, image: product, stock: 6, category: 6 }, 
  { id: 7, name: "Bolso Satchel Clásico", price: 130, image: product, stock: 2, category: 1},
  { id: 8, name: "Bolso Hobo de Cuero", price: 150, image: product, stock: 3, category: 1},
  { id: 9, name: "Cartera Compacta", price: 40, image: product, stock: 5, category: 2},
  { id: 10, name: "Cartera de Mano", price: 55, image: product, stock: 2, category: 2},
  { id: 11, name: "Mochila Escolar", price: 80, image: product, stock: 6, category: 3},
  { id: 12, name: "Mochila de Viaje", price: 95, image: product, stock: 4, category: 3},
  { id: 13, name: "Bandolera Vintage", price: 70, image: product, stock: 3, category: 4},
  { id: 14, name: "Bandolera de Tela", price: 65, image: product, stock: 2, category: 4},
  { id: 15, name: "Clutch Elegante", price: 75, image: product, stock: 3, category: 5},
  { id: 16, name: "Clutch de Fiesta", price: 85, image: product, stock: 4, category: 5},
  { id: 17, name: "Riñonera Deportiva", price: 55, image: product, stock: 5, category: 6},
  { id: 18, name: "Riñonera Compacta", price: 45, image: product, stock: 2, category: 6},
  { id: 19, name: "Bolso Mochila Convertible", price: 140, image: product, stock: 3, category: 1},
  { id: 20, name: "Cartera de Cuero Clásica", price: 60, image: product, stock: 4, category: 2},
  { id: 21, name: "Mochila Casual", price: 85, image: product, stock: 3, category: 3},
];


//get all products
export function getAllProducts():Product[]{
  return(productsData)
}

//find product by id
export function getProductById(id:number):Product | null{
  const product = productsData.find((prod)=>prod.id === id)
  if (product){
    return (product);
  }else{
    return null
  }
}

//find products by category
export function findProductsByCategory(idCategory:number):Product[]{
  const products = productsData.filter((product)=>product.category === idCategory)
  return (products);
}