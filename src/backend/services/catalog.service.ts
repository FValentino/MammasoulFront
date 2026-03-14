import { ProductRepository } from "../repositories/product.repository";
import { CategoryRepository } from "../repositories/category.repository";

export class CatalogService {
  static async getCatalog() {
    const [products, featured, categories] = await Promise.all([
      ProductRepository.findActive(),
      ProductRepository.findFeatured(),
      CategoryRepository.findAll(),
    ]);

    return {
      products,
      featured,
      categories,
    };
  }

  static async getProductBySlug(slug: string) {
    if (!slug) return null;

    const product = await ProductRepository.findBySlug(slug);

    if (!product || !product.is_active || (product?.stock !== null && product?.stock <= 0)) {
      return null;
    }
    
    return {
      ...product,
      price: Number(product.price),
    };
  }
}
