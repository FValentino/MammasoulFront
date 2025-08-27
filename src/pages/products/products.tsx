import { useLocation } from "react-router-dom";
import type {Product } from "../../types/product";
import Card from "../../components/products/productCard"
import BackButton from "../../components/ui/backButton";
import {productsData} from "../../services/productService"

export default function Products() {

  const location = useLocation();
  const categoryName = location.state?.name || "Todos los productos";


  return (
    <section className="container mx-auto p-4">
      <div className="w-full flex justify-start items-center mb-4">
        <BackButton />
        <h2 className="ms-4 text-2xl font-bold"> {categoryName} </h2>
      </div>
      {
        productsData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productsData.map((product:Product) => (
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