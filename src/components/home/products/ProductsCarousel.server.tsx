import { unstable_noStore as noStore } from "next/cache";
import ProductCarouselClient from "../products/ProductsCarousel.client";
import { getFeaturedProducts } from "@/actions/product.action";

export default async function ProductsCarouselServer() {

  noStore();

  const featured = await getFeaturedProducts();

  return <ProductCarouselClient products={featured? featured : []} />;
}