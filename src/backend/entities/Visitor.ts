import { Entity, PrimaryGeneratedColumn, Column, OneToMany, type Relation } from "typeorm";
import { Purchase } from "./Purchase";

@Entity("visitors")
export class Visitor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  name!: string;

  @Column({ length: 255 })
  email!: string;

  @Column({ length: 50 })
  tel!: string;

  @Column({ type: "boolean", default: false, nullable: true })
  is_buyer!: boolean;

  @OneToMany(()=>Purchase, (purchase: Purchase) => purchase.visitor)
  purchases!: Relation<Purchase[]>;
}