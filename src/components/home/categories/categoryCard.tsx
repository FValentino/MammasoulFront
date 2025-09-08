import { useNavigate } from "react-router-dom";
import type { Data, Category } from "../../../types";
import Card from "../../ui/card";

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
