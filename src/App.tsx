import { QueryClientProvider } from "@tanstack/react-query";
import {queryClient} from "./client"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { CartProvider } from "./context/cartContext"
import './styles/App.css'
import Home from './pages/home/home'
import Menu from "./components/menu/menu"
import Products from "./pages/products/products"
import Footer from "./components/footer/footer"
import ShoppingCart from "./pages/shoppingCart/shoppingCart"
import ProductDetail from "./pages/products/productDetail"
import PaymentNotification from "./pages/payment/paymentNotification"
import Contact from "./pages/contact/contact"
import Payment from "./pages/payment/payment"
import ScrollToTop from "./components/common/globalBehavior/scrollToTop";

function App() {

  return (
    <CartProvider>
      <QueryClientProvider client={queryClient}>  
        <Router>
          <ScrollToTop/>
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
      </QueryClientProvider>
    </CartProvider>
  )
}

export default App
