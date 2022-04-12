import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm'


import { PurchaseProductEntity } from './custom/purchases-products.entity';
import { BaseEntities } from '../config/base.entity'

@Entity({name:"user"})
export class UserEntity extends BaseEntities {
    
    @Column()
    name: string

    @Column({
        length: 750
    })
    password: string

    @Column()
    nickName: string

    @Column()
    money: number

    @OneToMany(() => PurchaseProductEntity, (purchaseProduct) => purchaseProduct.user)
    purchaseProduct: PurchaseProductEntity[];

};