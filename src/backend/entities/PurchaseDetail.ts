import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  JoinColumn, 
  type Relation // Importamos como tipo
} from "typeorm";

// Usamos 'import type' para que el compilador ignore la clase en tiempo de ejecución
import { Product } from "./Product";
import { Purchase } from "./Purchase";

@Entity("purchase_detail")
export class PurchaseDetail {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  purchase_id!: number;

  @Column()
  product_id!: number;

  @Column()
  quantity!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  subtotal!: number;

  // 1. Usamos el string "Product" en lugar de la clase
  // 2. Usamos Relation<Product> para el tipado
  @ManyToOne(() => Product, (product) => product.purchase_detail, { onUpdate: 'NO ACTION' })
  @JoinColumn({ name: "product_id" })
  product!: Relation<Product>;

  // Aplicamos lo mismo para Purchase
  @ManyToOne(()=>Purchase, (purchase) => purchase.purchase_detail, { onDelete: 'CASCADE', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: "purchase_id" })
  purchase!: Relation<Purchase>;
}