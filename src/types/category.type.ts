export interface CategoryDTO {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  is_active: boolean | null;
  product_count: number;
}

/* =========================
   CREATE / UPDATE
   ========================= */

export interface CreateCategoryDTO {
  name: string;
  slug: string;
  image: string | null;
}

export interface UpdateCategoryDTO {
  name?: string;
  slug?: string;
  image?: string | null;
  is_active?: boolean;
}
