import { Controller, Body, Post, Get, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO } from './book.service.types';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Books')
@ApiBearerAuth()
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiResponse({
    status: 200,
    description: 'Livro adicionado com sucesso'
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autorizado'
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado'
  })
  @ApiOperation({
    summary: 'Cria um livro'
  })
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() data: BookDTO) {
    return this.bookService.create(data)
  }

  @ApiResponse({
    status: 200,
    description: 'Livros encontrados com sucesso'
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autorizado'
  })
  @ApiOperation({
    summary: 'Busca todos os livros'
  })
  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.bookService.findAll()
  }

  @ApiResponse({
    status: 200,
    description: 'Livro encontrado com sucesso'
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autorizado'
  })
  @ApiResponse({
    status: 404,
    description: 'Livro não encontrado'
  })
  @ApiResponse({
    status: 500,
    description: 'Erro inesperado - Algo interno ou campos incompletos'
  })
  @ApiOperation({
    summary: 'Busca um livro'
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Livro editado com sucesso'
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autorizado'
  })
  @ApiOperation({
    summary: 'Edita um livro'
  })
  @UseGuards(AuthGuard)
  @Put(":id")
  async updateBook(@Param("id") id: string, @Body() data: BookDTO) {
    return this.bookService.updateBook(id, data)
  }

  @ApiResponse({
    status: 200,
    description: 'Livro removido com sucesso'
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autorizado'
  })
  @ApiOperation({
    summary: 'Remove um livro'
  })
  @UseGuards(AuthGuard)
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.bookService.delete(id)
  }
}
