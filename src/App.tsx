import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './pages/home/home'
import './styles/App.css'
import Categories from "./pages/category/categories"
import Menu from "./components/menu/menu"
import Products from "./pages/products/products"
import Footer from "./components/footer/footer"
import ShoppingCart from "./pages/shoppingCart/shoppingCart"

//Imagen de prueba
import product from "./assets/images/producto-generico.webp"

function App() {

  const productsData = [
    {
      id: 1,
      name: "Bolso Tote Elegante",
      price: 120,
      image: product,
      stock: 1
    },
    {
      id: 2,
      name: "Cartera Minimalista",
      price: 45,
      image: product,
      stock: 2
    },
    {
      id: 3,
      name: "Mochila Urbana",
      price: 90,
      image: product,
      stock: 3
    },
    {
      id: 4,
      name: "Bandolera Artesanal",
      price: 75,
      image: product,
      stock: 4
    },
    {
      id: 5,
      name: "Clutch de Noche",
      price: 60,
      image: product,
      stock: 5
    },
    {
      id: 6,
      name: "Riñonera Moderna",
      price: 50,
      image: product,
      stock: 6
    },
  ]


  return (
  
    <Router>
      <Menu />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/categorias" element={<Categories/>} />
        <Route path="/categoria/:id" element={<Products/>} />
        <Route path="/productos" element={<Products/>} />
        <Route path="/carrito" element={<ShoppingCart products={productsData}/>}/>
      </Routes>

      <Footer />
    </Router>
  )
}

export default App
