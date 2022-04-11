import {
    BaseEntity,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"

export class BaseEntities extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        name: "created_ad",
        type: "timestamp"
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: "updated_ad",
        type: "timestamp",
    })
    updatedAt: Date;

};