'use server'

import { ProductService } from "@/backend/services/product.service"
import { ProductDTO } from "@/types/product.type"

export async function getProducts(): Promise<ProductDTO[]> {
  const products = await ProductService.getActive()
  return products ?? []
}

export async function getAllProducts(): Promise<ProductDTO[]> {
  const products = await ProductService.getAll()
  return products ?? []
}

export async function getProductBySlug(slug: string): Promise<ProductDTO | null> {
  return await ProductService.getBySlug(slug)
}

export async function getFeaturedProducts(): Promise<ProductDTO[]> {
  const products = await ProductService.getFeatured()
  return products ?? []
}
