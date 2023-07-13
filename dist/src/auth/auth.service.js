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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const lib_1 = require("../../prisma/lib");
const bcrypt = require("bcrypt");
const utils_1 = require("../../lib/utils");
let AuthService = exports.AuthService = class AuthService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async postLogin(data) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: data.email
                }
            });
            if (!user) {
                return new common_1.HttpException({ status: 'error', message: 'Usuário não encontrado' }, common_1.HttpStatus.NOT_FOUND);
            }
            if (!bcrypt.compare(data.password, user.password)) {
                return new common_1.HttpException({ status: 'error', message: 'Credenciais inválidas.' }, common_1.HttpStatus.BAD_REQUEST);
            }
            const accessToken = (0, utils_1.createAccessToken)(data);
            return new common_1.HttpException({ status: 'success', message: 'Login realizado com sucesso.', data: {
                    user: user,
                    token: accessToken
                } }, common_1.HttpStatus.OK);
        }
        catch (e) {
            throw new common_1.HttpException({ status: 'error', message: 'Falha ao realizar login', data: e }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lib_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map