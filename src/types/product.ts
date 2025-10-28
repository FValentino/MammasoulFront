export interface ProductImage {
  id: number;
  url: string;
  isRepresentative: boolean;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  isActive: boolean;
  inSale: boolean;
  isFeature: boolean;
  images?: ProductImage[];
}

export interface ProductCart extends Product{
  quantity: number;
}

export interface CartData {
  cart: ProductCart[],
  total: number
}

