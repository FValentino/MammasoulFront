import Card  from "../common/ui/Card";
import { ReactNode } from "react";
import AddToCartButton from "../common/ui/buttons/AddCartButton";
import NavigationButton from "../common/ui/buttons/NavigationButton";
import { ProductDTO } from "@/types/product.type";

interface CardProps {
  product: ProductDTO;
}

export default function ProductCard({ product }: CardProps) {

  const mainImage = product.product_images ? product.product_images.find(img => img.is_representative)?.url || product.product_images[0].url : "";
  
  const buttons: ReactNode[] = [
    <AddToCartButton product={{...product, quantity: 1, subtotal: product.price}}/>,
    <NavigationButton href={`/productos/${product.slug}`} label="Ver producto"/>
  ];

  return (
    <Card 
      key={product.id} 
      image={mainImage} 
      title={product.name} 
      detail={`$ ${String(product.price)}`} 
      buttons={buttons} 
    />
  );
};