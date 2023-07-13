"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccessToken = exports.passwordCheck = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function passwordCheck(pass) {
    const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/);
    return passwordRegex.test(pass);
}
exports.passwordCheck = passwordCheck;
const createAccessToken = (user) => {
    return (0, jsonwebtoken_1.sign)({ ...user }, process.env.ACCESS_TOKEN_SECRET || 'tokenSecret', {
        expiresIn: '7d'
    });
};
exports.createAccessToken = createAccessToken;
//# sourceMappingURL=utils.js.map