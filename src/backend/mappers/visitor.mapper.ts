import { VisitorDTO } from "@/types/visitor.type";

export class VisitorMapper {
  static toDTO(visitor: any): VisitorDTO {
    return {
      id: visitor.id,
      name: visitor.name,
      email: visitor.email,
      tel: visitor.tel,
      is_buyer: Boolean(visitor.is_buyer),
      // En TypeORM usamos la propiedad virtual que mapeamos en el repo
      purchase_count: visitor.purchaseCount ?? (visitor.purchases?.length || 0),
    };
  }
}