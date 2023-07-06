import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/lib';
import { UserDTO } from './user.service.types';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) { }

  async create(data: UserDTO) {
    try {
      const emailExists = await this.prisma.user.findFirst({
        where: {
          email: data.email
        }
      })
      
      if(!!emailExists) {
        throw new HttpException(
          { status: 'error', message: 'Email já existente' },
          HttpStatus.NOT_ACCEPTABLE,
        );
      }

      const user = await this.prisma.user.create({
        data: data
      })
      return new HttpException({ status: 'success', message: 'Usuário criado com sucesso', data: user }, HttpStatus.CREATED,);
    } catch (e) {
      throw new HttpException(
        { status: 'error', message: 'Falha ao criar usuário', data: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string) {
    try {
      const emailExists = await this.prisma.user.findUnique({
        where: {
          id: id
        }
      })
      
      if(!emailExists) {
        throw new HttpException(
          { status: 'error', message: 'Usuário não encontrado' },
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.prisma.user.delete({
        where: {
          id: id
        }
      })
      return new HttpException({ status: 'success', message: 'Usuário deletado com sucesso' }, HttpStatus.OK);
    } catch (e) {
      throw new HttpException(
        { status: 'error', message: 'Falha ao deletar usuário', data: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
