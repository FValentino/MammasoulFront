import { useEffect, useState } from "react";
import styles from "./product.module.css"
import { Minus, Plus, X } from "lucide-react";
import type { Product } from "../../../types/product";
import { motion } from "framer-motion";
import { useCart } from "../../../context/cartContext";

interface ProductsDetailProps {
  index: number
  product: Product;
}

export default function ProductsDetail({index, product}: ProductsDetailProps) {
  
  const [quantity, setQuantity] = useState<number>(1);
  const {cart, updateProductQuantity, removeFromCart} = useCart()

  useEffect(() => {
    const cartItem = cart.find(item => item.id === product.id);
    if (cartItem) {
      setQuantity(cartItem.quantity || 1);
    }
  }, [cart, product.id]);

  const handleQuantityAdd = () => {
    if (quantity >= product.stock) return;
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateProductQuantity(index, newQuantity)
  }

  const handleQuantitySubtract = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateProductQuantity(index, newQuantity)
    }
  }

  return (
    
    <motion.div className="w-full flex justify-between items-center my-2 mx-auto border-b-1 pb-1"
      key={product.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ delay: index * 0.1 }}
    >
      <div className="w-1/2 flex justify-around items-center ">
        <img
          src={product.image}
          alt="Product"
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{product.name}</h4>
          <p className="text-cyan-600 font-semibold">${product.price}</p>
        </div>
      </div>

      <div className="flex justify-around items-center w-1/2 ">
        <div className="flex flex-col justify-center items-center space-y-1 ">
          <div className="flex justify-center items-center space-x-2 rounded-lg">

            <div className="flex border justify-center items-center space-x-1 rounded-lg">
              <button onClick={handleQuantitySubtract}
                className="px-2 text-xl text-center rounded hover:cursor-pointer "
              >
                <Minus className="w-4 h-4"/>
              </button>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={quantity}
                disabled
                className={`${styles.inputNumber} border-x-2 w-10 h-auto  rounded text-center`}
              />
              <button onClick={handleQuantityAdd}
                className="px-2 text-xl flex rounded hover:cursor-pointer">
                <Plus className="w-4 h-4"/>
              </button>
            </div>
            

            
          
            <button onClick={()=>{removeFromCart(product.id)}}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 hover:cursor-pointer">
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm font-medium"> stock disp: {product.stock}</p>

        </div>
      </div>
    </motion.div>
  );
}

