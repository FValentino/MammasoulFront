import { useNavigate } from "react-router-dom";
import type { Data, Category } from "../../../types";
import {Card} from "../../common/ui";
import { useFilter } from "../../../context";

interface ButtonProps<T> {
  label: string;
  onClick: (...args: Data<T>[]) => void; 
};

interface CardProps {
  category: Category;
}

export default function CategoryCard ({category}: CardProps) {

  const navigate = useNavigate();
  const {toggleCategory} = useFilter();
  
  const categoryProducts = ()=>{
    toggleCategory(category.id);
    navigate("/productos")
  }
 
  const buttons: ButtonProps<Category>[] = [
    {label: "Ver Productos", onClick: categoryProducts }
  ] 
  

  return (
    <Card image={category.image} title={category.name}  buttons={buttons}/> 
  );
};
