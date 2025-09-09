/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { ProductCart } from "../types/product"
import type { NotificationType } from "../types/notification";
import {Notification} from "../components/common/ui";


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
  const [notification, setNotification] = useState<NotificationType | null>(null);
  

  useEffect(()=>{
    const cartString = JSON.stringify(cart)  
    localStorage.setItem("shoppingCart", cartString)
  },[cart]);

  const addToCart = (product : ProductCart) =>{
    if (cart.find((prod)=>prod.id === product.id)){
      setNotification({
        showNotification: true,
        bodyText: "El producto ya se encuentra en el carrito",
        color: false
      })
    }else{
      setCart((prev) => [...prev, product])
      setNotification({
        showNotification: true,
        bodyText: "El producto se agrego al carrito",
        color: true
      })
    }
  }

  const removeFromCart = (id : number)=>{
    setCart((prev) => prev.filter((product : ProductCart) => product.id !== id))
    setNotification({
      showNotification: true,
      bodyText: "Producto removido",
      color: false
    })
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
      <Notification notification={notification} setNotification={setNotification}/>
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