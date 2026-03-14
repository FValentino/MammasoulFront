import { PurchaseDetailRepository } from "../repositories";
import { PurchaseDetail } from "../entities/PurchaseDetail";

export class PurchaseDetailService {
  static async createPurchaseDetail(data: {
    purchase_id: number;
    product_id: number;
    quantity: number;
    price: number;
    subtotal: number;
  }): Promise<PurchaseDetail> {
    try {
      return await PurchaseDetailRepository.create(data);
    } catch (error) {
      console.error("Error creating purchase detail: ", error);
      throw error;
    }
  }

  static async getByPurchaseId(
    purchaseId: number
  ): Promise<PurchaseDetail[]> {
    return await PurchaseDetailRepository.findByPurchaseId(purchaseId);
  }
}
