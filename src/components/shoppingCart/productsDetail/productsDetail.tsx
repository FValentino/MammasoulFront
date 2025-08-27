import { useState } from "react";
import styles from "./product.module.css"
import { Minus, Plus, X } from "lucide-react";
import type { Product } from "../../../types/product";

interface ProductsDetailProps {
  product: Product;
  onRemove: () => void;
  onUpdate: (quantity:number) => void;
}

export default function ProductsDetail({product, onRemove, onUpdate}: ProductsDetailProps) {
  
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityAdd = () => {
    if (quantity >= product.stock) return;
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onUpdate(newQuantity)
  }

  const handleQuantitySubtract = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onUpdate(newQuantity)
    }
  }

  return (
    <div className="w-full flex justify-between items-center my-2 mx-auto rounded-lg">
      <div className="w-1/2 flex justify-around items-center "> 
        <div className="w-1/3">
          <img
            src={product.image}
            alt="Product"
            className="w-16 h-16 mx-auto object-cover rounded-lg border-1 border-gray-300"
          />
        </div>
        <div className="w-2/3 ">
          <p className="text-lg font-semibold truncate">{product.name}</p>
          <p className="text-gray-600">$ {product.price}</p>
        </div>
      </div>

      <div className="flex justify-around items-center w-1/2 ">
        <div className="flex border justify-center items-center space-x-1 rounded-lg">

          <button onClick={handleQuantitySubtract}
            className="px-2 text-xl text-center rounded hover:cursor-pointer ">
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
          
        <button onClick={()=>{onRemove()}}
          className="p-3 bg-red-500 text-white text-center rounded-lg border-1 border-[black] hover:bg-red-600 hover:cursor-pointer ">
          <X />
        </button>
      </div>
    </div>
  );
}