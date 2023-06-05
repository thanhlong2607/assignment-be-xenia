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
exports.Booking = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const cars_model_1 = require("./cars.model");
const users_model_1 = require("./users.model");
let Booking = class Booking extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Booking.prototype, "requestStartAt", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Booking.prototype, "requestEndAt", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Booking.prototype, "pricePerDay", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Booking.prototype, "totalPrice", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Booking.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Booking.prototype, "referenceNo", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => cars_model_1.Car),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Booking.prototype, "carId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Booking.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => cars_model_1.Car),
    __metadata("design:type", cars_model_1.Car)
], Booking.prototype, "car", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.User),
    __metadata("design:type", users_model_1.User)
], Booking.prototype, "user", void 0);
Booking = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'bookings',
        underscored: true,
    })
], Booking);
exports.Booking = Booking;
//# sourceMappingURL=bookings.model.js.map