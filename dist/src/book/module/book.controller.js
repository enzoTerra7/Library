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
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const book_service_1 = require("./book.service");
const book_service_types_1 = require("./book.service.types");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../auth/auth.guard");
let BookController = exports.BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    async create(data) {
        return this.bookService.create(data);
    }
    async findAll() {
        return this.bookService.findAll();
    }
    findOne(id) {
        return this.bookService.findOne(id);
    }
    async updateBook(id, data) {
        return this.bookService.updateBook(id, data);
    }
    async delete(id) {
        return this.bookService.delete(id);
    }
};
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Livro adicionado com sucesso'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Usuário não autorizado'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Usuário não encontrado'
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Cria um livro'
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_service_types_1.BookDTO]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Livros encontrados com sucesso'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Usuário não autorizado'
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Busca todos os livros'
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Livro encontrado com sucesso'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Usuário não autorizado'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Livro não encontrado'
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Erro inesperado - Algo interno ou campos incompletos'
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Busca um livro'
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Livro editado com sucesso'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Usuário não autorizado'
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Edita um livro'
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, book_service_types_1.BookDTO]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "updateBook", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Livro removido com sucesso'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Usuário não autorizado'
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Remove um livro'
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "delete", null);
exports.BookController = BookController = __decorate([
    (0, swagger_1.ApiTags)('Books'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('book'),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
//# sourceMappingURL=book.controller.js.map