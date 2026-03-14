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


export type PurchaseStatus = 'pending' | 'completed' | 'cancelled' | 'shipped';


export interface PurchaseDetailDTO {
  id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface PurchaseVisitorDTO {
  id: number;
  name: string;
  email: string;
  tel: string;
  is_buyer: boolean;
  purchase_count: number;
}

export interface PurchaseDTO {
  id: number;
  client_id: number | null;
  purchase_date: Date | string;
  total: number;
  status: PurchaseStatus;
  payment_id: string | number | null;
  purchase_count: number;
  visitor: PurchaseVisitorDTO | null;
  details: PurchaseDetailDTO[];
}

export interface PurchaseWithDetailDTO extends PurchaseDTO {
  cart_snapshot: any; 
}