import { CategoryDTO } from "@/types/category.type";

/**
 * Mapper base (sin conteo)
 */
export function mapCategoryToDTO(category: any): CategoryDTO {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    image: category.image,
    is_active: Boolean(category.is_active),
    product_count: 0,
  };
}

/**
 * Mapper con conteo de productos
 * Usa product_count agregado por loadRelationCountAndMap
 */
export function toDTOWithCount(category: any): CategoryDTO {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    image: category.image,
    is_active: Boolean(category.is_active),
    product_count: Number(category.product_count ?? 0),
  };
}
