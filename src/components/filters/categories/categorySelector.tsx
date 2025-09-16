import { useFilter } from "../../../context";
import { useCategories } from "../../../hooks/category/useCategory";

export default function CategorySelector () {
  const { data: allCategories } = useCategories()
  const { categories, toggleCategory } = useFilter();

  return (
    <div className="w-auto flex flex-col justify-center items-center ">
      <h3 className="text-xl font-bold  mx-auto">Categorias </h3>
      
      <div className="w-auto mx-auto flex justify-center items-center cursor-pointer relative my-4">
        <fieldset className="mx-auto flex flex-row md:flex-col">
          {
            allCategories &&
              allCategories.map( (category) => (
                <label key={category.id} className="flex items-center gap-2 text-lg my-1 mx-2 hover:cursor-pointer">
                  <input
                    type="checkbox"
                    checked={categories.includes(Number(category.id))}
                    onChange={() => toggleCategory(Number(category.id))}
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
