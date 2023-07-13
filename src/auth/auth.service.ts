import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'prisma/lib';
import * as bcrypt from 'bcrypt'
import { createAccessToken } from 'lib/utils';

@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService) { }

  async postLogin(data: AuthDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: data.email
        }
      })

      if (!user) {
        return new HttpException(
          { status: 'error', message: 'Usuário não encontrado' },
          HttpStatus.NOT_FOUND,
        );
      }

      if(!bcrypt.compare(data.password, user.password)) {
        return new HttpException(
          { status: 'error', message: 'Credenciais inválidas.' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const accessToken = createAccessToken(data)
      
      return new HttpException(
        { status: 'success', message: 'Login realizado com sucesso.', data: {
          user: user,
          token: accessToken
        } },
        HttpStatus.OK,
      );
    } catch (e) {
      throw new HttpException(
        { status: 'error', message: 'Falha ao realizar login', data: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
