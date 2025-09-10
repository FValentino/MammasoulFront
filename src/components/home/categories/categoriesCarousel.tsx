"use client"
import { motion } from "framer-motion"
import { useCategories } from "../../../hooks/useCategory"
import type { Category } from "../../../types"
import { Carousel } from "../../common/ui"
import CategoryCard from "./categoryCard"

export default function CategoriesCarousel() {
  
  const {data : categories, isLoading, isError, error} = useCategories();

  if (isLoading) return <p> Cargando contenido... </p>;
  if (isError) return <p> Error al cargar las categorias:{(error as Error).message}</p>;

  return (
    <section id="Categorias" className={`${categories ? "py-12 visible" : "hidden"}`}>
      <div className="flex flex-col items-center justify-center mb-8 space-y-2">
        <motion.h2
          className="text-3xl font-bold text-foreground text-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Categorias
        </motion.h2>
      </div>

      {
        categories
        ?
          <Carousel<Category>
            items={categories}
            description="Lo mejor de la temporada"
            buttons={["Comprar", "Ver más"]}
            renderItem={(item) => (
              <CategoryCard category={item}/>
            )}
          />
        :
          ""
      }
    </section>
  )
}