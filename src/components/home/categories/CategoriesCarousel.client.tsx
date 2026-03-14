"use client";
import Carousel  from "@/components/common/ui/Carousel";
import CategoryCard from "./CategoryCard";
import { CategoryDTO } from "@/types/category.type";

interface Props{
  categories: Omit<CategoryDTO, "product_count">[];
}

export default function CategoriesCarouselClient( {categories} : Props ) {
  

  return (
    <Carousel<Omit<CategoryDTO, "product_count">>
      items={categories}
      description="categorias"
      renderItem={(item) => (
        <CategoryCard key={item.id} category={item} />
      )}
    />
  );
}