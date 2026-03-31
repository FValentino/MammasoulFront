import { unstable_noStore as noStore } from "next/cache";
import CategoriesCarouselClient from "./CategoriesCarousel.client";
import { getCategories } from "@/actions/category.actions";



export default async function CategoriesCarouselServer() {
  
  noStore();
  
  const categories = await getCategories();

  return <CategoriesCarouselClient categories={categories} />;
}