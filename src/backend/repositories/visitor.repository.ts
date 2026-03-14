import { getDatabase } from "@/lib/data-source";
import { Visitor } from "@/backend/entities/Visitor";
import { VisitorDTO } from "@/types/visitor.type";

export class VisitorRepository {
  private static async getRepo() {
    const db = await getDatabase();
    return db.getRepository(Visitor);
  }

  static async findByEmail(email: string): Promise<Visitor | null> {
    const repo = await this.getRepo();
    return await repo.findOne({ where: { email } });
  }

  static async findById(id: number): Promise<Visitor | null> {
    const repo = await this.getRepo();
    return await repo.findOne({ where: { id } });
  }

  static async findAll(): Promise<Visitor[]> {
    const repo = await this.getRepo();
    return await repo.find();
  }

  static async create(data: {
    name: string;
    email: string;
    tel: string;
    is_buyer?: boolean;
  }): Promise<Visitor> {
    const repo = await this.getRepo();
    const visitor = repo.create(data);
    return await repo.save(visitor);
  }

  static async update(
    id: number,
    data: Partial<{
      name: string;
      email: string;
      tel: string;
      is_buyer: boolean;
    }>
  ): Promise<Visitor> {
    const repo = await this.getRepo();
    await repo.update(id, data);
    return (await this.findById(id))!;
  }

  static async delete(id: number): Promise<void> {
    const repo = await this.getRepo();
    await repo.delete(id);
  }
}
