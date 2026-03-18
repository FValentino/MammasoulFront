import { GenericProductListDTO, ProductDTO, ProductImageDTO } from "@/types/product.type";

/**
 * Mapea una entidad de TypeORM al ProductDTO (ADMIN)
 */
export function mapProductToDTO(product: any): ProductDTO {
  // Nota: En TypeORM, si tu relación se llama "category" en la entidad,
  // debes acceder a product.category, no product.categories.
  const category = product.category || product.categories; 

  return {
    id: product.id,
    name: product.name,
    description: product.description ?? "",
    price: Number(product.price),
    stock: product.stock ?? 0,
    category_id: product.category_id,
    is_active: Boolean(product.is_active),
    is_feature: Boolean(product.is_feature),
    in_sale: Boolean(product.in_sale),
    sale: product.sale ? Number(product.sale) : null,
    slug: product.slug,

    // Mapeo seguro de imágenes
    product_images: (product.product_images || []).map((img: any) => ({
      product_id: product.id,
      id: img?.id ?? 0,
      url: img?.url ?? "",
      is_representative: Boolean(img?.is_representative),
    })),

    // Mapeo seguro de categoría
    categories: category ? {
      id: category.id,
      name: category.name,
      slug: category.slug,
      image: category.image,
      is_active: Boolean(category.is_active),
      product_count: 0
    } : null as any, // Manejo por si el producto no tiene categoría
  };
}

export function mapToListDTO(product: ProductDTO): GenericProductListDTO {
  const firstImage = product.product_images?.[0];

  return {
    id: product.id,
    name: product.name,
    price: Number(product.price),
    is_active: Boolean(product.is_active),
    product_image: firstImage ? {
      id: firstImage.id,
      url: firstImage.url
    } : null
  };
}