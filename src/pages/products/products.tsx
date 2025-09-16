import { useFilter } from "../../context";
import type {Product } from "../../types/product";
import Card from "../../components/products/productCard"
import {BackButton} from "../../components/common/ui";
import CategorySelector from "../../components/filters/categories/categorySelector";

export default function Products() {
  const { filteredProducts } = useFilter();

  return (
    <section className="container mx-auto p-4">
      <div className="w-full flex justify-start items-center mb-4">
        <BackButton />
        <h2 className="ms-4 text-2xl font-bold"> Productos </h2>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full mb-4 md:w-1/5">
        {
          <CategorySelector/>
        }
        </div>
        {
          filteredProducts ? (
            <div className="w-full grid grid-cols-1 gap-6 lg:w-4/5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {filteredProducts.map((product:Product) => (
                <div key={product.id} className="col-span-1 mx-auto">
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