import {
  PurchaseDTO,
  PurchaseWithDetailDTO,
} from "@/types/purchase.type";

export class PurchaseMapper {
  static toDTO(purchase: any): PurchaseDTO {
    const details = (purchase.purchase_details || []).map((d: any) => ({
      id: d.id,
      product_id: d.product_id,
      product_name: d.product?.name ?? "Producto no encontrado",
      quantity: d.quantity,
      price: Number(d.price),
      subtotal: Number(d.subtotal),
    }));

    return {
      id: purchase.id,
      client_id: purchase.client_id,
      purchase_date: purchase.purchase_date,
      total: Number(purchase.total),
      status: purchase.status as any,
      payment_id: purchase.payment_id,
      purchase_count: purchase.detailsCount ?? details.length,
      visitor: purchase.visitor ? {
        id: purchase.visitor.id,
        name: purchase.visitor.name,
        email: purchase.visitor.email,
        tel: purchase.visitor.tel,
        is_buyer: true,
        purchase_count: 0
      } : null,
      details: details,
    };
  }

  static toDetailDTO(purchase: any): PurchaseWithDetailDTO {
    const base = this.toDTO(purchase);
    return {
      ...base,
      cart_snapshot: purchase.cart_snapshot,
    };
  }
}

export function mapPurchaseToDTO(purchase: any, details?: any[]) {
  return PurchaseMapper.toDTO(purchase);
}