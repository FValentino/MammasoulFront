import { getDatabase } from "@/lib/data-source";
import { PurchaseDetail } from "@/backend/entities/PurchaseDetail";

export class PurchaseDetailRepository {
  private static async getRepo() {
    const db = await getDatabase();
    return db.getRepository(PurchaseDetail);
  }

  static async findById(id: number): Promise<PurchaseDetail | null> {
    const repo = await this.getRepo();
    return await repo.findOne({ where: { id } });
  }

  static async findByPurchaseId(purchaseId: number): Promise<PurchaseDetail[]> {
    const repo = await this.getRepo();
    return await repo.find({
      where: { purchase_id: purchaseId },
      relations: ["product"],
    });
  }

  static async create(data: {
    purchase_id: number;
    product_id: number;
    quantity: number;
    price: number;
    subtotal: number;
  }): Promise<PurchaseDetail> {
    const repo = await this.getRepo();
    const detail = repo.create(data);
    return await repo.save(detail);
  }

  static async update(
    id: number,
    data: Partial<{
      quantity: number;
      price: number;
      subtotal: number;
    }>
  ): Promise<PurchaseDetail> {
    const repo = await this.getRepo();
    await repo.update(id, data);
    return (await this.findById(id))!;
  }

  static async delete(id: number): Promise<void> {
    const repo = await this.getRepo();
    await repo.delete(id);
  }

  static async deleteByPurchaseId(purchaseId: number): Promise<void> {
    const repo = await this.getRepo();
    await repo.delete({ purchase_id: purchaseId });
  }
}
