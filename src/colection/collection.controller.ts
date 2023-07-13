import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionDto } from './dto/collection.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Collection')
@ApiBearerAuth()
@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @ApiResponse({
    status: 201,
    description: 'Coleção criada com sucesso'
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autorizado'
  })
  @ApiResponse({
    status: 500,
    description: 'Erro inesperado - Algo interno ou campos incompletos'
  })
  @ApiOperation({
    summary: 'Cria uma coleção'
  })
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createColectionDto: CollectionDto) {
    return this.collectionService.create(createColectionDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Coleções encontradas com sucesso'
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autorizado'
  })
  @ApiResponse({
    status: 500,
    description: 'Erro inesperado - Algo interno ou campos incompletos'
  })
  @ApiOperation({
    summary: 'Busca todas as coleções'
  })
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.collectionService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Coleção encontrada com sucesso'
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autorizado'
  })
  @ApiResponse({
    status: 404,
    description: 'Coleção não encontrada'
  })
  @ApiResponse({
    status: 500,
    description: 'Erro inesperado - Algo interno ou campos incompletos'
  })
  @ApiOperation({
    summary: 'Busca uma coleção'
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Coleção editada com sucesso'
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autorizado'
  })
  @ApiResponse({
    status: 404,
    description: 'Coleção não encontrada'
  })
  @ApiResponse({
    status: 500,
    description: 'Erro inesperado - Algo interno ou campos incompletos'
  })
  @ApiOperation({
    summary: 'Edita uma coleção'
  })
  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateColectionDto: CollectionDto) {
    return this.collectionService.update(id, updateColectionDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Coleção deletada com sucesso'
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autorizado'
  })
  @ApiResponse({
    status: 404,
    description: 'Coleção não encontrada'
  })
  @ApiResponse({
    status: 500,
    description: 'Erro inesperado - Algo interno ou campos incompletos'
  })
  @ApiOperation({
    summary: 'Apaga uma coleção'
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionService.remove(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Livro adicionado com sucesso na coleção'
  })
  @ApiResponse({
    status: 400,
    description: 'Livro já adicionado a esta coleção ou a uma outra'
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autorizado'
  })
  @ApiResponse({
    status: 404,
    description: 'Coleção ou livro não encontrados'
  })
  @ApiResponse({
    status: 500,
    description: 'Erro inesperado - Algo interno ou campos incompletos'
  })
  @ApiOperation({
    summary: 'Adiciona um livro a uma coleção'
  })
  @UseGuards(AuthGuard)
  @Post(':id/:bookId')
  addBook(@Param('id') id: string, @Param('bookId') bookId: string) {
    return this.collectionService.addBook(id, bookId);
  }

  @ApiResponse({
    status: 200,
    description: 'Livro removido com sucesso da coleção'
  })
  @ApiResponse({
    status: 400,
    description: 'Livro já adicionado a uma outra ou sem nenhuma coleção vinculada'
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autorizado'
  })
  @ApiResponse({
    status: 404,
    description: 'Coleção ou livro não encontrados'
  })
  @ApiResponse({
    status: 500,
    description: 'Erro inesperado - Algo interno ou campos incompletos'
  })
  @ApiOperation({
    summary: 'Remove um livro de uma coleção'
  })
  @UseGuards(AuthGuard)
  @Delete(':id/:bookId')
  removeBook(@Param('id') id: string, @Param('bookId') bookId: string) {
    return this.collectionService.removeBook(id, bookId);
  }
}
