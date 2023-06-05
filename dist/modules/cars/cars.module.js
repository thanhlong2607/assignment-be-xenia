"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsModule = void 0;
const common_1 = require("@nestjs/common");
const cars_service_1 = require("./cars.service");
const cars_controller_1 = require("./cars.controller");
const cars_repository_1 = require("./cars.repository");
const sequelize_1 = require("@nestjs/sequelize");
const cars_model_1 = require("../../database/entities/cars.model");
const users_module_1 = require("../users/users.module");
const car_vailabilities_repository_1 = require("./car-vailabilities.repository");
const car_availability_model_1 = require("../../database/entities/car_availability.model");
let CarsModule = class CarsModule {
};
CarsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([cars_model_1.Car, car_availability_model_1.CarAvailability]), users_module_1.UsersModule],
        controllers: [cars_controller_1.CarsController],
        providers: [cars_service_1.CarsService, cars_repository_1.CarsRepository, car_vailabilities_repository_1.CarAvailabilitiesRepository],
        exports: [cars_service_1.CarsService, cars_repository_1.CarsRepository, car_vailabilities_repository_1.CarAvailabilitiesRepository]
    })
], CarsModule);
exports.CarsModule = CarsModule;
//# sourceMappingURL=cars.module.js.map