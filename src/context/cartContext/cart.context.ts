import { createContext, useContext } from "react"
import type { ProductCart } from "../../types"

// 1. se define la forma de los datos del contexto
interface CartContextType{
  cart: ProductCart[];
  addToCart: (product: ProductCart) => void;
  updateProductQuantity: (index: number, newQuantity: number) => void
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  cartOpen: boolean;           
  setCartOpen: (open: boolean) => void;
  total: number;
}


export const CartContext = createContext<CartContextType | null>(null)

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};