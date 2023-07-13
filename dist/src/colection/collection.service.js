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
exports.CollectionService = void 0;
const common_1 = require("@nestjs/common");
const lib_1 = require("../../prisma/lib");
let CollectionService = exports.CollectionService = class CollectionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCollectionDto) {
        try {
            const collection = await this.prisma.collection.create({
                data: createCollectionDto
            });
            return new common_1.HttpException({ status: 'success', message: 'Coleção criada com sucesso.', data: collection }, common_1.HttpStatus.CREATED);
        }
        catch (e) {
            throw new common_1.HttpException({ status: 'error', message: 'Falha ao criar coleção', data: e }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        try {
            const collections = await this.prisma.collection.findMany();
            return new common_1.HttpException({ status: 'success', message: 'Coleções encontradas com sucesso.', data: collections }, common_1.HttpStatus.OK);
        }
        catch (e) {
            throw new common_1.HttpException({ status: 'error', message: 'Falha ao encontrar coleções', data: e }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const collection = await this.prisma.collection.findUnique({
                where: {
                    id: id
                }
            });
            if (!collection) {
                throw new common_1.HttpException({ status: 'error', message: 'Coleção não encontrada', data: null }, common_1.HttpStatus.NOT_FOUND);
            }
            return new common_1.HttpException({ status: 'success', message: 'Coleção encontrada com sucesso.', data: collection }, common_1.HttpStatus.OK);
        }
        catch (e) {
            throw new common_1.HttpException({ status: 'error', message: 'Falha ao buscar a coleção', data: e }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateColectionDto) {
        try {
            const collection = await this.prisma.collection.findUnique({
                where: {
                    id: id
                }
            });
            if (!collection) {
                throw new common_1.HttpException({ status: 'error', message: 'Coleção não encontrada', data: null }, common_1.HttpStatus.NOT_FOUND);
            }
            const updatedCollection = await this.prisma.collection.update({
                where: {
                    id: id
                },
                data: {
                    ...updateColectionDto
                }
            });
            return new common_1.HttpException({ status: 'success', message: 'Coleção atualizada com sucesso.', data: collection }, common_1.HttpStatus.OK);
        }
        catch (e) {
            throw new common_1.HttpException({ status: 'error', message: 'Falha ao atualizar a coleção', data: e }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const collection = await this.prisma.collection.findUnique({
                where: {
                    id: id
                }
            });
            if (!collection) {
                throw new common_1.HttpException({ status: 'error', message: 'Coleção não encontrada', data: null }, common_1.HttpStatus.NOT_FOUND);
            }
            await this.prisma.collection.delete({
                where: {
                    id: id
                }
            });
            return new common_1.HttpException({ status: 'success', message: 'Coleção deletada com sucesso.', data: collection }, common_1.HttpStatus.OK);
        }
        catch (e) {
            throw new common_1.HttpException({ status: 'error', message: 'Falha ao deletar a coleção', data: e }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addBook(id, bookId) {
        try {
            const collection = await this.prisma.collection.findUnique({
                where: {
                    id: id
                }
            });
            if (!collection) {
                throw new common_1.HttpException({ status: 'error', message: 'Coleção não encontrada', data: null }, common_1.HttpStatus.NOT_FOUND);
            }
            const book = await this.prisma.book.findUnique({
                where: {
                    id: bookId
                }
            });
            if (!book) {
                throw new common_1.HttpException({ status: 'error', message: 'Livro não encontrado', data: null }, common_1.HttpStatus.NOT_FOUND);
            }
            if (book.collectionId) {
                if (book.collectionId == id) {
                    throw new common_1.HttpException({ status: 'error', message: 'Livro já está vinculado a essa coleção', data: null }, common_1.HttpStatus.BAD_REQUEST);
                }
                throw new common_1.HttpException({ status: 'error', message: 'Livro já está vinculado em uma coleção', data: null }, common_1.HttpStatus.BAD_REQUEST);
            }
            await this.prisma.book.update({
                where: {
                    id: bookId
                },
                data: {
                    collectionId: id
                }
            });
            return new common_1.HttpException({ status: 'success', message: 'Livro adicionado na coleção com sucesso.' }, common_1.HttpStatus.OK);
        }
        catch (e) {
            throw new common_1.HttpException({ status: 'error', message: 'Falha ao atualizar a coleção', data: e }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeBook(id, bookId) {
        try {
            const collection = await this.prisma.collection.findUnique({
                where: {
                    id: id
                }
            });
            if (!collection) {
                throw new common_1.HttpException({ status: 'error', message: 'Coleção não encontrada', data: null }, common_1.HttpStatus.NOT_FOUND);
            }
            const book = await this.prisma.book.findUnique({
                where: {
                    id: bookId
                }
            });
            if (!book) {
                throw new common_1.HttpException({ status: 'error', message: 'Livro não encontrado', data: null }, common_1.HttpStatus.NOT_FOUND);
            }
            if (book.collectionId) {
                if (book.collectionId == id) {
                    await this.prisma.book.update({
                        where: {
                            id: bookId
                        },
                        data: {
                            collectionId: undefined
                        }
                    });
                    return new common_1.HttpException({ status: 'success', message: 'Livro removido da coleção com sucesso.' }, common_1.HttpStatus.OK);
                }
                throw new common_1.HttpException({ status: 'error', message: 'Livro está vinculado a outra coleção', data: null }, common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException({ status: 'error', message: 'Livro não está vinculado a nenhuma coleção', data: null }, common_1.HttpStatus.BAD_REQUEST);
        }
        catch (e) {
            throw new common_1.HttpException({ status: 'error', message: 'Falha ao atualizar a coleção', data: e }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CollectionService = CollectionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lib_1.PrismaService])
], CollectionService);
//# sourceMappingURL=collection.service.js.map