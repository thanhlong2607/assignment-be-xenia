"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsMatchPattern = void 0;
const class_validator_1 = require("class-validator");
function IsMatchPattern(pattern, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isValidPattern',
            target: object.constructor,
            propertyName: propertyName,
            options: Object.assign({ message: `${propertyName} is invalid` }, validationOptions),
            validator: {
                validate(value) {
                    return typeof value === 'string' && new RegExp(pattern).test(value);
                },
            },
        });
    };
}
exports.IsMatchPattern = IsMatchPattern;
//# sourceMappingURL=IsMatchPattern.validation.js.map