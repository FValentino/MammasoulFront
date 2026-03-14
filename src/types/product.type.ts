/* =========================
   DTOs DE SALIDA (RESPONSES)
   ========================= */

import { CategoryDTO } from "./category.type";

export interface ProductImageDTO {
  id: number;
  url: string;
  is_representative: boolean | null;
}

export interface ProductDTO {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  is_active: boolean;
  is_feature: boolean;
  in_sale: boolean;
  sale: number | null;

  product_images: ProductImageDTO[];
  categories: CategoryDTO;
}

export interface GenericProductListDTO {
  id: number;
  name: string;
  price: number;
  is_active: boolean;
  product_image: {
    id: number;
    url: string;
  } | null; 
}

export interface ProductCart extends ProductDTO{
  quantity: number;
  subtotal: number;
}

export interface UploadedProductImage {
  url: string;
  is_representative: boolean;
}

export interface CreateProductImageDTO {
  product_id: number;
  url: string;
  is_representative: boolean;
}
