import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { BookDTO, GoogleApiReturn } from './book.service.types';
import { PrismaService } from 'prisma/lib';
import axios from 'axios'

@Injectable()
export class BookService {

  constructor(private prisma: PrismaService) { }

  async create(data: BookDTO) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: data.userId
        }
      })

      if(!user) {
        throw new HttpException({
          status: 'error', message: 'Id de usuário não encontrado'
        },
        HttpStatus.BAD_REQUEST
        )
      }

      const encodedTitle = encodeURIComponent(data.title);

      const { data: googleData }: {
        data: GoogleApiReturn 
      }= await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodedTitle}&maxResults=1`)

      console.log(googleData)

      const book = await this.prisma.book.create({
        data: {
          category: googleData.items[0].volumeInfo.categories[0] || '',
          title: data.title,
          description: googleData.items[0].volumeInfo.description || '',
          userId: data.userId
        }
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

  async findOne(id: string) {
    try {
      const book = await this.prisma.book.findUnique({
        where: {
          id: id
        }
      })

      if(!book) {
        throw new HttpException(
          { status: 'error', message: 'Livro não encontrado', data: null },
          HttpStatus.NOT_FOUND,
        );
      }

      return new HttpException(
        { status: 'success', message: 'Livro encontrado com sucesso.', data: book },
        HttpStatus.OK,
      );
    } catch (e) {
      throw new HttpException(
        { status: 'error', message: 'Falha ao buscar livro', data: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
      
      const encodedTitle = encodeURIComponent(data.title);

      const { data: googleData }: {
        data: GoogleApiReturn 
      }= await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodedTitle}&maxResults=1`)

      console.log(googleData)
  
      const updatedBook = await this.prisma.book.update({
        where: {
          id: id
        },
        data: {
          category: googleData.items[0].volumeInfo.categories[0] || '',
          title: data.title,
          description: googleData.items[0].volumeInfo.description || ''
        }
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
