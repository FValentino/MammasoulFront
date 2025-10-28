import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/product";
import { useCart } from "../../context/";
import {Card} from "../common/ui";
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

  const productUrl = product.name.replaceAll(" ", "-")
 
  const buttons: ButtonProps<Product>[] = [
    {label: "Ver Producto", onClick: ()=>{navigate(`/productos/${productUrl}`)}},
    {label: "Agregar al carrito", onClick: ()=>{addToCart( {...product, quantity: 1, subtotal: product.price})}},
  ] 
  
  return (
    <Card key={product.id} image={product.images? product.images[0].url : ""} title={product.name} detail={`$ ${String(product.price)}`} buttons={buttons}/>
  );
};
