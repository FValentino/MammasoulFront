"use client";

import { CategoryDTO } from "@/types";

interface Props {
  categories: Omit<CategoryDTO, "product_count">[];
  selectedCategories: number[];
  toggleCategory: (id: number) => void;
}

export default function CategorySelector({
  categories,
  selectedCategories,
  toggleCategory,
}: Props) {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-bold">Categorías</h3>

      <fieldset className="mt-4 flex flex-row md:flex-col">
        {categories.map(category => (
          <label
            key={category.id}
            className="flex items-center gap-2 text-lg my-1 mx-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.id)}
              onChange={() => toggleCategory(category.id)}
              className="accent-black"
            />
            {category.name}
          </label>
        ))}
      </fieldset>
    </div>
  );
}
