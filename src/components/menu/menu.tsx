import { Link } from "react-router-dom";
import { Menu as MenuIcon, X, ShoppingCart } from "lucide-react"
import { useState } from "react"; 
import { useCart } from "../../context/cartContext";

export default function Menu( ) {

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { setCartOpen } = useCart()

  return (
    <div className={`${isMenuOpen ? 'w-full h-screen bg-black/80 overflow-hidden' : 'w-full container mx-auto md:px-4'}`}>
      <div className={`${isMenuOpen ? 'w-full h-auto bg-[#F4EBDB]' : ''}`}>
        <div className={`${isMenuOpen ? 'w-full md:hidden py-4' : 'w-full md:flex md:justify-between md:items-center'}`}>
          {/* logo y menu */}
          <div className={`${isMenuOpen ? 'w-full flex flex-col-reverse pb-4 border-b-2 border-dashed' 
                                        : 'w-full flex justify-between items-center h-16 md:w-2/3'}`}>
            <nav className={`${isMenuOpen ? 'flex flex-col space-y-4 mt-6 mx-4' 
                                          : 'hidden md:flex md:w-1/2 md:justify-around '}`}>
              <Link to="/" className={`font-medium ${isMenuOpen ? 'text-xl' : ''}`}>
                Inicio
              </Link>
              <Link to="/contacto" className={`font-medium ${isMenuOpen ? 'text-xl' : ''}`}>
                Contacto
              </Link>
            </nav>

            <div className={`${isMenuOpen ? 'flex justify-between items-center border-b-2 pb-2' 
                                          : 'w-full flex justify-between items-center md:w-1/2 '}`}>
              <Link to="/" className=" md:mx-auto">
                <h1 translate="no" className="text-3xl font-bold text-primary ms-4">Mammasoul</h1>
              </Link>
              <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6 me-4" /> : <MenuIcon className="w-8 h-8 me-4"/>}
              </button>
            </div>
          </div>

          
          <div className={`${isMenuOpen ? 'w-full md:hidden py-4' 
                                        : 'hidden md:flex md:w-1/3 md:h-16 md:justify-center md:items-center'}`}>
            <div className={`${isMenuOpen ? 'mx-4 flex flex-col space-y-4' : 'md:w-[90%] flex justify-around'}`}>
              <Link to="/productos" className={`font-medium ${isMenuOpen ? 'text-xl' : ''}`}>
                Productos
              </Link>
              <button onClick={()=>{setCartOpen(true)}} 
                className={`font-medium hover:cursor-pointer  ${isMenuOpen ? 'text-xl' : ''}`}>
                <ShoppingCart />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}