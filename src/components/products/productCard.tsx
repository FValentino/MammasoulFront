import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/product";
import { useCart } from "../../context/cartContext";
import Card from "../ui/card";
import type { Data } from "../../types/generic";

interface ButtonProps<T> {
  label: string;
  onClick: (...args: Data<T>[]) => void; 
};

interface CardProps {
  product: Product;
}

export default function ProductCard ({product}: CardProps) {

  const navigate = useNavigate();
  const { addToCart } = useCart();
 
  const buttons: ButtonProps<Product>[] = [
    {label: "Ver Producto", onClick: ()=>{navigate(`/productos/${product.id}`)}},
    {label: "Agregar al carrito", onClick: ()=>{addToCart( {...product, quantity: 1} )}},
  ] 
  

  return (
    <Card key={product.id} image={product.image} title={product.name} description={`$ ${String(product.price)}`} buttons={buttons}/>
  );
};
