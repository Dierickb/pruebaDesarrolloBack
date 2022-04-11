import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntities } from '../config/base.entity';
import { ProductEntity } from "./product.entity";

@Entity({ name: "category" })
export class CategoryEntity extends BaseEntities {
  @Column()
  categoryName: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
