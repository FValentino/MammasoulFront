import { useNavigate } from "react-router-dom";
import Card from "../../ui/card";
import type { Data } from "../../../types/generic";
import type { Category } from "../../../types/category";

interface ButtonProps<T> {
  label: string;
  onClick: (...args: Data<T>[]) => void; 
};

interface CardProps {
  category: Category;
}

export default function CategoryCard ({category}: CardProps) {

  const navigate = useNavigate();
 
  const buttons: ButtonProps<Category>[] = [
    {label: "Ver Productos", onClick: ()=>{navigate("/productos", { state: { categoryId: category.id } })}}
  ] 
  

  return (
    <Card image={category.image} title={category.name}  buttons={buttons}/> 
  );
};
