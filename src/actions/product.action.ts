"use server";

import { revalidatePath } from "next/cache";
import { ProductService } from "@/backend/services/product.service";
import { 
  ProductDTO
} from "@/types/product.type";

/* =========================
   READ
   ========================= */

export async function getProducts(): Promise<ProductDTO[]> {
  return ProductService.getAll();
}

export async function getProductBySlug( slug: string): Promise<ProductDTO | null> {
  return ProductService.getBySlug(slug);
}

export async function getActiveProducts(): Promise<ProductDTO[] | null> {
  return ProductService.getActive();
}

export async function getFeaturedProducts(): Promise<ProductDTO[] | null> {
  return ProductService.getFeatured();
}