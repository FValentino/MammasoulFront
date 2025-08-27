import type { Product } from "../types/product"
import product from "../assets/images/producto-generico.webp"

export const productsData:Product[] = [
  {
    id: 1,
    name: "Bolso Tote Elegante",
    price: 120,
    image: product,
    stock: 1
  },
  {
    id: 2,
    name: "Cartera Minimalista",
    price: 45,
    image: product,
    stock: 2
  },
  {
    id: 3,
    name: "Mochila Urbana",
    price: 90,
    image: product,
    stock: 3
  },
  {
    id: 4,
    name: "Bandolera Artesanal",
    price: 75,
    image: product,
    stock: 4
  },
  {
    id: 5,
    name: "Clutch de Noche",
    price: 60,
    image: product,
    stock: 5
  },
  {
    id: 6,
    name: "Riñonera Moderna",
    price: 50,
    image: product,
    stock: 6
  },
]
