interface EstadoProducto {
  SUCCESS: "success",
  REJECTED: "rejected",
  PENDING: "pending",
}

export interface Purchase{
  id?:number;
  clientId: number;
  total: number;
  status?: EstadoProducto;
}

export interface PurchaseDetail{
  id?: number;
  purchaseId: number;
  productId: number;
  quantity: number;
  price: number;
  subtotal: number;
}
