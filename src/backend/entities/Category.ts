import { Entity, PrimaryGeneratedColumn, Column, OneToMany, type Relation } from "typeorm";
import { Product } from "./Product";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  slug!: string;

  @Column({ type: "text", nullable: true })
  image!: string | null;

  @Column({ type: "boolean", default: true, nullable: true })
  is_active!: boolean | null;

  @OneToMany(() => Product, (product) => product.category)
  products!: Relation<Product[]>;
}