import { useEffect, useState, type ReactNode } from "react"
import { CartContext } from "./cart.context";
import type { ProductCart } from "../../types"
import type { NotificationType } from "../../types";
import {Notification} from "../../components/common/ui";


interface ChildrenProps{
  children: ReactNode;
}

//3. provider: envuelve la app y da acceso al carrito
export function CartProvider({children}:ChildrenProps){
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<ProductCart[]>(()=>{
    const cartLocalStorage = localStorage.getItem("shoppingCart");
    return cartLocalStorage ? JSON.parse(cartLocalStorage) : []
  })
  const [total, setTotal] = useState<number>(0);
  const [notification, setNotification] = useState<NotificationType | null>(null);
  

  useEffect(()=>{
    const cartString = JSON.stringify(cart)  
    localStorage.setItem("shoppingCart", cartString)
    const total = cart.reduce((subtotal, product) => subtotal + product.price * (product.quantity ?? 0), 0);
    setTotal(total)
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
    cartAux[index].subtotal = cartAux[index].price * newQuantity;

    setCart(cartAux)
  }

  const clearCart = () => {setCart([])}

  return (
    <CartContext.Provider value ={{
      cart, addToCart, removeFromCart, updateProductQuantity, clearCart, cartOpen, setCartOpen, total}}>
      {children}
      <Notification notification={notification} setNotification={setNotification}/>
    </CartContext.Provider>
  );
}

