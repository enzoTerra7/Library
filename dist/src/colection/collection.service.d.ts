import { HttpException } from '@nestjs/common';
import { CollectionDto } from './dto/collection.dto';
import { PrismaService } from 'prisma/lib';
export declare class CollectionService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCollectionDto: CollectionDto): Promise<HttpException>;
    findAll(): Promise<HttpException>;
    findOne(id: string): Promise<HttpException>;
    update(id: string, updateColectionDto: CollectionDto): Promise<HttpException>;
    remove(id: string): Promise<HttpException>;
    addBook(id: string, bookId: string): Promise<HttpException>;
    removeBook(id: string, bookId: string): Promise<HttpException>;
}
