import { Navigate, Route} from "react-router-dom";
import FilterProviderLayout from "../layout/filterProviderLayout";
import Products from "../pages/products/products";
import ProductDetail from "../pages/products/productDetail";
import ClientRegister from "../pages/purchase/clientRegister";
import Purchase from "../pages/purchase/purchase";
import PaymentSuccess from "../pages/purchase/paymentSuccess";
import PaymentFailed from "../pages/purchase/paymentFailed";
import Home from "../pages/home/home";
import Contact from "../pages/contact/contact";
import ErrorRouter from "./errorRoutes";

export default function AppRouter(){
  return(
    <ErrorRouter>
      <Route element={<FilterProviderLayout /> }>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Navigate to="/" replace />} />
        <Route path="/productos" element={<Products/>} />
      </Route>
      <Route path="/productos/:name" element={<ProductDetail/>} />
      <Route path="/compra/cliente" element={<ClientRegister/>} />
      <Route path="/compra/confirmar" element={<Purchase/>} />
      <Route path="/compra/aprobada" element={<PaymentSuccess />} />
      <Route path="/compra/rechazada" element={<PaymentFailed />} />
      <Route path="/contacto" element={<Contact/>} />
    </ErrorRouter>
  );
}