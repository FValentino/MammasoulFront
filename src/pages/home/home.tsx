import CategoriesCarousel from "../../components/home/categories/categoriesCarousel.tsx";
import Header from "../../components/home/header/header";
import ProductsCarousel from "../../components/home/products/productsCarousel.tsx";
import SEOHome from "../../components/seo/SEO.tsx";

export default function Home() {
  return (
    <div className="min-h-screen">

      <SEOHome/>

      <Header />
      <CategoriesCarousel />
      <ProductsCarousel  />
    </div>
  );
}