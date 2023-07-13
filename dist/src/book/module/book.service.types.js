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
exports.BookDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class BookDTO {
}
exports.BookDTO = BookDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Título do livro',
        default: 'O Rei do Inverno'
    }),
    __metadata("design:type", String)
], BookDTO.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do usuário ao qual o livro pertence',
        default: '64aff4cbae202d7f3676fbc4'
    }),
    __metadata("design:type", String)
], BookDTO.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID da coleção da qual o livro pertence',
        default: '64b036b5ba982bd9c69e25a3'
    }),
    __metadata("design:type", String)
], BookDTO.prototype, "collectionId", void 0);
//# sourceMappingURL=book.service.types.js.map