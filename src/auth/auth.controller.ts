import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso'
  })
  @ApiResponse({
    status: 400,
    description: 'Credenciais inválidas'
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado'
  })
  @ApiResponse({
    status: 500,
    description: 'Erro inesperado - Algo interno ou campos incompletos'
  })
  @ApiOperation({
    summary: 'Realiza login na plataforma'
  })
  @Post()
  postLogin(@Body() data: AuthDto) {
    return this.authService.postLogin(data);
  }
}
