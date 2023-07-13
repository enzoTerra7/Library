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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const user_service_types_1 = require("./user.service.types");
const auth_guard_1 = require("../auth/auth.guard");
let UserController = exports.UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(data) {
        return this.userService.create(data);
    }
    async update(id, data) {
        return this.userService.update(id, data);
    }
    async delete(id) {
        return this.userService.delete(id);
    }
    async getById(id) {
        return this.userService.getById(id);
    }
    async getAll() {
        return this.userService.getAll();
    }
};
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Usuário criado com sucesso'
    }),
    (0, swagger_1.ApiResponse)({
        status: 406,
        description: 'Email já utilizado'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Usuário não autorizado'
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Erro inesperado - Algo interno ou campos incompletos'
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Cria um usuário'
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_service_types_1.UserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuário atualizado com sucesso'
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Usuário não encontrado'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Usuário não autorizado'
    }),
    (0, swagger_1.ApiResponse)({
        status: 406,
        description: 'Email já utilizado em outra conta.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Erro inesperado - Algo interno ou campos incompletos'
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Cria um livro'
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_service_types_1.UpdateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuário deletado com sucesso'
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Usuário não encontrado'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Usuário não autorizado'
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Erro inesperado - Algo interno ou campos incompletos'
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Deleta um usuário'
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuário encontrado com sucesso'
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Usuário não encontrado'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Usuário não autorizado'
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Erro inesperado - Algo interno ou campos incompletos'
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Busca um usuário'
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuários encontrados com sucesso'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Usuário não autorizado'
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Erro inesperado - Algo interno ou campos incompletos'
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Busca todos os usuários'
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map