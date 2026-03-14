import TitleCategories from "./Title";
import { Suspense } from "react";
import Loading from "@/components/common/ui/Loading";
import CategoriesCarouselServer from "./CategoryCarousel.server";

export default async function CategoriesSection() {

  return (
    <section id="Categorias" className="py-12 h-auto ">
      <TitleCategories />
      <Suspense fallback={<Loading />}>
        <CategoriesCarouselServer />
      </Suspense>
    </section>
  )
}