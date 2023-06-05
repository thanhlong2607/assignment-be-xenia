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
exports.Car = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const users_model_1 = require("./users.model");
const car_availability_model_1 = require("./car_availability.model");
let Car = class Car extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Car.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Car.prototype, "brand", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Car.prototype, "build", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Car.prototype, "year", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Car.prototype, "mode", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Car.prototype, "carNumber", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Car.prototype, "isFeature", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Car.prototype, "price", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Car.prototype, "address", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Car.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Car.prototype, "deletedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Car.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.User),
    __metadata("design:type", users_model_1.User)
], Car.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => car_availability_model_1.CarAvailability),
    __metadata("design:type", Array)
], Car.prototype, "carAvailabilities", void 0);
Car = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'cars',
        underscored: true,
    })
], Car);
exports.Car = Car;
//# sourceMappingURL=cars.model.js.map