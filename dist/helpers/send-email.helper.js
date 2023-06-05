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
exports.SendEmailHelper = void 0;
const path_1 = require("path");
const nodemailer_1 = __importDefault(require("nodemailer"));
const hbs = __importStar(require("express-handlebars"));
const constants_1 = require("../constants");
const mailHost = 'smtp.gmail.com';
const mailPort = 465;
class SendEmailHelper {
    static async sendMail(to, subject, content) {
        const transporter = nodemailer_1.default.createTransport({
            host: mailHost,
            port: mailPort,
            secure: true,
            auth: {
                user: constants_1.ADMIN_EMAIL,
                pass: constants_1.ADMIN_PASSWORD_EMAIL,
            },
        });
        const options = {
            from: {
                name: constants_1.ADMIN_EMAIL_NAME,
                address: constants_1.ADMIN_EMAIL,
            },
            to,
            subject,
            html: content,
        };
        const result = await transporter.sendMail(options);
        return result;
    }
    static async sendOTP({ to, subject, OTP }) {
        const hbsTemplate = hbs.create();
        const content = await hbsTemplate.render((0, path_1.join)(__dirname, '../../src/views/send-otp.hbs'), {
            otp: OTP,
        });
        return this.sendMail(to, subject, content);
    }
}
exports.SendEmailHelper = SendEmailHelper;
//# sourceMappingURL=send-email.helper.js.map