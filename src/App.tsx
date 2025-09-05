import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './pages/home/home'
import './styles/App.css'
import Menu from "./components/menu/menu"
import Products from "./pages/products/products"
import Footer from "./components/footer/footer"
import ShoppingCart from "./pages/shoppingCart/shoppingCart"
import ProductDetail from "./pages/products/productDetail"
import PaymentNotification from "./pages/payment/paymentNotification"
import { CartProvider } from "./context/cartContext"
import Contact from "./pages/contact/contact"
import Payment from "./pages/payment/payment"


function App() {

  return (
    <CartProvider>
      <Router>
        <Menu />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/productos" element={<Products/>} />
          <Route path="/productos/:id" element={<ProductDetail/>} />
          <Route path="/compra" element={<Payment/>} />
          <Route path="/compra/aprobada" element={<PaymentNotification approved={true}/>} />
          <Route path="/compra/rechazada" element={<PaymentNotification approved={false}/>} />
          <Route path="/contacto" element={<Contact/>} />
        </Routes>

        <ShoppingCart />
        
        <Footer />
      </Router>
    </CartProvider>
  )
}

export default App
