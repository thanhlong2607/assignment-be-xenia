"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const bookings_repository_1 = require("./bookings.repository");
const users_services_1 = require("../users/users.services");
const cars_service_1 = require("../cars/cars.service");
const moment_1 = __importDefault(require("moment"));
const helpers_1 = require("../../helpers");
const constants_1 = require("../../constants");
const booking_message_1 = require("../../constants/messages/booking.message");
const _ = __importStar(require("lodash"));
const sequelize_1 = require("sequelize");
const cars_model_1 = require("../../database/entities/cars.model");
const users_model_1 = require("../../database/entities/users.model");
let BookingsService = class BookingsService {
    constructor(bookingsRepository, usersService, carsService) {
        this.bookingsRepository = bookingsRepository;
        this.usersService = usersService;
        this.carsService = carsService;
    }
    async findOne(data) {
        return this.bookingsRepository.findOne(data);
    }
    async findById(id) {
        return this.bookingsRepository.findById(id);
    }
    async getBookings(query) {
        const { page, limit, userId, carId, status, referenceNo } = query;
        let filters = {
            userId,
            carId,
            status,
        };
        if (referenceNo === null || referenceNo === void 0 ? void 0 : referenceNo.trim()) {
            filters = Object.assign(Object.assign({}, filters), { referenceNo: {
                    [sequelize_1.Op.substring]: referenceNo,
                } });
        }
        const getAllCondition = _.pickBy(filters, _.identity);
        const opt = {
            include: [
                {
                    model: cars_model_1.Car,
                },
                {
                    model: users_model_1.User,
                    attributes: {
                        exclude: ['password'],
                    },
                },
            ],
        };
        return this.bookingsRepository.paginate(getAllCondition, page, limit, opt);
    }
    async createBooking(data) {
        const { requestStartAt, requestEndAt, carId, userId } = data;
        const car = await this.carsService.findOne({
            where: { id: carId },
        });
        const user = await this.usersService.findOne({
            where: { id: userId },
        });
        if (!user) {
            helpers_1.ErrorHelper.BadRequestException(constants_1.USER.USER_NOT_FOUND);
        }
        if (!car) {
            helpers_1.ErrorHelper.BadRequestException(constants_1.CAR.CAR_NOT_FOUND);
        }
        const requestStartAtFormat = (0, moment_1.default)(requestStartAt);
        const requestEndAtFormat = (0, moment_1.default)(requestEndAt);
        if (requestStartAtFormat.isAfter(requestEndAtFormat)) {
            helpers_1.ErrorHelper.BadRequestException(booking_message_1.BOOKING.START_BEFORE_END);
        }
        const checkTimeConflict = await this.carsService.checkTimeConflict(carId, requestStartAtFormat.toDate(), requestEndAtFormat.toDate());
        if (checkTimeConflict) {
            helpers_1.ErrorHelper.BadRequestException(booking_message_1.BOOKING.CAR_IS_BOOKED);
        }
        const carPrice = car.price;
        const duration = Math.ceil(requestEndAtFormat.diff(requestStartAtFormat, 'day', true));
        const totalPrice = duration * carPrice;
        const payload = {
            requestStartAt,
            requestEndAt,
            carId,
            userId,
            pricePerDay: carPrice,
            totalPrice,
            status: 'pending',
            referenceNo: helpers_1.CommonHelper.generateRandomString(6),
        };
        await this.carsService.addAvailability(carId, requestStartAtFormat.toDate(), requestEndAtFormat.toDate());
        const booking = await this.bookingsRepository.create(payload);
        return booking;
    }
    async updateStatusBooking(id, data) {
        const { status, reason } = data;
        const booking = await this.bookingsRepository.findById(id);
        if (booking) {
            helpers_1.ErrorHelper.BadRequestException(booking_message_1.BOOKING.BOOKING_NOT_FOUND);
        }
        const payload = { status };
        const updateByIdConditions = { id };
        const affectedRows = await this.bookingsRepository.update(payload, updateByIdConditions);
        return affectedRows[0];
    }
};
BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bookings_repository_1.BookingsRepository,
        users_services_1.UsersService,
        cars_service_1.CarsService])
], BookingsService);
exports.BookingsService = BookingsService;
//# sourceMappingURL=bookings.service.js.map