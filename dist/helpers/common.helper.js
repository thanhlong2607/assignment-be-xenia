"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonHelper = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const constants_1 = require("../constants");
class CommonHelper {
    static generateOTP() {
        return Math.floor(Math.random() * 9000 + 1000) + '';
    }
    static hashData(data) {
        const hash = crypto_js_1.default.AES.encrypt(data, constants_1.HASH_KEY_AES).toString();
        return hash;
    }
    static checkHashData(hash) {
        const bytes = crypto_js_1.default.AES.decrypt(hash, constants_1.HASH_KEY_AES);
        const originalText = bytes.toString(crypto_js_1.default.enc.Utf8);
        return originalText;
    }
    static random(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static generateRandomString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
exports.CommonHelper = CommonHelper;
//# sourceMappingURL=common.helper.js.map