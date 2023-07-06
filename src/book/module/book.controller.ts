import { Controller, Body, Post, Get, Put, Delete, Param } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO } from './book.service.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Books')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiResponse({
    status: 200,
    description: 'Livro adicionado com sucesso'
  })
  @ApiOperation({
    summary: 'Cria um livro'
  })
  @Post()
  async create(@Body() data: BookDTO) {
    return this.bookService.create(data)
  }

  @ApiResponse({
    status: 200,
    description: 'Livros encontrados com sucesso'
  })
  @ApiOperation({
    summary: 'Busca todos os livros'
  })
  @Get()
  async findAll() {
    return this.bookService.findAll()
  }

  @ApiResponse({
    status: 200,
    description: 'Livro editado com sucesso'
  })
  @ApiOperation({
    summary: 'Edita um livro'
  })
  @Put(":id")
  async updateBook(@Param("id") id: string, @Body() data: BookDTO) {
    return this.bookService.updateBook(id, data)
  }

  @ApiResponse({
    status: 200,
    description: 'Livro removido com sucesso'
  })
  @ApiOperation({
    summary: 'Remove um livro'
  })
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.bookService.delete(id)
  }
}
