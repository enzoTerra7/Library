import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/lib';
import { UpdateUserDTO, UserDTO } from './user.service.types';
import * as bcrypt from 'bcrypt'
import { passwordCheck } from 'lib/utils';

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

      if (!!emailExists) {
        throw new HttpException(
          { status: 'error', message: 'Email já existente' },
          HttpStatus.NOT_ACCEPTABLE,
        );
      }

      if (!passwordCheck(data.password)) {
        throw new HttpException(
          { status: 'error', message: 'Senha em um formato inválido!' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword
        }
      })
      return new HttpException({ status: 'success', message: 'Usuário criado com sucesso', data: user }, HttpStatus.CREATED,);
    } catch (e) {
      console.log(e)
      throw new HttpException(
        { status: 'error', message: 'Falha ao criar usuário', data: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, data: UpdateUserDTO) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: id
        }
      })

      if (!user) {
        throw new HttpException(
          { status: 'error', message: 'Usuário não encontrado' },
          HttpStatus.NOT_FOUND,
        );
      }

      if(data.email) {
        const user = await this.prisma.user.findFirst({
          where: {
            email: data.email
          }
        })
  
        if (!user && user.id != id) {
          throw new HttpException(
            { status: 'error', message: 'Email já utilizado em outro usuário' },
            HttpStatus.NOT_ACCEPTABLE,
          );
        }
      }

      const updatedUser = await this.prisma.user.update({
        where: {
          id: id
        },
        data: {
          email: data?.email || user.email,
          name: data?.name || user.name
        }
      })

      return new HttpException({ status: 'success', message: 'Usuário criado com sucesso', data: updatedUser }, HttpStatus.OK,);
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

      if (!emailExists) {
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

  async getAll() {
    try {
      const users = await this.prisma.user.findMany()
      return new HttpException({ status: 'success', message: 'Usuários encontrados com sucesso', data: users }, HttpStatus.OK);
    } catch (e) {
      throw new HttpException(
        { status: 'error', message: 'Falha ao buscar os usuários', data: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id
        }
      })

      if (!user) {
        throw new HttpException(
          { status: 'error', message: 'Usuário não encontrado' },
          HttpStatus.BAD_REQUEST,
        );
      }

      return new HttpException({ status: 'success', message: 'Usuário encontrado com sucesso', data: user }, HttpStatus.OK);
    } catch (e) {
      throw new HttpException(
        { status: 'error', message: 'Falha ao buscar usuário', data: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addBook(id: string, data: UpdateUserDTO) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: id
        }
      })

      if (!user) {
        throw new HttpException(
          { status: 'error', message: 'Usuário não encontrado' },
          HttpStatus.NOT_FOUND,
        );
      }

      if(data.email) {
        const user = await this.prisma.user.findFirst({
          where: {
            email: data.email
          }
        })
  
        if (!user && user.id != id) {
          throw new HttpException(
            { status: 'error', message: 'Email já utilizado em outro usuário' },
            HttpStatus.NOT_ACCEPTABLE,
          );
        }
      }

      const updatedUser = await this.prisma.user.update({
        where: {
          id: id
        },
        data: {
          email: data?.email || user.email,
          name: data?.name || user.name
        }
      })

      return new HttpException({ status: 'success', message: 'Usuário criado com sucesso', data: updatedUser }, HttpStatus.OK,);
    } catch (e) {
      throw new HttpException(
        { status: 'error', message: 'Falha ao criar usuário', data: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
