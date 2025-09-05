/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { ProductCart } from "../types/product"

// 1. se define la forma de los datos del contexto
interface CartContextType{
  cart: ProductCart[];
  addToCart: (product: ProductCart) => void;
  updateProductQuantity: (index: number, newQuantity: number) => void
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  cartOpen: boolean;           
  setCartOpen: (open: boolean) => void;
}

interface ChildrenProps{
  children: ReactNode;
}

// 2. se crea el context
const CartContext = createContext<CartContextType | null>(null)

//3. provider: envuelve la app y da acceso al carrito
export function CartProvider({children}:ChildrenProps){
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<ProductCart[]>(()=>{
    const cartLocalStorage = localStorage.getItem("shoppingCart");
    return cartLocalStorage ? JSON.parse(cartLocalStorage) : []
  })
  

  useEffect(()=>{
    const cartString = JSON.stringify(cart)  
    localStorage.setItem("shoppingCart", cartString)
  },[cart]);

  const addToCart = (product : ProductCart) =>{
    if (cart.find((prod)=>prod.id === product.id)){
      window.alert("El producto seleccionado ya se encuentra en el carrito.\n \nPuede modificar la cantidad ingresando a el")
    }else{
      setCart((prev) => [...prev, product])
    window.alert("Producto agregado al carrito")
  }
  }

  const removeFromCart = (id : number)=>{
    setCart((prev) => prev.filter((product : ProductCart) => product.id !== id))
  }

  const updateProductQuantity = (index : number, newQuantity : number) => {
    const cartAux = [...cart];
    cartAux[index].quantity = newQuantity;

    setCart(cartAux)
  }

  const clearCart = () => {setCart([])}

  return (
    <CartContext.Provider value ={{
      cart, addToCart, removeFromCart, updateProductQuantity, clearCart, cartOpen, setCartOpen}}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};