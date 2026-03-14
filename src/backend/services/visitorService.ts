import { VisitorRepository } from "../repositories";
import { Visitor } from "../entities/Visitor";

export class VisitorService {
  static async getVisitorByEmail(email: string): Promise<Visitor | null> {
    try {
      return await VisitorRepository.findByEmail(email);
    } catch (error) {
      console.error("Error retrieving Visitor: ", error);
      throw error;
    }
  }

  static async createVisitor(data: {
    name: string;
    email: string;
    phone: string;
  }): Promise<Visitor> {
    try {
      let visitor = await VisitorRepository.findByEmail(data.email);
      if (!visitor) {
        visitor = await VisitorRepository.create({
          name: data.name,
          email: data.email,
          tel: data.phone,
        });
      }
      return visitor;
    } catch (error) {
      console.error("Error creating Visitor: ", error);
      throw error;
    }
  }

  static async changeToClient(email: string): Promise<Visitor | null> {
    try {
      const visitor = await VisitorRepository.findByEmail(email);
      if (!visitor) throw new Error("visitor not found");

      await VisitorRepository.update(visitor.id, { is_buyer: true });

      return await VisitorRepository.findByEmail(visitor.email);
    } catch (error) {
      console.error("Error updating visitor: ", error);
      throw error;
    }
  }
}
