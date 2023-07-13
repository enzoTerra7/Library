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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const lib_1 = require("../../prisma/lib");
const bcrypt = require("bcrypt");
const utils_1 = require("../../lib/utils");
let UserService = exports.UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        try {
            const emailExists = await this.prisma.user.findFirst({
                where: {
                    email: data.email
                }
            });
            if (!!emailExists) {
                throw new common_1.HttpException({ status: 'error', message: 'Email já existente' }, common_1.HttpStatus.NOT_ACCEPTABLE);
            }
            if (!(0, utils_1.passwordCheck)(data.password)) {
                throw new common_1.HttpException({ status: 'error', message: 'Senha em um formato inválido!' }, common_1.HttpStatus.BAD_REQUEST);
            }
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const user = await this.prisma.user.create({
                data: {
                    ...data,
                    password: hashedPassword
                }
            });
            return new common_1.HttpException({ status: 'success', message: 'Usuário criado com sucesso', data: user }, common_1.HttpStatus.CREATED);
        }
        catch (e) {
            console.log(e);
            throw new common_1.HttpException({ status: 'error', message: 'Falha ao criar usuário', data: e }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, data) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    id: id
                }
            });
            if (!user) {
                throw new common_1.HttpException({ status: 'error', message: 'Usuário não encontrado' }, common_1.HttpStatus.NOT_FOUND);
            }
            if (data.email) {
                const user = await this.prisma.user.findFirst({
                    where: {
                        email: data.email
                    }
                });
                if (!user && user.id != id) {
                    throw new common_1.HttpException({ status: 'error', message: 'Email já utilizado em outro usuário' }, common_1.HttpStatus.NOT_ACCEPTABLE);
                }
            }
            const updatedUser = await this.prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    email: data?.email || user.email,
                    name: data?.name || user.name
                }
            });
            return new common_1.HttpException({ status: 'success', message: 'Usuário criado com sucesso', data: updatedUser }, common_1.HttpStatus.OK);
        }
        catch (e) {
            throw new common_1.HttpException({ status: 'error', message: 'Falha ao criar usuário', data: e }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id) {
        try {
            const emailExists = await this.prisma.user.findUnique({
                where: {
                    id: id
                }
            });
            if (!emailExists) {
                throw new common_1.HttpException({ status: 'error', message: 'Usuário não encontrado' }, common_1.HttpStatus.BAD_REQUEST);
            }
            await this.prisma.user.delete({
                where: {
                    id: id
                }
            });
            return new common_1.HttpException({ status: 'success', message: 'Usuário deletado com sucesso' }, common_1.HttpStatus.OK);
        }
        catch (e) {
            throw new common_1.HttpException({ status: 'error', message: 'Falha ao deletar usuário', data: e }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAll() {
        try {
            const users = await this.prisma.user.findMany();
            return new common_1.HttpException({ status: 'success', message: 'Usuários encontrados com sucesso', data: users }, common_1.HttpStatus.OK);
        }
        catch (e) {
            throw new common_1.HttpException({ status: 'error', message: 'Falha ao buscar os usuários', data: e }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getById(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: id
                }
            });
            if (!user) {
                throw new common_1.HttpException({ status: 'error', message: 'Usuário não encontrado' }, common_1.HttpStatus.BAD_REQUEST);
            }
            return new common_1.HttpException({ status: 'success', message: 'Usuário encontrado com sucesso', data: user }, common_1.HttpStatus.OK);
        }
        catch (e) {
            throw new common_1.HttpException({ status: 'error', message: 'Falha ao buscar usuário', data: e }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addBook(id, data) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    id: id
                }
            });
            if (!user) {
                throw new common_1.HttpException({ status: 'error', message: 'Usuário não encontrado' }, common_1.HttpStatus.NOT_FOUND);
            }
            if (data.email) {
                const user = await this.prisma.user.findFirst({
                    where: {
                        email: data.email
                    }
                });
                if (!user && user.id != id) {
                    throw new common_1.HttpException({ status: 'error', message: 'Email já utilizado em outro usuário' }, common_1.HttpStatus.NOT_ACCEPTABLE);
                }
            }
            const updatedUser = await this.prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    email: data?.email || user.email,
                    name: data?.name || user.name
                }
            });
            return new common_1.HttpException({ status: 'success', message: 'Usuário criado com sucesso', data: updatedUser }, common_1.HttpStatus.OK);
        }
        catch (e) {
            throw new common_1.HttpException({ status: 'error', message: 'Falha ao criar usuário', data: e }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lib_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map