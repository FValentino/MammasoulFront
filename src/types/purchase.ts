export interface Purchase{
  id?:number;
  clientId: number;
  total: number;
}

export interface PurchaseDetail{
  id?: number;
  purchaseId: number;
  productId: number;
  quantity: number;
  price: number;
  subtotal: number;
}