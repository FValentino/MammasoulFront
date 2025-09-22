import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllActiveProducts, getProductById, getFeaturedProducts, updateProductStock } from "../../services/productService";
import type { Product } from "../../types";

interface updateProductDTO{
  id: number;
  quantity: number;
}

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllActiveProducts,
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

export function useUpdateStock() {
  return useMutation<Product, Error, updateProductDTO>({
    mutationFn: (data: updateProductDTO) => updateProductStock(data.id, data.quantity),
  })
}