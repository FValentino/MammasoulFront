import { ProductRepository } from "@/backend/repositories/product.repository";
import {
  ProductDTO,
} from "@/types/product.type";

export class ProductService {
  /* =========================
      READ
     ========================= */

  static async getAll(): Promise<ProductDTO[]> {
    const products = await ProductRepository.findAll();
    return products ?? [];
  }

  static async getBySlug(slug: string): Promise<ProductDTO | null> {
    return await ProductRepository.findBySlug(slug);
  }

  static async getActive(): Promise<ProductDTO[]> {
    const products = await ProductRepository.findActive();
    return products ?? [];
  }

  static async getFeatured(): Promise<ProductDTO[]> {
    const products = await ProductRepository.findFeatured();
    return products ?? [];
  }

}