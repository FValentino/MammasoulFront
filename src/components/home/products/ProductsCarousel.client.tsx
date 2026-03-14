"use client"

import ProductCard from "@/components/products/ProductCard";
import  Carousel  from "@/components/common/ui/Carousel";  
import { ProductDTO } from "@/types/product.type";

interface Props{
  products: ProductDTO[];
}

export default function ProductCarouselClient( {products}: Props ) {

  return (
    <>
      <Carousel<ProductDTO>
        items={products}
        description="Lo mejor de la temporada"
        buttons={["Comprar", "Ver más"]}
        renderItem={(item) => (
          <ProductCard key={item.id} product={item} />
        )}
      />
          
    </>
  )
}
