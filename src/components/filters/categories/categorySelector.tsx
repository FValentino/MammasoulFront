import type { Dispatch, SetStateAction } from "react";
import type { Category } from "../../../types/category";
import { ChevronDown } from "lucide-react";
import { getAllcategories } from "../../../services/categoryService";

interface Props{
  setCategory : Dispatch<SetStateAction<Category | null>>
}

export default function CategorySelector ({setCategory}: Props) {

  const categories = getAllcategories();

  return (
    <div className="w-2/3 flex flex-col justify-center items-center md:flex-row ">
      <span className="text-lg font-bold">Buscar una categoria: </span>
      
      <div className="w-full ms-0 flex items-center border rounded-full cursor-pointer relative md:w-[50%] md:ms-2">
        <select name="categories" 
          className="w-full relative cursor-pointer text-center appearance-none focus:rounded-full"
          onChange={(e) => {
            const selectedId = Number(e.target.value);
            if (selectedId === 0) {
              setCategory(null); 
            } else {
              const selectedCategory = categories.find(cat => cat.id === Number(selectedId));
              setCategory(selectedCategory || null);
            }
          }}
        >
          <option selected value="0" className="text-sm md:text-lg">Todos los productos</option>
          {
            categories.map( (category)=> <option value={category.id} className="text-sm md:text-lg">{category.name}</option> )
          }
        </select>  
        <span className="absolute right-2 pointer-events-none text-gray-600 text-xl"> 
          <ChevronDown /> 
        </span>
      </div>
    </div>
  );
};
