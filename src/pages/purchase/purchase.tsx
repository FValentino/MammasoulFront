import type { ProductCart } from "../../types";

export default function Purchase(){

  const localShoppingCart = localStorage.getItem("shoppingCart");

  const products : ProductCart[] = localShoppingCart? JSON.parse(localShoppingCart) : [] 

  return(
    <>
    </>
  );
}