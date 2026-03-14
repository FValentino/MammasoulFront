"use server";

import { CategoryService } from "@/backend/services/category.service";
import {
  CategoryDTO
} from "@/types/category.type";

/* =========================
   READ
   ========================= */

export async function getCategories(): Promise<Omit<CategoryDTO, "product_count">[]> {
  return CategoryService.getAll();
}

export async function getCategoriesWithProducts(): Promise<CategoryDTO[]> {
  return CategoryService.getAllWithProducts();
}


