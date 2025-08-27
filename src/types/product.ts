export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;  
  stock: number;
  category: number;
}

export interface ProductCart extends Product{
  quantity: number;
}
