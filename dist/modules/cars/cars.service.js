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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsService = void 0;
const common_1 = require("@nestjs/common");
const cars_repository_1 = require("./cars.repository");
const users_services_1 = require("../users/users.services");
const sequelize_1 = require("sequelize");
const helpers_1 = require("../../helpers");
const constants_1 = require("../../constants");
const moment_1 = __importDefault(require("moment"));
const car_vailabilities_repository_1 = require("./car-vailabilities.repository");
const users_model_1 = require("../../database/entities/users.model");
let CarsService = class CarsService {
    constructor(carsRepository, carAvailabilitiesRepository, usersService) {
        this.carsRepository = carsRepository;
        this.carAvailabilitiesRepository = carAvailabilitiesRepository;
        this.usersService = usersService;
    }
    async findOne(data) {
        return this.carsRepository.findOne(data);
    }
    async findById(id) {
        return this.carsRepository.findById(id);
    }
    async getCars(query) {
        const { page, limit, carNumber } = query;
        let filters = {};
        if (carNumber === null || carNumber === void 0 ? void 0 : carNumber.trim()) {
            filters = {
                carNumber: {
                    [sequelize_1.Op.substring]: carNumber,
                },
            };
        }
        const opt = {
            include: [
                {
                    model: users_model_1.User,
                    attributes: {
                        exclude: ['password'],
                    },
                },
            ],
        };
        return this.carsRepository.paginate(filters, page, limit, opt);
    }
    async createCar(data) {
        await this.checkPayloadCar(data);
        let payload = Object.assign(Object.assign({}, data), { status: 'active' });
        return this.carsRepository.create(payload);
    }
    async updateCar(id, data) {
        await this.checkPayloadCar(data, id);
        const updateByIdConditions = { id };
        const affectedRows = await this.carsRepository.update(data, updateByIdConditions);
        return affectedRows[0];
    }
    async deleteCar(id) {
        const removeByIdConditions = { id };
        const user = await this.carsRepository.findOne({
            where: { id, deletedAt: null },
        });
        if (!user) {
            helpers_1.ErrorHelper.BadRequestException(constants_1.CAR.CAR_NOT_FOUND);
        }
        const affectedRows = await this.carsRepository.update({ deletedAt: (0, moment_1.default)().format().toString() }, removeByIdConditions);
        return affectedRows[0];
    }
    async checkTimeConflict(carId, requestStartAt, requestEndAt) {
        const reservation = await this.carAvailabilitiesRepository.findOne({
            where: {
                carId,
                startAt: { $lt: requestEndAt },
                endAt: { $gt: requestStartAt },
            },
        });
        const hasConflict = !!reservation;
        return hasConflict;
    }
    async addAvailability(carId, requestStartAt, requestEndAt) {
        await this.carAvailabilitiesRepository.create({
            carId,
            startAt: requestStartAt,
            endAt: requestEndAt,
        });
    }
    async checkPayloadCar(data, id) {
        const { carNumber } = data;
        let condition = {
            carNumber,
            deletedAt: null,
        };
        if (id) {
            const user = await this.findById(id);
            if (!user) {
                helpers_1.ErrorHelper.BadRequestException(constants_1.CAR.CAR_NOT_FOUND);
            }
            condition = Object.assign(Object.assign({}, condition), { id: {
                    [sequelize_1.Op.ne]: id,
                } });
        }
        const checkExistUser = await this.carsRepository.findOne({
            where: condition,
        });
        if (checkExistUser) {
            helpers_1.ErrorHelper.BadRequestException(constants_1.CAR.CAR_IS_EXITS);
        }
    }
};
CarsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cars_repository_1.CarsRepository,
        car_vailabilities_repository_1.CarAvailabilitiesRepository,
        users_services_1.UsersService])
], CarsService);
exports.CarsService = CarsService;
//# sourceMappingURL=cars.service.js.map