import { PurchaseRepository } from "../repositories";
import { VisitorRepository } from "../repositories";
import { Purchase } from "../entities/Purchase";
import { PurchaseStatus } from "../entities/Enums";

export class PurchaseService {
  static async createPurchaseOrder(purchaseData: {
    client_id: number;
    total: number;
    cart_snapshot?: any;
  }): Promise<Purchase> {
    try {
      const purchase = await PurchaseRepository.create(purchaseData);
      if (!purchase) throw new Error("Error creating purchase");
      return purchase;
    } catch (error) {
      console.error("Error creating purchase: ", error);
      throw error;
    }
  }

  static async updatePurchase(
    purchaseId: number,
    paymentId: string
  ): Promise<Purchase> {
    try {
      const purchase = await PurchaseRepository.updateStatus(
        purchaseId,
        PurchaseStatus.SUCCESS,
        paymentId
      );
      if (!purchase) throw new Error("Error updating purchase");
      return purchase;
    } catch (error) {
      console.error("Error updating purchase: ", error);
      throw error;
    }
  }

  static async updateTotal(
    id: number,
    total: number
  ): Promise<Purchase | null> {
    try {
      const purchase = await PurchaseRepository.findById(id);
      if (!purchase) throw new Error("purchase not found");

      await PurchaseRepository.update(purchase.id, { total });

      return await PurchaseRepository.findById(purchase.id);
    } catch (error) {
      console.error("Error updating purchase: ", error);
      throw error;
    }
  }

  static async getPurchaseById(id: number): Promise<Purchase | null> {
    return await PurchaseRepository.findById(id);
  }

  static async getPurchasesByClient(clientId: number): Promise<Purchase[]> {
    return await PurchaseRepository.findByClientId(clientId);
  }
}
