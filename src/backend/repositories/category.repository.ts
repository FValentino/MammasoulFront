import { getDatabase } from "@/lib/data-source";
import { Category } from "@/backend/entities/Category";
import {
  CategoryDTO,
} from "@/types/category.type";
import { mapCategoryToDTO } from "../mappers/category.mapper";

export class CategoryRepository {
  private static async getRepo() {
    const db = await getDatabase();
    return db.getRepository(Category);
  }

  // =========================
  // FIND ALL (sin conteo)
  // =========================
  static async findAll(): Promise<Omit<CategoryDTO, "product_count">[]> {
    const repo = await this.getRepo();

    const categories = await repo.find({
      order: { id: "DESC" },
    });

    return categories.map(mapCategoryToDTO);
  }

  // =========================
  // FIND ALL + PRODUCT COUNT
  // =========================
  static async findAllWithProductCount(): Promise<any[]> {
    const repo = await this.getRepo();

    return await repo
      .createQueryBuilder("category")
      .loadRelationCountAndMap(
        "category.product_count",
        "category.products"
      )
      .orderBy("category.id", "DESC")
      .getMany();
  }

  // =========================
  // FIND BY SLUG
  // =========================
  static async findBySlug(slug: string): Promise<CategoryDTO | null> {
    const repo = await this.getRepo();

    const category = await repo.findOne({
      where: { slug },
    });

    return category ? mapCategoryToDTO(category) : null;
  }

}
