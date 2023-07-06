import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDTO } from './user.service.types';

@ApiTags('Users')
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
    status: 500,
    description: 'Erro inesperado - Algo interno ou campos incompletos'
  })
  @ApiOperation({
    summary: 'Cria um livro'
  })
  @Post()
  async create(@Body() data: UserDTO) {
    return this.userService.create(data)
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
    status: 500,
    description: 'Erro inesperado - Algo interno ou campos incompletos'
  })
  @ApiOperation({
    summary: 'Deleta um usuário'
  })
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.userService.delete(id)
  }
}
