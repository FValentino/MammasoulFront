import './styles/App.css'
import ScrollToTop from "./components/common/globalBehavior/scrollToTop";
import Menu from "./components/menu/menu"
import Footer from "./components/footer/footer"
import type { ReactNode } from "react";
import ShoppingCart from './pages/shoppingCart/shoppingCart';

interface AppProps{
  children: ReactNode;
}

function App({children}: AppProps) {

  return (
    <>
      <ScrollToTop/>
      <Menu />

      {children}

      <ShoppingCart/>
      <Footer/>
    </>
  )
}

export default App
