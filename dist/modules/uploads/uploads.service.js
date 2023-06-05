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
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../constants");
const amazon_s3_option_1 = require("./options/amazon-s3.option");
let UploadService = class UploadService {
    constructor() {
        this.S3 = amazon_s3_option_1.amazonS3Options.S3;
        this.BUCKET = amazon_s3_option_1.amazonS3Options.bucket;
    }
    multerUpload(file) {
        return {
            title: file.originalname,
            url: constants_1.BASE_URL + file.path,
        };
    }
    async amazonUpload(file) {
        const blobName = `${new Date().getTime()}-${file.originalname}`;
        const params = {
            ContentType: 'image/jpeg',
            Bucket: this.BUCKET,
            Key: blobName,
            Body: file.buffer,
            ACL: 'public-read',
            ContentDisposition: `filename=${blobName}`,
        };
        const uploadedBlob = await this.S3.upload(params).promise();
        return {
            title: file.originalname,
            url: (uploadedBlob === null || uploadedBlob === void 0 ? void 0 : uploadedBlob.Location) || '',
        };
    }
};
UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=uploads.service.js.map