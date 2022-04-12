import { Column, Entity, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { BaseEntities } from '../../config/base.entity';
import { ProductEntity } from "../product.entity";
import { UserEntity } from "../auth.entity";

@Entity({ name: "products_purchases" })
export class PurchaseProductEntity extends BaseEntities {
  @Column("int", {array: true})
  quantityProduct: number[];

  @Column()
  totalPrice: number;

  @ManyToOne(() => UserEntity, (user) => user.purchaseProduct)
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @ManyToMany(() => ProductEntity, (product) => product.purchaseProduct, { eager: true })
  @JoinTable({ 
    name: "products_purchases_products_product",
    joinColumn: {
      name: "productsPurchasesId"
    },
    inverseJoinColumn: {
      name: "productId",
    }
  })
  @JoinTable({})
  products: ProductEntity[];
}
