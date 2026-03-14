"use client"

import { useEffect, useState, type ReactNode } from "react"
import { CartContext } from "./cart.context";
import type { ProductCart } from "@/types/product.type"
import type { NotificationType } from "../../types";
import Notification from "../../components/common/ui/Notification";

interface ChildrenProps{
  children: ReactNode;
}

//3. provider: envuelve la app y da acceso al carrito
export function CartProvider({children}:ChildrenProps){
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<ProductCart[]>([]); // Inicializa vacío
  const [total, setTotal] = useState<number>(0);
  const [notification, setNotification] = useState<NotificationType | null>(null);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  useEffect(() => {
    const cartLocalStorage = localStorage.getItem("shoppingCart");
    if (cartLocalStorage) {
      const parsedCart = JSON.parse(cartLocalStorage);
      setCart(parsedCart);
      setTotalQuantity(parsedCart.reduce((q: number, p: any) => q + p.quantity, 0));
      setTotal(parsedCart.reduce((acc: number, product: any) => acc + (product.quantity || 1) * (product.price || 1), 0));
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("shoppingCart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("shoppingCart");
    }
  }, [cart]);


  const addToCart = (product : ProductCart) =>{
    if (cart.find((prod)=>prod.id === product.id)){
      setNotification({
        showNotification: true,
        bodyText: "El producto ya se encuentra en el carrito",
        color: false
      })
    }else{
      const quantity = totalQuantity + 1;
      setTotalQuantity(quantity);
      setCart((prev) => [...prev, product]);
      setCartOpen(true)
    }
  }

  const removeFromCart = (id : number)=>{
    const productQuantity: number | undefined = cart.find((product) => product.id == id)?.quantity;
    if (productQuantity){
      const quantity = totalQuantity - productQuantity;
      setTotalQuantity(quantity);
      setCart((prev) => prev.filter((product : ProductCart) => product.id !== id))
      setNotification({
        showNotification: true,
        bodyText: "Producto removido",
        color: false
      })
    } 
  }

  const updateProductQuantity = (index : number, newQuantity : number) => {
    const cartAux = [...cart];
    cartAux[index].quantity = newQuantity;

    const totalAux = cartAux.reduce((acc, product) => acc + (product.quantity || 1) * (product.price || 1), 0);
    const quantity = cartAux.reduce(
      (acc, product) => acc + (product.quantity || 1),
      0
    );

    setTotalQuantity(quantity);
    setCart(cartAux);
    setTotal(totalAux);
  }

  const clearCart = () => {
    setCart([]);
    setTotal(0);
    setTotalQuantity(0);
    localStorage.removeItem("shoppingCart");
  };

  return (
    <CartContext.Provider value ={{
      cart, addToCart, removeFromCart, updateProductQuantity, clearCart, cartOpen, setCartOpen, total, 
      totalQuantity, setTotalQuantity  
    }}>
      {children}
      <Notification notification={notification} setNotification={setNotification}/>
    </CartContext.Provider>
  );
}

