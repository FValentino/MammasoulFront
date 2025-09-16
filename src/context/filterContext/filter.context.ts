import { createContext, useContext } from "react";
import type { Product } from "../../types";

// Tipo de contexto
type FilterContextType = {
  categories: number[]; // IDs de categorías seleccionadas
  setCategories: (categories: number[]) => void;
  toggleCategory: (id: number) => void;
  resetCategories: () => void;
  filteredProducts:Product[];
};


// Crear contexto
export const FilterContext = createContext<FilterContextType | null>(null);


// Hook para consumirlo
export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error("useFilter must be used within a FilterProvider");
  return context;
};
