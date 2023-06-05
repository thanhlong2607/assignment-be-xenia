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
exports.BookingsController = void 0;
const common_1 = require("@nestjs/common");
const bookings_service_1 = require("./bookings.service");
const auth_decorator_1 = require("../../common/decorators/auth.decorator");
const enums_1 = require("../../enums");
const booking_dto_1 = require("./dto/booking.dto");
const user_guard_1 = require("../../common/guards/user.guard");
let BookingsController = class BookingsController {
    constructor(bookingsService) {
        this.bookingsService = bookingsService;
    }
    async getUsers(query) {
        return this.bookingsService.getBookings(query);
    }
    async getList(payload) {
        return this.bookingsService.createBooking(payload);
    }
    async createUser(payload) {
        return this.bookingsService.createBooking(payload);
    }
    async updateUser(param, payload) {
        const id = +param.id;
        return this.bookingsService.updateStatusBooking(id, payload);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)([enums_1.EUserType.EMPLOYEE]),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_dto_1.GetListBookingDto]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(201),
    (0, auth_decorator_1.Auth)([enums_1.EUserType.EMPLOYEE]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_dto_1.CreateBookingDto]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "getList", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    (0, auth_decorator_1.Auth)([enums_1.EUserType.EMPLOYEE]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_dto_1.CreateBookingDto]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "createUser", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)([enums_1.EUserType.EMPLOYEE]),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_dto_1.IdParamsDto, booking_dto_1.UpdateStatusBooking]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "updateUser", null);
BookingsController = __decorate([
    (0, common_1.Controller)('bookings'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    __metadata("design:paramtypes", [bookings_service_1.BookingsService])
], BookingsController);
exports.BookingsController = BookingsController;
//# sourceMappingURL=bookings.controller.js.map