import { BookService } from './book.service';
import { BookDTO } from './book.service.types';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
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
    findOne(id: string): Promise<import("@nestjs/common").HttpException>;
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
