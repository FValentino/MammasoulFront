"use client"
import { useCategories } from "../../../hooks/useCategory"
import type { Category } from "../../../types"
import Carousel from "../../ui/carousel"
import CategoryCard from "./categoryCard"

export default function CategoriesCarousel() {
  
  const {data : categories, isLoading, isError, error} = useCategories();

  if (isLoading) return <p> Cargando contenido... </p>;
  if (isError) return <p> Error al cargar las categorias:{(error as Error).message}</p>;
  if (categories) for (const category in categories) {console.log(category)}

  return (
    <section id="Categorias" className={`${categories ? "py-12 visible" : "hidden"}`}>

      {
        categories
        ?
          <Carousel<Category>
            items={categories}
            title="Categorias"
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