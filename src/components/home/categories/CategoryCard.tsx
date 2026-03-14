import NavigationButton from "@/components/common/ui/buttons/NavigationButton";
import type { CategoryDTO } from "@/types";
import Card from "../../common/ui/Card";
import { ReactNode } from "react";

interface CardProps {
  category: Omit<CategoryDTO, "product_count">;
}

export default function CategoryCard ({category}: CardProps) {
 
  const buttons: ReactNode[] = [
    <NavigationButton href={`/productos?categoria=${category.slug}`} label="Ver productos" />
  ] 
  

  return (
    <div className="h-full flex items-stretch">
      <Card image={category.image? category.image : ""} title={category.name} buttons={buttons}/> 
    </div>
    
  );
};
