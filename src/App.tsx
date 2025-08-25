import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './pages/home/home'
import './styles/App.css'
import Categories from "./pages/category/categories"
import  Menu from "./components/menu/menu"
import Products from "./pages/products/products"
import Footer from "./components/footer/footer"

function App() {

  return (
  
    <Router>
      <Menu />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/categorias" element={<Categories/>} />
        <Route path="/categoria/:id" element={<Products/>} />
        <Route path="/productos" element={<Products/>} />
      </Routes>

      <Footer />
    </Router>
  )
}

export default App
