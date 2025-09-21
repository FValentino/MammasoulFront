import { QueryClientProvider } from "@tanstack/react-query";
import {queryClient} from "./client"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './styles/App.css'
import { CartProvider } from "./context";
import FilterProviderLayout from "./layout/filterProviderLayout";
import ScrollToTop from "./components/common/globalBehavior/scrollToTop";
import Menu from "./components/menu/menu"
import Footer from "./components/footer/footer"
import Home from './pages/home/home'
import Products from "./pages/products/products"
import ShoppingCart from "./pages/shoppingCart/shoppingCart"
import ProductDetail from "./pages/products/productDetail"
import PaymentNotification from "./pages/purchase/paymentNotification"
import Contact from "./pages/contact/contact"
import ClientRegister from "./pages/purchase/clientRegister"
import Purchase from "./pages/purchase/purchase"

function App() {

  return (
    <CartProvider>
      <QueryClientProvider client={queryClient}>  
        <Router>
          <ScrollToTop/>
          <Menu />

          <Routes>
            <Route element={<FilterProviderLayout /> }>
              <Route path="/" element={<Home />} />
              <Route path="/inicio" element={<Home />} />
              <Route path="/productos" element={<Products/>} />
            </Route>
            <Route path="/productos/:id" element={<ProductDetail/>} />
            <Route path="/compra/cliente" element={<ClientRegister/>} />
            <Route path="/compra/confirmar" element={<Purchase/>} />
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
