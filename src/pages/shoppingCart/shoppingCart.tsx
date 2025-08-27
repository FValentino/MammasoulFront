import { useEffect, useState } from "react";
import CartDetail from "../../components/shoppingCart/cartDetail/cartDetail";
import ProductsDetail from "../../components/shoppingCart/productsDetail/productsDetail";
import type { ProductCart } from "../../types/product";


export default function ShoppingCart() {
  const [products, setProducts] = useState<ProductCart[]>( ()=>{
    const actualCart = localStorage.getItem("shoppingCart");
    return actualCart ? JSON.parse(actualCart) as ProductCart[] : [];
  });

  useEffect(()=>{
    localStorage.setItem("shoppingCart", JSON.stringify(products))
  },[products])

  const handleRemoveProduct = (pos: number) => {
    const newProducts = [...products]
    newProducts.splice(pos,1)
    setProducts(newProducts);
  };

  const handleUpdate = (pos:number, newQuantity:number)=>{
    const productsAux = [...products];
    productsAux[pos].quantity =  newQuantity
    setProducts(productsAux)
  }

  return (
    <section className="container mx-auto">
      <div className="h-10 font-bold my-2">
        <h2 className="text-2xl">Carrito de compras</h2> 
      </div>
      
      {products.length === 0 
        ? 
          <p> No hay productos en el carrito. </p>  
        : 
          <div className="w-full min-h-[calc(100vh/2)] flex flex-col justify-center items-center border rounded-lg p-2 
                          md:flex-row md:justify-between md:items-start ">
            <div className="w-full me-0 flex flex-col justify-center items-center border-1 rounded-lg
                            md:w-2/3 md: me-1">
              {products.map((product, index) => (
                <ProductsDetail 
                  key={product.id}
                  product={product}
                  onRemove={()=>handleRemoveProduct(index)}
                  onUpdate={(newQuantity:number)=>handleUpdate(index, newQuantity)}
                />
              ))}
            </div>
            <div className="w-full ms-0 mt-3 flex flex-col justify-around items-center border-1 rounded-lg
                            md:w-1/3 md:ms-1 md:mt-0">
              <div className="w-full h-12 flex justify-center items-center ">
                <h3 className="text-xl font-medium">Resumen de la compra</h3>
              </div>
              <CartDetail 
                productsPrice={products.reduce((acc, product) => acc + product.price * product.quantity, 0)} 
                total={products.reduce((acc, product) => acc + product.price * product.quantity, 0)}   
              />
            </div>
          </div>
      }
    </section> 
  );
}