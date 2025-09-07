import CategoriesCarousel from "../../components/home/categories/categoriesCarousel.tsx";
import Header from "../../components/home/header/header";
import ProductsCarousel from "../../components/home/products/productsCarousel.tsx";

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* Banner principal */}
      <Header />

      {/* Categorias */}
      <CategoriesCarousel />

      {/* Productos en oferta */}
      <ProductsCarousel  />
    </div>
  );
}