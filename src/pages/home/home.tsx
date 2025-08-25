import Header from "../../components/home/header/header";
import ProductCarousel from "../../components/products/productCarousel.tsx";

// Datos de ejemplo para productos destacados
const featuredProducts = [
  {
    id: 1,
    name: "Bolso Tote Reciclado Elegante",
    price: 89000,
    image: "/elegant-recycled-leather-tote.png",
  },
  {
    id: 2,
    name: "Cartera Minimalista Sostenible",
    price: 65000,
    image: "/placeholder-ervoi.png",
  },
  {
    id: 3,
    name: "Mochila Urbana Eco-Friendly",
    price: 120000,
    image: "/urban-eco-friendly-green-backpack.png",
  },
  {
    id: 4,
    name: "Bandolera Artesanal",
    price: 75000,
    image: "/artisanal-recycled-leather-bag.png",
  },
  {
    id: 5,
    name: "Clutch de Noche Elegante",
    price: 55000,
    image: "/placeholder-jhf58.png",
  },
]

// Datos de ejemplo para productos en oferta
const saleProducts = [
  {
    id: 6,
    name: "Bolso de Mano Clásico",
    price: 45000,
    originalPrice: 60000,
    image: "/recycled-leather-handbag.png",
    isOnSale: true,
  },
  {
    id: 7,
    name: "Riñonera Moderna",
    price: 35000,
    originalPrice: 50000,
    image: "/modern-sustainable-fanny-pack.png",
    isOnSale: true,
  },
  {
    id: 8,
    name: "Portafolio Ejecutivo",
    price: 95000,
    originalPrice: 130000,
    image: "/placeholder-lg5au.png",
    isOnSale: true,
  },
  {
    id: 9,
    name: "Bolso Shopper Grande",
    price: 70000,
    originalPrice: 90000,
    image: "/beige-eco-leather-shopper.png",
    isOnSale: true,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* Banner principal */}
      <Header />

      {/* Productos destacados */}
      <ProductCarousel title="Productos Destacados" id="productos destacados" products={featuredProducts} />

      {/* Productos en oferta */}
      <ProductCarousel title="Productos en Oferta" id="productos en oferta" products={saleProducts} />
    </div>
  );
}