import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/product";
import { handleAddToCart } from "../../services/shoppingCartService";

interface CardProps {
  product: Product;
}

export default function Card ({product}: CardProps) {

  const navigate = useNavigate();

  return (
    <div className="bg-white h-auto rounded-2xl border-1 border-[#313030] p-2 overflow-hidden relative">

      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />

      <div className="p-2 flex flex-col gap-2">
        <h3 className="text-sm font-medium h-12 flex items-center">{product.name}</h3>
        <p className="text-[#313030] font-semibold">$ {product.price}</p>
        <button onClick={()=>{navigate(`/productos/${product.id}`)}}
          className="w-full bg-[#525126] text-white font-bold py-2 rounded hover:bg-[#525126]/90 hover:cursor-pointer transition-colors">
          Ver producto
        </button>
        <button onClick={()=>{handleAddToCart(product)}}
          className="w-full bg-[#525126] text-white font-bold py-2 rounded hover:bg-[#525126]/90 hover:cursor-pointer transition-colors">
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};
