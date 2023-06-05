"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.amazonS3Options = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const constants_1 = require("../../../constants");
exports.amazonS3Options = {
    S3: new aws_sdk_1.default.S3({
        accessKeyId: constants_1.AWS_ACCESS_KEY_ID,
        secretAccessKey: constants_1.AWS_SECRET_ACCESS_KEY,
        region: constants_1.S3_REGION,
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
    }),
    bucket: constants_1.AWS_BUCKET,
};
//# sourceMappingURL=amazon-s3.option.js.map