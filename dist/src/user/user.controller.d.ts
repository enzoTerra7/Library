import { UserService } from './user.service';
import { UpdateUserDTO, UserDTO } from './user.service.types';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(data: UserDTO): Promise<import("@nestjs/common").HttpException>;
    update(id: string, data: UpdateUserDTO): Promise<import("@nestjs/common").HttpException>;
    delete(id: string): Promise<import("@nestjs/common").HttpException>;
    getById(id: string): Promise<import("@nestjs/common").HttpException>;
    getAll(): Promise<import("@nestjs/common").HttpException>;
}
