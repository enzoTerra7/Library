import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { BookDTO } from './book.service.types';
import { PrismaService } from 'prisma/lib';

@Injectable()
export class BookService {

  constructor(private prisma: PrismaService) { }

  async create(data: BookDTO) {
    try {
      const book = await this.prisma.book.create({
        data: data
      })
      return { status: 'success', message: 'Livro criado com sucesso', data: book };
    } catch (e) {
      throw new HttpException(
        { status: 'error', message: 'Falha ao criar livro', data: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    const books = await this.prisma.book.findMany();
    return { status: 'success', message: 'Livros encontrados com sucesso', data: books };
  }

  async updateBook(id: string, data: BookDTO) {
    try {
      const bookExists = await this.prisma.book.findUnique({
        where: {
          id: id
        }
      })
  
      if (!bookExists) {
        throw new NotFoundException('Livro não encontrado')
      }
  
      const updatedBook = await this.prisma.book.update({
        where: {
          id: id
        },
        data
      })
      return { status: 'success', message: 'Livro atualizado com sucesso', data: updatedBook };
    } catch(e) {
      throw new HttpException(
        { status: 'error', message: 'Falha ao atualizar livro', data: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string) {
    try {
      const bookExists = await this.prisma.book.findUnique({
        where: {
          id: id
        }
      })
  
      if (!bookExists) {
        throw new NotFoundException('Livro não encontrado')
      }
      await this.prisma.book.delete({
        where: {
          id: id
        }
      })

      return { status: 'success', message: 'Livro deletado com sucesso' };
    } catch(e) {
      throw new HttpException(
        { status: 'error', message: 'Falha ao deletar livro', data: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
