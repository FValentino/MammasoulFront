import { CategoryRepository } from "@/backend/repositories/category.repository";
import {
  mapCategoryToDTO,
  toDTOWithCount,
} from "../mappers/category.mapper";
import {
  CategoryDTO,
} from "@/types/category.type";

export class CategoryService {
  // =========================
  // GET ALL (sin conteo)
  // =========================
  static async getAll(): Promise<Omit<CategoryDTO, "product_count">[]> {
    return await CategoryRepository.findAll();
  }

  // =========================
  // GET ALL + PRODUCT COUNT
  // =========================
  static async getAllWithProducts(): Promise<CategoryDTO[]> {
    const categories = await CategoryRepository.findAllWithProductCount();
    return categories.map(toDTOWithCount);
  }

  // =========================
  // GET BY SLUG
  // =========================
  static async getBySlug(slug: string): Promise<CategoryDTO | null> {
    const category = await CategoryRepository.findBySlug(slug);
    return category ? mapCategoryToDTO(category) : null;
  }
}
