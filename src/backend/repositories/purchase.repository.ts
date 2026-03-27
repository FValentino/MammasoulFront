import { getDatabase } from "@/lib/data-source";
import { Purchase } from "@/backend/entities/Purchase";
import { PurchaseStatus } from "@/backend/entities/Enums";

export class PurchaseRepository {
  private static async getRepo() {
    const db = await getDatabase();
    return db.getRepository(Purchase);
  }

  static async findById(id: number): Promise<Purchase | null> {
    const repo = await this.getRepo();
    return await repo.findOne({ where: { id } });
  }

  static async findByClientId(clientId: number): Promise<Purchase[]> {
    const repo = await this.getRepo();
    return await repo.find({
      where: { client_id: clientId },
      order: { purchase_date: "DESC" },
    });
  }

  static async findByEmail(email: string): Promise<Purchase[]> {
    const repo = await this.getRepo();
    const purchases = await repo
      .createQueryBuilder("purchase")
      .innerJoin("purchase.visitor", "visitor")
      .where("visitor.email = :email", { email })
      .orderBy("purchase.purchase_date", "DESC")
      .getMany();
    return purchases;
  }

  static async findAll(): Promise<Purchase[]> {
    const repo = await this.getRepo();
    return await repo.find({
      order: { purchase_date: "DESC" },
    });
  }

  static async create(data: {
    client_id: number;
    total: number;
    status?: PurchaseStatus;
    cart_snapshot?: any;
    payment_id?: string;
  }): Promise<Purchase> {
    const repo = await this.getRepo();
    const purchase = repo.create({
      ...data,
      status: data.status ?? PurchaseStatus.PENDING,
    });
    return await repo.save(purchase);
  }

  static async update(
    id: number,
    data: Partial<{
      status: PurchaseStatus;
      payment_id: string;
      total: number;
      cart_snapshot: any;
    }>
  ): Promise<Purchase> {
    const repo = await this.getRepo();
    await repo.update(id, data);
    return (await this.findById(id))!;
  }

  static async delete(id: number): Promise<void> {
    const repo = await this.getRepo();
    await repo.delete(id);
  }

  static async updateStatus(
    id: number,
    status: PurchaseStatus,
    paymentId?: string
  ): Promise<Purchase> {
    const repo = await this.getRepo();
    await repo.update(id, {
      status,
      payment_id: paymentId,
    });
    return (await this.findById(id))!;
  }
}
