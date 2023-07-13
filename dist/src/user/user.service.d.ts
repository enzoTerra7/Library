import { HttpException } from '@nestjs/common';
import { PrismaService } from 'prisma/lib';
import { UpdateUserDTO, UserDTO } from './user.service.types';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: UserDTO): Promise<HttpException>;
    update(id: string, data: UpdateUserDTO): Promise<HttpException>;
    delete(id: string): Promise<HttpException>;
    getAll(): Promise<HttpException>;
    getById(id: string): Promise<HttpException>;
    addBook(id: string, data: UpdateUserDTO): Promise<HttpException>;
}
