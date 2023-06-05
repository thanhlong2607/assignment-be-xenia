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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerOptions = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importStar(require("path"));
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
exports.multerOptions = {
    imageFilter: {
        limits: {
            files: 1,
            fileSize: 50 * 1024 * 1024,
        },
        fileFilter: (req, file, cb) => {
            if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
                cb(null, true);
            }
            else {
                cb(new common_1.HttpException(`Unsupported file type ${(0, path_1.extname)(file.originalname)}`, common_1.HttpStatus.BAD_REQUEST), false);
            }
        },
    },
    multerSaver: {
        storage: (0, multer_1.diskStorage)({
            destination: function (req, file, cb) {
                const DIR_NAME = 'uploads';
                if (!fs_1.default.existsSync(DIR_NAME)) {
                    fs_1.default.mkdirSync(DIR_NAME);
                }
                cb(null, DIR_NAME);
            },
            filename: function (req, file, cb) {
                cb(null, `${(0, uuid_1.v4)()}-${Date.now()}${path_1.default.extname(file.originalname)}`);
            },
        }),
    },
};
//# sourceMappingURL=multer.option.js.map