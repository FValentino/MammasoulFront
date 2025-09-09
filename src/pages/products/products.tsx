import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type {Product } from "../../types/product";
import type { Category } from "../../types/category";
import Card from "../../components/products/productCard"
import {BackButton} from "../../components/common/ui";
import CategorySelector from "../../components/filters/categories/categorySelector";
import {getAllProducts, findProductsByCategory} from "../../services/productService"
import { getCategoryById } from "../../services/categoryService";

export default function Products() {
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>(()=>{
    if (location.state){
      const category = getCategoryById(location.state.categoryId);
      if (category){
        return(findProductsByCategory(category.id))
      }
    } 
    return getAllProducts()
  });
  const [categories, setCategories] = useState<Category[]>(()=>{
    if (location.state){
      const category = getCategoryById(location.state.categoryId);
      if (category){
        return([category])
      }
    } 
    return []
  })

  useEffect(()=>{
    if (categories.length > 0){
      const productsAux = categories.flatMap( (categoty) => findProductsByCategory(categoty.id) ?? [] );
      if (productsAux.length > 0){
        setProducts(productsAux)
      }else{
        setProducts([])
      }
    }else{
      setProducts(getAllProducts())
    }
  }, [categories]);

  return (
    <section className="container mx-auto p-4">
      <div className="w-full flex justify-start items-center mb-4">
        <BackButton />
        <h2 className="ms-4 text-2xl font-bold"> Productos </h2>
      </div>
      <div className="flex">
        <div className="w-1/5 mb-4">
          <CategorySelector selectedCategories={categories} setCategories={setCategories}/>
        </div>
        {
          products.length > 0 ? (
            <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
      
    </section>
  )
}   