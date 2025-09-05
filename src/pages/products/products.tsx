import type {Product } from "../../types/product";
import type { Category } from "../../types/category";
import Card from "../../components/products/productCard"
import BackButton from "../../components/ui/backButton";
import {getAllProducts, findProductsByCategory} from "../../services/productService"
import { useEffect, useState } from "react";
import CategorySelector from "../../components/filters/categories/categorySelector";

export default function Products() {
  const [products, setProducts] = useState<Product[]>(getAllProducts());
  const [category, setCategory] = useState<Category | null>(null)
  const [title, setTitle] = useState<string>("Todos los productos")

  useEffect(()=>{
    if (category){
      const productsAux = findProductsByCategory(category.id)
      setTitle(category.name);
      if (productsAux.length > 0){
        setProducts(productsAux)
      }else{
        setProducts([])
      }
    }else{
      setTitle("Todos los productos")
      setProducts(getAllProducts())
    }
  }, [category]);

  return (
    <section className="container mx-auto p-4">
      <div className="w-full flex justify-start items-center mb-4">
        <BackButton />
        <h2 className="ms-4 text-2xl font-bold"> {title} </h2>
      </div>
      <div className="w-full mb-4">
        <CategorySelector setCategory={setCategory}/>
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