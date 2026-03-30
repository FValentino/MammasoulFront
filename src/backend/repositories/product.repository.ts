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
    const products = await repo
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.product_images", "image")
      .andWhere("image.id IS NOT NULL")
      .getMany();


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
    const products = await repo
      .createQueryBuilder("product")
      .leftJoin("product.product_images", "image")
      .where("product.is_active = :isActive", { isActive: true })
      .andWhere("image.id IS NOT NULL")
      .groupBy("product.id")
      .getMany();

    if (!products) return null;
    return products.map((product) => mapProductToDTO(product));
  }

  static async findFeatured(): Promise<ProductDTO[] | null> {
    const repo = await this.getRepo();
    const products = await repo
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.product_images", "image")
      .where("product.is_feature = :isFeature", { isFeature: true })
      .andWhere("product.is_active = :isActive", { isActive: true })
      .andWhere("image.id IS NOT NULL")
      .getMany();

    if (!products) return null;

    console.log("Featured products repo: ", products)
    return products.map((product) => mapProductToDTO(product));
  }

}