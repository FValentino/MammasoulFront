import Footer from "@/components/footer/Footer"
//import ShoppingCart from '@/pages/shoppingCart/shoppingCart';
import Header from "@/components/home/header/Header";
import CategoriesSection from "@/components/home/categories/CategorySection";
import ProductSection from "@/components/home/products/ProductSection";
import { getBanners } from "./actions";

export const revalidate = 0;

export default async function Page() {

  const banners = await getBanners();

  return (
    <>
      <main className="min-h-screen">
        <Header allBanners={banners} />

        <CategoriesSection />
        <ProductSection/> 
      </main>

      
      <Footer/>
    </>
  )
}

