import { useLocation } from "react-router-dom";
import type {Product } from "../../types/product";
import Card from "../../components/products/productCard"
import BackButton from "../../components/ui/backButton";
import {productsData} from "../../services/productService"
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState<Product[]>(productsData);
  const [title, setTitle] = useState<string>("Todos los productos")
  const location = useLocation();

  useEffect(()=>{
    if (location.state){
      console.log("Entro al if de useEffect: ",location.state.id)
      const productsAux = products.filter((product) => product.category === location.state.id)
      console.log("Product aux: ", productsAux)
      setTitle(location.state.name);
      if (productsAux.length > 0){
        setProducts(productsAux)
      }else{
        setProducts([])
      }
    }else{
      setProducts(productsData)
    }
  }, [location.state]);

  return (
    <section className="container mx-auto p-4">
      <div className="w-full flex justify-start items-center mb-4">
        <BackButton />
        <h2 className="ms-4 text-2xl font-bold"> {title} </h2>
      </div>
      {
        products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product:Product) => (
              <div key={product.id} className="col-span-1">
                <Card product={product}/>
              </div>
            ))}
          </div>
        ) : (
          <p>En este momento no hay productos en stock</p>
        )
      }
    </section>
  )
}   