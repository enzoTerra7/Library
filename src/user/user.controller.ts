import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDTO, UserDTO } from './user.service.types';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso'
  })
  @ApiResponse({
    status: 406,
    description: 'Email já utilizado'
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
    summary: 'Cria um usuário'
  })
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() data: UserDTO) {
    return this.userService.create(data)
  }

  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso'
  })
  @ApiResponse({
    status: 400,
    description: 'Usuário não encontrado'
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autorizado'
  })
  @ApiResponse({
    status: 406,
    description: 'Email já utilizado em outra conta.'
  })
  @ApiResponse({
    status: 500,
    description: 'Erro inesperado - Algo interno ou campos incompletos'
  })
  @ApiOperation({
    summary: 'Cria um livro'
  })
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param("id") id: string, @Body() data: UpdateUserDTO) {
    return this.userService.update(id, data)
  }

  @ApiResponse({
    status: 200,
    description: 'Usuário deletado com sucesso'
  })
  @ApiResponse({
    status: 400,
    description: 'Usuário não encontrado'
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
    summary: 'Deleta um usuário'
  })
  @UseGuards(AuthGuard)
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.userService.delete(id)
  }

  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado com sucesso'
  })
  @ApiResponse({
    status: 400,
    description: 'Usuário não encontrado'
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
    summary: 'Busca um usuário'
  })
  @UseGuards(AuthGuard)
  @Get(":id")
  async getById(@Param("id") id: string) {
    return this.userService.getById(id)
  }

  @ApiResponse({
    status: 200,
    description: 'Usuários encontrados com sucesso'
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
    summary: 'Busca todos os usuários'
  })
  @UseGuards(AuthGuard)
  @Get()
  async getAll() {
    return this.userService.getAll()
  }
}
