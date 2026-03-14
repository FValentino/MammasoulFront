"use client"

import { useCart } from "@/context";
import { ProductCart } from "@/types/product.type";
import { Plus } from "lucide-react";

interface Props{
  product: ProductCart;
}

export default function AddToCartButton ({product}:Props) {
  const {addToCart} = useCart();

  return (
    <button onClick={()=>{ addToCart(product)}}
      className={`flex items-center justify-around w-full text-md bg-[#525126] text-white font-bold 
        py-2 my-2 px-2 rounded hover:bg-[#525126]/90 hover:cursor-pointer transition-colors`} 
    >
      <Plus className="w-8 h-8"/> Agregar al carrito
    </button>
  );
}