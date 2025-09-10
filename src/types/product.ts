export interface Product {
  id: number;
  name: string;
  description: string;
  lifeCycling: string;
  image: string;  
  price: number;
  stock: number;
  category: number;
  inSale: boolean;
  isActive: boolean;
}

export interface ProductCart extends Product{
  quantity: number;
}
