import { getDatabase } from "@/lib/data-source";
import { Product } from "@/backend/entities/Product";
import {
  ProductDTO,
} from "@/types/product.type";
import { mapProductToDTO } from "../mappers/product.mapper";

export class ProductRepository {
  private static async getRepo() {
    const db = await getDatabase();
    return db.getRepository(Product);
  }

  /* =========================
      READ
     ========================= */

  static async findAll(): Promise<ProductDTO[]> {
    const repo = await this.getRepo();
    const products = await repo.find({
      relations: ["product_images", "category"],
      order: { id: "DESC" },
    });

    return products.map((product: Product) => mapProductToDTO(product));
  }

  static async findBySlug(slug: string): Promise<ProductDTO | null> {
    const repo = await this.getRepo();
    const product = await repo.findOne({
      where: { slug },
      relations: ["product_images", "category"],
    });

    console.log("FIND PRODUCT REPOSITORY: ", product)

    if (!product) return null;
    return mapProductToDTO(product);
  }

  static async findActive(): Promise<ProductDTO[] | null> {
    const repo = await this.getRepo();
    const products = await repo.find({
      where: { is_active: true},
      relations: ["product_images", "category"],
    });

    if (!products) return null;
    return products.map((product) => mapProductToDTO(product));
  }

  static async findFeatured(): Promise<ProductDTO[] | null> {
    const repo = await this.getRepo();
    const products = await repo.find({
      where: { is_feature: true},
      relations: ["product_images", "category"],
    });

    if (!products) return null;
    return products.map((product) => mapProductToDTO(product));
  }

}