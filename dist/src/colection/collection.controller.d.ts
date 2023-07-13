import { CollectionService } from './collection.service';
import { CollectionDto } from './dto/collection.dto';
export declare class CollectionController {
    private readonly collectionService;
    constructor(collectionService: CollectionService);
    create(createColectionDto: CollectionDto): Promise<import("@nestjs/common").HttpException>;
    findAll(): Promise<import("@nestjs/common").HttpException>;
    findOne(id: string): Promise<import("@nestjs/common").HttpException>;
    update(id: string, updateColectionDto: CollectionDto): Promise<import("@nestjs/common").HttpException>;
    remove(id: string): Promise<import("@nestjs/common").HttpException>;
    addBook(id: string, bookId: string): Promise<import("@nestjs/common").HttpException>;
    removeBook(id: string, bookId: string): Promise<import("@nestjs/common").HttpException>;
}
