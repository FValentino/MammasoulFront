import { type Dispatch, type SetStateAction } from "react";
import type { Category } from "../../../types/category";
import { getAllcategories } from "../../../services/categoryService";

interface Props{
  selectedCategories : Category[];
  setCategories : Dispatch<SetStateAction<Category[]>>;
}

export default function CategorySelector ({selectedCategories, setCategories}: Props) {
  const allCategories = getAllcategories();

  return (
    <div className="w-1/3 flex flex-row justify-center items-center md:flex-col">
      <h3 className="text-xl font-bold  mx-auto">Categorias </h3>
      
      <div className="w-auto ms-0 mx-auto flex justify-center items-center cursor-pointer relative my-4">
        <fieldset className="mx-auto">
          {
            allCategories.map( (category) => ( 
              <label key={category.id} className="flex items-center gap-2 text-lg my-1 hover:cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.some((cat) => cat.id === category.id)}
                  onChange={() =>
                    setCategories(
                      selectedCategories.some((cat) => cat.id === category.id)
                        ? selectedCategories.filter((cat) => cat.id !== category.id)
                        : [...selectedCategories, category]
                    )
                  }
                  className="accent-white"
                />
                {category.name}
              </label>
            ))
          }
        </fieldset>
      </div>
    </div>
  );
};
