import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn, type Relation } from "typeorm";
import { Visitor } from "./Visitor";
import { PurchaseDetail } from "./PurchaseDetail";
import { PurchaseStatus } from "./Enums";

@Entity("purchase")
export class Purchase {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int", nullable: true, default: 0 })
  client_id!: number;

  @CreateDateColumn({ type: "timestamp", precision: 6, default: () => "CURRENT_TIMESTAMP" })
  purchase_date!: Date;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total!: number;

  @Column({ type: "enum", enum: PurchaseStatus, default: PurchaseStatus.PENDING })
  status!: PurchaseStatus;

  @Column({ type: "varchar", nullable: true, default: "null" })
  payment_id!: string;

  @Column({ type: "jsonb" })
  cart_snapshot!: any;

  @ManyToOne(()=>Visitor, (visitor)=>visitor.purchases, { onUpdate: 'NO ACTION' })
  @JoinColumn({ name: "client_id" })
  visitor!: Relation<Visitor>;

  @OneToMany(()=>PurchaseDetail, (detail: any) => detail.purchase)
  purchase_detail!: Relation<PurchaseDetail[]>;
}