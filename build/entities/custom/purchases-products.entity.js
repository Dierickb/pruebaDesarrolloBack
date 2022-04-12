"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseProductEntity = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../config/base.entity");
const product_entity_1 = require("../product.entity");
const auth_entity_1 = require("../auth.entity");
let PurchaseProductEntity = class PurchaseProductEntity extends base_entity_1.BaseEntities {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PurchaseProductEntity.prototype, "quantityProduct", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PurchaseProductEntity.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => auth_entity_1.UserEntity, (user) => user.purchaseProduct),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", auth_entity_1.UserEntity)
], PurchaseProductEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => product_entity_1.ProductEntity, (product) => product.purchaseProduct, { eager: true }),
    (0, typeorm_1.JoinTable)({
        name: "products_purchases_products_product",
        joinColumn: {
            name: "productsPurchasesId"
        },
        inverseJoinColumn: {
            name: "productId",
        },
    }),
    __metadata("design:type", Array)
], PurchaseProductEntity.prototype, "products", void 0);
PurchaseProductEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "products_purchases" })
], PurchaseProductEntity);
exports.PurchaseProductEntity = PurchaseProductEntity;
