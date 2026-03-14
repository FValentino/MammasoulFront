import { Suspense } from "react";
import ProductTilte from "./Title";
import Loading from "@/components/common/ui/Loading";
import ProductsCarouselServer from "./ProductsCarousel.server";

export default async function ProductSection() {

  return (
    <section id="Productos destacados" className="w-full py-12">

      <ProductTilte />

      <Suspense fallback={<Loading />}>
        <ProductsCarouselServer />
      </Suspense>
    </section>
  )
}
