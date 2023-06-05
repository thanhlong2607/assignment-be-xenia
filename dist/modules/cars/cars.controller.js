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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsController = void 0;
const common_1 = require("@nestjs/common");
const cars_service_1 = require("./cars.service");
const car_dto_1 = require("./dto/car.dto");
const helpers_1 = require("../../helpers");
const constants_1 = require("../../constants");
let CarsController = class CarsController {
    constructor(carsService) {
        this.carsService = carsService;
    }
    async getUsers(query) {
        return this.carsService.getCars(query);
    }
    async createUser(payload) {
        return this.carsService.createCar(payload);
    }
    async getCar(param) {
        const id = +param.id;
        const car = await this.carsService.findOne({
            where: { id, deletedAt: null },
        });
        if (!car) {
            helpers_1.ErrorHelper.BadRequestException(constants_1.CAR.CAR_NOT_FOUND);
        }
        return car;
    }
    async updateUser(param, payload) {
        const id = +param.id;
        return this.carsService.updateCar(id, payload);
    }
    async deleteUser(param) {
        const id = +param.id;
        return await this.carsService.deleteCar(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [car_dto_1.GetListCarDto]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [car_dto_1.CreateCarDto]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [car_dto_1.IdParamsDto]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "getCar", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [car_dto_1.IdParamsDto,
        car_dto_1.UpdateCarDto]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [car_dto_1.IdParamsDto]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "deleteUser", null);
CarsController = __decorate([
    (0, common_1.Controller)('cars'),
    __metadata("design:paramtypes", [cars_service_1.CarsService])
], CarsController);
exports.CarsController = CarsController;
//# sourceMappingURL=cars.controller.js.map