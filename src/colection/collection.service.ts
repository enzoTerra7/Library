import { HttpException, HttpStatus, Injectable, Response } from '@nestjs/common';
import { CollectionDto } from './dto/collection.dto';
import { PrismaService } from 'prisma/lib';

@Injectable()
export class CollectionService {
  
  constructor(private prisma: PrismaService) { }

  async create(createCollectionDto: CollectionDto) {
    try {

      const collection = await this.prisma.collection.create({
        data: createCollectionDto
      })

      return new HttpException(
        { status: 'success', message: 'Coleção criada com sucesso.', data: collection },
        HttpStatus.CREATED,
      );
    } catch (e) {
      throw new HttpException(
        { status: 'error', message: 'Falha ao criar coleção', data: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const collections = await this.prisma.collection.findMany()

      return new HttpException(
        { status: 'success', message: 'Coleções encontradas com sucesso.', data: collections },
        HttpStatus.OK,
      );
    } catch (e) {
      throw new HttpException(
        { status: 'error', message: 'Falha ao encontrar coleções', data: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const collection = await this.prisma.collection.findUnique({
        where: {
          id: id
        }
      })

      if(!collection) {
        throw new HttpException(
          { status: 'error', message: 'Coleção não encontrada', data: null },
          HttpStatus.NOT_FOUND,
        );
      }

      return new HttpException(
        { status: 'success', message: 'Coleção encontrada com sucesso.', data: collection },
        HttpStatus.OK,
      );
    } catch (e) {
      throw new HttpException(
        { status: 'error', message: 'Falha ao buscar a coleção', data: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateColectionDto: CollectionDto) {
    try {
      const collection = await this.prisma.collection.findUnique({
        where: {
          id: id
        }
      })

      if(!collection) {
        throw new HttpException(
          { status: 'error', message: 'Coleção não encontrada', data: null },
          HttpStatus.NOT_FOUND,
        );
      }

      const updatedCollection = await this.prisma.collection.update({
        where: {
          id: id
        },
        data: {
          ...updateColectionDto
        }
      })

      return new HttpException(
        { status: 'success', message: 'Coleção atualizada com sucesso.', data: collection },
        HttpStatus.OK,
      );
    } catch (e) {
      throw new HttpException(
        { status: 'error', message: 'Falha ao atualizar a coleção', data: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const collection = await this.prisma.collection.findUnique({
        where: {
          id: id
        }
      })

      if(!collection) {
        throw new HttpException(
          { status: 'error', message: 'Coleção não encontrada', data: null },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prisma.collection.delete({
        where: {
          id: id
        }
      })

      return new HttpException(
        { status: 'success', message: 'Coleção deletada com sucesso.', data: collection },
        HttpStatus.OK,
      );
    } catch (e) {
      throw new HttpException(
        { status: 'error', message: 'Falha ao deletar a coleção', data: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addBook(id: string, bookId: string) {
    try {
      const collection = await this.prisma.collection.findUnique({
        where: {
          id: id
        }
      })

      if(!collection) {
        throw new HttpException(
          { status: 'error', message: 'Coleção não encontrada', data: null },
          HttpStatus.NOT_FOUND,
        );
      }

      const book = await this.prisma.book.findUnique({
        where: {
          id: bookId
        }
      })

      if(!book) {
        throw new HttpException(
          { status: 'error', message: 'Livro não encontrado', data: null },
          HttpStatus.NOT_FOUND,
        );
      }

      if(book.collectionId) {

        if(book.collectionId == id) {
          throw new HttpException(
            { status: 'error', message: 'Livro já está vinculado a essa coleção', data: null },
            HttpStatus.BAD_REQUEST,
          );
        }

        throw new HttpException(
          { status: 'error', message: 'Livro já está vinculado em uma coleção', data: null },
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.prisma.book.update({
        where: {
          id: bookId
        }, 
        data: {
          collectionId: id
        }
      })

      return new HttpException(
        { status: 'success', message: 'Livro adicionado na coleção com sucesso.' },
        HttpStatus.OK,
      );
    } catch (e) {
      throw new HttpException(
        { status: 'error', message: 'Falha ao atualizar a coleção', data: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeBook(id: string, bookId: string) {
    try {
      const collection = await this.prisma.collection.findUnique({
        where: {
          id: id
        }
      })

      if(!collection) {
        throw new HttpException(
          { status: 'error', message: 'Coleção não encontrada', data: null },
          HttpStatus.NOT_FOUND,
        );
      }

      const book = await this.prisma.book.findUnique({
        where: {
          id: bookId
        }
      })

      if(!book) {
        throw new HttpException(
          { status: 'error', message: 'Livro não encontrado', data: null },
          HttpStatus.NOT_FOUND,
        );
      }

      if(book.collectionId) {

        if(book.collectionId == id) {
          await this.prisma.book.update({
            where: {
              id: bookId
            }, 
            data: {
              collectionId: undefined
            }
          })
    
          return new HttpException(
            { status: 'success', message: 'Livro removido da coleção com sucesso.' },
            HttpStatus.OK,
          );
        }

        throw new HttpException(
          { status: 'error', message: 'Livro está vinculado a outra coleção', data: null },
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        { status: 'error', message: 'Livro não está vinculado a nenhuma coleção', data: null },
        HttpStatus.BAD_REQUEST,
      );
    } catch (e) {
      throw new HttpException(
        { status: 'error', message: 'Falha ao atualizar a coleção', data: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
