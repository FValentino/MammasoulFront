import ProductCarouselClient from "../products/ProductsCarousel.client";
import { getFeaturedProducts } from "@/actions/product.action";

export default async function ProductsCarouselServer() {
  const featured = await getFeaturedProducts();

  return <ProductCarouselClient products={featured? featured : []} />;
}