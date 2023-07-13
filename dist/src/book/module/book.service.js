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
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const lib_1 = require("../../../prisma/lib");
const axios_1 = require("axios");
let BookService = exports.BookService = class BookService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: data.userId
                }
            });
            if (!user) {
                throw new common_1.HttpException({
                    status: 'error', message: 'Id de usuário não encontrado'
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const encodedTitle = encodeURIComponent(data.title);
            const { data: googleData } = await axios_1.default.get(`https://www.googleapis.com/books/v1/volumes?q=${encodedTitle}&maxResults=1`);
            console.log(googleData);
            const book = await this.prisma.book.create({
                data: {
                    category: googleData.items[0].volumeInfo.categories[0] || '',
                    title: data.title,
                    description: googleData.items[0].volumeInfo.description || '',
                    userId: data.userId
                }
            });
            return { status: 'success', message: 'Livro criado com sucesso', data: book };
        }
        catch (e) {
            throw new common_1.HttpException({ status: 'error', message: 'Falha ao criar livro', data: e }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        const books = await this.prisma.book.findMany();
        return { status: 'success', message: 'Livros encontrados com sucesso', data: books };
    }
    async findOne(id) {
        try {
            const book = await this.prisma.book.findUnique({
                where: {
                    id: id
                }
            });
            if (!book) {
                throw new common_1.HttpException({ status: 'error', message: 'Livro não encontrado', data: null }, common_1.HttpStatus.NOT_FOUND);
            }
            return new common_1.HttpException({ status: 'success', message: 'Livro encontrado com sucesso.', data: book }, common_1.HttpStatus.OK);
        }
        catch (e) {
            throw new common_1.HttpException({ status: 'error', message: 'Falha ao buscar livro', data: e }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateBook(id, data) {
        try {
            const bookExists = await this.prisma.book.findUnique({
                where: {
                    id: id
                }
            });
            if (!bookExists) {
                throw new common_1.NotFoundException('Livro não encontrado');
            }
            const encodedTitle = encodeURIComponent(data.title);
            const { data: googleData } = await axios_1.default.get(`https://www.googleapis.com/books/v1/volumes?q=${encodedTitle}&maxResults=1`);
            console.log(googleData);
            const updatedBook = await this.prisma.book.update({
                where: {
                    id: id
                },
                data: {
                    category: googleData.items[0].volumeInfo.categories[0] || '',
                    title: data.title,
                    description: googleData.items[0].volumeInfo.description || ''
                }
            });
            return { status: 'success', message: 'Livro atualizado com sucesso', data: updatedBook };
        }
        catch (e) {
            throw new common_1.HttpException({ status: 'error', message: 'Falha ao atualizar livro', data: e }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id) {
        try {
            const bookExists = await this.prisma.book.findUnique({
                where: {
                    id: id
                }
            });
            if (!bookExists) {
                throw new common_1.NotFoundException('Livro não encontrado');
            }
            await this.prisma.book.delete({
                where: {
                    id: id
                }
            });
            return { status: 'success', message: 'Livro deletado com sucesso' };
        }
        catch (e) {
            throw new common_1.HttpException({ status: 'error', message: 'Falha ao deletar livro', data: e }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.BookService = BookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lib_1.PrismaService])
], BookService);
//# sourceMappingURL=book.service.js.map