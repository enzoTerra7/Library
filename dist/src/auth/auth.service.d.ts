import { HttpException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'prisma/lib';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    postLogin(data: AuthDto): Promise<HttpException>;
}
