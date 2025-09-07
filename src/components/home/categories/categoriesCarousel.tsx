"use client"

import { getAllcategories } from "../../../services/categoryService"
import type { Category } from "../../../types/category"
import Carousel from "../../ui/carousel"
import CategoryCard from "./categoryCard"

export default function CategoriesCarousel() {
  
  const categories : Category[] | null = getAllcategories()

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
