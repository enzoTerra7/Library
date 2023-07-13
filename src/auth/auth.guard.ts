import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token || !jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'tokenSecret')) {
      throw new UnauthorizedException(
        { status: 401, message: 'Usuário não autorizado.' }
      );
    }
    try {
      const payload = jwt.decode(token)
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException(
        { status: 401, message: 'Usuário não autorizado.' }
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}