'use server'

import { CategoryService } from "@/backend/services/category.service"
import { CategoryDTO } from "@/types/category.type"

export async function getCategories(): Promise<Omit<CategoryDTO, "product_count">[]> {
  return await CategoryService.getAll()
}

export async function getCategoriesWithCount(): Promise<CategoryDTO[]> {
  return await CategoryService.getAllWithProducts()
}

export async function getCategoryBySlug(slug: string): Promise<CategoryDTO | null> {
  return await CategoryService.getBySlug(slug)
}
