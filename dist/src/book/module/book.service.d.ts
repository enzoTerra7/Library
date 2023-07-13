import { HttpException } from '@nestjs/common';
import { BookDTO } from './book.service.types';
import { PrismaService } from 'prisma/lib';
export declare class BookService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: BookDTO): Promise<{
        status: string;
        message: string;
        data: import("@prisma/client/runtime").GetResult<{
            id: string;
            title: string;
            description: string;
            category: string;
            userId: string;
            collectionId: string;
        }, unknown> & {};
    }>;
    findAll(): Promise<{
        status: string;
        message: string;
        data: (import("@prisma/client/runtime").GetResult<{
            id: string;
            title: string;
            description: string;
            category: string;
            userId: string;
            collectionId: string;
        }, unknown> & {})[];
    }>;
    findOne(id: string): Promise<HttpException>;
    updateBook(id: string, data: BookDTO): Promise<{
        status: string;
        message: string;
        data: import("@prisma/client/runtime").GetResult<{
            id: string;
            title: string;
            description: string;
            category: string;
            userId: string;
            collectionId: string;
        }, unknown> & {};
    }>;
    delete(id: string): Promise<{
        status: string;
        message: string;
    }>;
}
