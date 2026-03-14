import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, type Relation } from "typeorm";
import { Product } from "./Product"; 

@Entity("product_images")
export class ProductImage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  product_id!: number;

  @Column()
  url!: string;

  @Column({ type: "boolean", nullable: true })
  is_representative!: boolean;

  @ManyToOne(()=>Product, (product: Product) => product.product_images, {
    onDelete: 'CASCADE', 
    onUpdate: 'NO ACTION' 
  })
  @JoinColumn({ name: "product_id" })
  product!: Relation<Product>;
}