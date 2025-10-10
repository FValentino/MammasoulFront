import CategoriesCarousel from "../../components/home/categories/categoriesCarousel.tsx";
import Header from "../../components/home/header/header";
import ProductsCarousel from "../../components/home/products/productsCarousel.tsx";
import SEO from "../../components/seo/SEO.tsx";

export default function Home() {
  return (
    <div className="min-h-screen">

      <SEO/>

      <Header />
      <CategoriesCarousel />
      <ProductsCarousel  />
    </div>
  );
}