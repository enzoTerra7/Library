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
exports.UpdateUserDTO = exports.UserDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserDTO {
}
exports.UserDTO = UserDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome do usuário',
        default: 'Usuário Teste'
    }),
    __metadata("design:type", String)
], UserDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email do usuário - deve ser único por sistema',
        default: 'user@teste.com'
    }),
    __metadata("design:type", String)
], UserDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Senha do usuário - deve ter pelo menos 8 caracteres sendo pelo menos: 1 letra maiúscula, 1 letra minúscula, 1 número e 1 simbolo (*$%!@)',
        default: 'Teste@2023'
    }),
    __metadata("design:type", String)
], UserDTO.prototype, "password", void 0);
class UpdateUserDTO extends (0, swagger_1.PartialType)(UserDTO) {
}
exports.UpdateUserDTO = UpdateUserDTO;
//# sourceMappingURL=user.service.types.js.map