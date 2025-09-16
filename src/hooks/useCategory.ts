import { useQuery } from "@tanstack/react-query";
import { getAllActiveCategories } from "../services/categoryService";
import type { Category } from "../types";

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"], 
    queryFn: getAllActiveCategories, 
    staleTime: 1000 * 60 * 5, 
  });
}

