"use client"

import type { Product } from "../../../types"
import ProductCard from "../../products/productCard"
import {Carousel} from "../../common/ui"
import { useFeaturedProducts } from "../../../hooks"
import { motion } from "framer-motion"

export default function ProductCarousel() {
  
  const { data: products, isLoading, isError, error } = useFeaturedProducts();

  if (isError) <p>Error al cargar los productos.. {(error as Error).message}</p>
  if (isLoading) <p>cargando contenido</p>


  return (
    <section id="Productos destacados" className={"py-12"}>

      <div className="flex flex-col items-center justify-center mb-8 space-y-2">
        <motion.h2
          className="text-3xl font-bold text-foreground text-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Productos destacados
        </motion.h2>
      </div>
      {
        (products && products?.length>0)
        ?
          <Carousel<Product>
            items={products}
            description="Lo mejor de la temporada"
            buttons={["Comprar", "Ver más"]}
            renderItem={(item) => (
              <ProductCard product={item}/>
            )}
          />
        :
          <div className="flex flex-col items-center justify-center mb-8 space-y-2">
            <motion.p
              className="text-xl font-bold text-foreground text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Actualmente no poseemos productos destacados
            </motion.p>
          </div>
      }
    </section>
  )
}
