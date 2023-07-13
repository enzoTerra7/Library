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
exports.CollectionController = void 0;
const common_1 = require("@nestjs/common");
const collection_service_1 = require("./collection.service");
const collection_dto_1 = require("./dto/collection.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
let CollectionController = exports.CollectionController = class CollectionController {
    constructor(collectionService) {
        this.collectionService = collectionService;
    }
    create(createColectionDto) {
        return this.collectionService.create(createColectionDto);
    }
    findAll() {
        return this.collectionService.findAll();
    }
    findOne(id) {
        return this.collectionService.findOne(id);
    }
    update(id, updateColectionDto) {
        return this.collectionService.update(id, updateColectionDto);
    }
    remove(id) {
        return this.collectionService.remove(id);
    }
    addBook(id, bookId) {
        return this.collectionService.addBook(id, bookId);
    }
    removeBook(id, bookId) {
        return this.collectionService.removeBook(id, bookId);
    }
};
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Coleção criada com sucesso'
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
        summary: 'Cria uma coleção'
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [collection_dto_1.CollectionDto]),
    __metadata("design:returntype", void 0)
], CollectionController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Coleções encontradas com sucesso'
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
        summary: 'Busca todas as coleções'
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CollectionController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Coleção encontrada com sucesso'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Usuário não autorizado'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Coleção não encontrada'
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Erro inesperado - Algo interno ou campos incompletos'
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Busca uma coleção'
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CollectionController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Coleção editada com sucesso'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Usuário não autorizado'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Coleção não encontrada'
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Erro inesperado - Algo interno ou campos incompletos'
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Edita uma coleção'
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, collection_dto_1.CollectionDto]),
    __metadata("design:returntype", void 0)
], CollectionController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Coleção deletada com sucesso'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Usuário não autorizado'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Coleção não encontrada'
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Erro inesperado - Algo interno ou campos incompletos'
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Apaga uma coleção'
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CollectionController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Livro adicionado com sucesso na coleção'
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Livro já adicionado a esta coleção ou a uma outra'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Usuário não autorizado'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Coleção ou livro não encontrados'
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Erro inesperado - Algo interno ou campos incompletos'
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Adiciona um livro a uma coleção'
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(':id/:bookId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('bookId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CollectionController.prototype, "addBook", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Livro removido com sucesso da coleção'
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Livro já adicionado a uma outra ou sem nenhuma coleção vinculada'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Usuário não autorizado'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Coleção ou livro não encontrados'
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Erro inesperado - Algo interno ou campos incompletos'
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Remove um livro de uma coleção'
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id/:bookId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('bookId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CollectionController.prototype, "removeBook", null);
exports.CollectionController = CollectionController = __decorate([
    (0, swagger_1.ApiTags)('Collection'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('collection'),
    __metadata("design:paramtypes", [collection_service_1.CollectionService])
], CollectionController);
//# sourceMappingURL=collection.controller.js.map