import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingCart as ShoppingCartIcon } from "lucide-react";
import ProductsDetail from "../../components/shoppingCart/productsDetail/productsDetail";
import { useCart } from "../../context/cartContext";

export default function ShoppingCart( ) {

  const {cart, cartOpen, setCartOpen} = useCart();
  const [cartTotal, setCartTotal] = useState<number>(()=>{
    const total = cart.reduce( (totalAcumulado, producto)=> totalAcumulado + producto.price * producto.quantity,0 );
    return cart ? total : 0;
  });
  const navigate = useNavigate();

  useEffect(()=>{
    const total = cart.reduce( (totalAcumulado, producto)=> totalAcumulado + producto.price * (producto.quantity || 1) ,0 );
    setCartTotal(total)
  },[cart]);

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Cart Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">Carrito de Compras</h3>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="hover:bg-gray-200"
                  >
                    <X className="h-4 w-4 text-gray-600" />
                  </button>
                </motion.div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <ShoppingCartIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Tu carrito está vacío</p>
                  </motion.div>
                ) : (
                  <div className="space-y-4 overflow-y-scroll">
                    <AnimatePresence>
                      {cart.map((product, index) => (
                        <ProductsDetail
                          key={product.id} 
                          index={index}
                          product={product}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              <AnimatePresence>
                {cart.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="border-t border-gray-200 p-6 space-y-4 bg-gray-50"
                  >
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-gray-900">Total:</span>
                      <span className="text-cyan-600">${cartTotal}</span>
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <button onClick={()=>{navigate("/compra")}}
                        className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold py-3 rounded-lg shadow-lg hover:cursor-pointer">
                        Proceder al Pago
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}