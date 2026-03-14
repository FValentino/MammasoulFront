import Footer from "@/components/footer/Footer"
//import ShoppingCart from '@/pages/shoppingCart/shoppingCart';
import Header from "@/components/home/header/Header";
import CategoriesSection from "@/components/home/categories/CategorySection";
import ProductSection from "@/components/home/products/ProductSection";

export default async function Page() {

  return (
    <>

      <main className="min-h-screen">
        <Header />

        <CategoriesSection />
        <ProductSection/> 
      </main>

      
      <Footer/>
    </>
  )
}

