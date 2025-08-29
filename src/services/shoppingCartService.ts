import type { Product, ProductCart } from "../types/product";

const productsLocalStorage:string|null= localStorage.getItem("shoppingCart");
const products = productsLocalStorage? JSON.parse(productsLocalStorage) as ProductCart[] : [];


export const handleAddToCart = (prod:Product) => {
  
  if (products.find((product)=>product.id === prod.id)){
    window.alert("El producto seleccionado ya se encuentra en el carrito.\n \nPuede modificar la cantidad ingresando a el")
  }else{
    products.push(
      {
        ...prod,
        quantity: 1
      }
    )
    localStorage.setItem("shoppingCart", JSON.stringify(products))
    window.alert("Producto agregado al carrito")
  }
}