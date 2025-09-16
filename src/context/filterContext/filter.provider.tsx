import { useMemo, useState, type ReactNode } from "react";
import { FilterContext } from "./filter.context";
import { useProducts } from "../../hooks";

interface ChildrenProps{
  children: ReactNode;
}

// Provider
export const FilterProvider = ({ children }: ChildrenProps) => {
  const {data: products} = useProducts();

  const [categories, setCategories] = useState<number[]>([]);

  const toggleCategory = (id: number) => {
    setCategories(prev =>
      prev.includes(id) ? prev.filter(catId => catId !== id) : [...prev, id]
    );
  }

  const resetCategories = () => setCategories([]);


  const filteredProducts = useMemo(() => {
    if (!products) return [];

    if (categories.length === 0) return products;
    
    return products.filter(p => categories.includes(Number(p.categoryId)));
  }, [products, categories]);


  return (
    <FilterContext.Provider value={{ categories, setCategories, toggleCategory, resetCategories, filteredProducts }}>
      {children}
    </FilterContext.Provider>
  );
};

