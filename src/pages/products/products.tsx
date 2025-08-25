import { useLocation } from "react-router-dom";
import Card from "../../components/products/productCard"
import BackButton from "../../components/ui/backButton";

export default function Products() {

  const location = useLocation();
  const categoryName = location.state?.name || "Todos los productos";

  const productsData = [
    {
      id: 1,
      name: "Bolso Tote Elegante",
      price: 120,
      image: "/elegant-recycled-leather-tote.png",
    },
    {
      id: 2,
      name: "Cartera Minimalista",
      price: 45,
      image: "/placeholder-ervoi.png",
    },
    {
      id: 3,
      name: "Mochila Urbana",
      price: 90,
      image: "/urban-eco-friendly-green-backpack.png",
    },
    {
      id: 4,
      name: "Bandolera Artesanal",
      price: 75,
      image: "/artisanal-recycled-leather-bag.png",
    },
    {
      id: 5,
      name: "Clutch de Noche",
      price: 60,
      image: "/placeholder-jhf58.png",
    },
    {
      id: 6,
      name: "Riñonera Moderna",
      price: 50,
      image: "/modern-sustainable-fanny-pack.png",
    },
  ]

  return (
    <section className="container mx-auto p-4">
      <div className="w-full flex justify-start items-center mb-4">
        <BackButton />
        <h2 className="ms-4 text-2xl font-bold"> {categoryName} </h2>
      </div>
      {
        productsData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productsData.map((product) => (
              <div key={product.id} className="col-span-1">
                <Card name={product.name} price={product.price} image={product.image} />
              </div>
            ))}
          </div>
        ) : (
          <p>En este momento no hay productos en stock</p>
        )
      }
    </section>
  )
}   