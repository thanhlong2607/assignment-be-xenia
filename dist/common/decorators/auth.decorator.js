"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../constants");
const Auth = (specs, permission = false) => (0, common_1.SetMetadata)(constants_1.SPEC_KEY, { specs, permission });
exports.Auth = Auth;
//# sourceMappingURL=auth.decorator.js.map