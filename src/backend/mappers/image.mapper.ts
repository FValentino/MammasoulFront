// mappers/productImage.mapper.ts
import { CreateProductImageDTO, UploadedProductImage } from "@/types/product.type"

export class ProductImageMapper {
  static toCreateMany(
    product_id: number,
    images: UploadedProductImage[]
  ): CreateProductImageDTO[] {
    return images.map((img) => ({
      product_id,
      url: img?.url ?? "",
      is_representative: Boolean(img?.is_representative),
    }))
  }
}
