import { useQuery } from "@tanstack/react-query";
import { getAllProducts, getProductById, getFeaturedProducts } from "../../services/productService";
import type { Product } from "../../types";

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 1000 * 60 * 5, 
  });
}

export function useProduct(id: number){
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: ()=>getProductById(id),
    enabled: Boolean(id)
  });
}

export function useFeaturedProducts(){
  return useQuery<Product[]>({
    queryKey: ["products", "featured"],
    queryFn: getFeaturedProducts,
    staleTime: 1000 * 60 * 5
  });
}