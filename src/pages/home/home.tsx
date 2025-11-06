import { useEffect } from "react";
import CategoriesCarousel from "../../components/home/categories/categoriesCarousel.tsx";
import Header from "../../components/home/header/header";
import ProductsCarousel from "../../components/home/products/productsCarousel.tsx";
import SEOHome from "../../components/seo/SEO.tsx";
import { useFilter } from "../../context/index.ts";
import ScrollToTop from "../../components/common/globalBehavior/scrollToTop.tsx";

export default function Home() {

  const {resetCategories} = useFilter();
  useEffect(()=>{
    
    resetCategories();
  },[])
  return (
    <div className="min-h-screen">

      <ScrollToTop/> 
      <SEOHome/>

      <Header />
      <CategoriesCarousel />
      <ProductsCarousel  />
    </div>
  );
}