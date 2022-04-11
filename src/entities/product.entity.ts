import { Column, Entity, ManyToOne, JoinColumn, ManyToMany } from "typeorm";
import { BaseEntities } from '../config/base.entity';
import { CategoryEntity } from "./category.entity";
import { PurchaseProductEntity } from "../entities/custom/purchases-products.entity";

@Entity({ name: "product" })
export class ProductEntity extends BaseEntities {
  @Column()
  productName: string;

  @Column()
  description: string;

  @Column()
  price: number;

  //Un producto contiene a una categoria
  // Pero una categoria contiene muchos productos

  @ManyToOne(() => CategoryEntity, (category) => category.products, { eager: true })
  category: CategoryEntity;

  @ManyToMany(() => PurchaseProductEntity, (purchaseProduct) => purchaseProduct.products)
  purchaseProduct: PurchaseProductEntity[];
}
