import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, type Relation, CreateDateColumn } from "typeorm";
import { Category } from "./Category";
import { ProductImage } from "./ProductImage";
import { PurchaseDetail } from "./PurchaseDetail";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("text")
  description!: string;

  @Column("decimal", { precision: 12, scale: 2 })
  price!: number;

  @Column({ default: 0, nullable: true })
  stock!: number;

  @Column()
  category_id!: number;

  @Column({ default: true, nullable: true })
  is_active!: boolean;

  @Column({ default: false, nullable: true })
  is_feature!: boolean;

  @Column({ default: false, nullable: true })
  in_sale!: boolean;

  @Column("decimal", { precision: 5, scale: 2, default: 0, nullable: true })
  sale!: number;

  @Column({ unique: true })
  slug!: string;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToOne(()=>Category, (category)=>category.products, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "category_id" })
  category!: Relation<Category>;


  @OneToMany(()=>ProductImage, (image: ProductImage) => image.product)
  product_images!: Relation<ProductImage[]>;

  @OneToMany(()=>PurchaseDetail, (detail: any) => detail.product)
  purchase_detail!: Relation<PurchaseDetail[]>;
}