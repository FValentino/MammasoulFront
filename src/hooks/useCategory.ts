import { useQuery } from "@tanstack/react-query";
import { getAllcategories } from "../services/categoryService";
import type { Category } from "../types";

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"], 
    queryFn: getAllcategories, 
    staleTime: 1000 * 60 * 5, 
  });
}
