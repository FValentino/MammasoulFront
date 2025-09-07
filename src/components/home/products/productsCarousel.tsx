"use client"

import { getProductsInSale } from "../../../services/productService"
import type { Product } from "../../../types/product"
import ProductCard from "../../products/productCard"
import Carousel from "../../ui/carousel"

export default function ProductCarousel() {
  
  const products : Product[] | null = getProductsInSale()

  return (
    <section id="Productos en oferta" className={`${products ? "py-12 visible" : "hidden"}`}>

      {
        products
        ?
          <Carousel<Product>
            items={products}
            title="Nuestros productos en oferta"
            description="Lo mejor de la temporada"
            buttons={["Comprar", "Ver más"]}
            renderItem={(item) => (
              <ProductCard product={item}/>
            )}
          />
        :
          ""
      }
    </section>
  )
}
