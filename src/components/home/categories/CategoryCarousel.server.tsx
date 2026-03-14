import CategoriesCarouselClient from "./CategoriesCarousel.client";
import { getCategories } from "@/actions/category.actions";

export default async function CategoriesCarouselServer() {
  const categories = await getCategories();

  return <CategoriesCarouselClient categories={categories} />;
}