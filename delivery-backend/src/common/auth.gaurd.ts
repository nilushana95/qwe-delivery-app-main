import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { RoleTypes } from 'src/auth/user.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.headers['authorization']) {
      request.headers['Authorization'] = request.headers['authorization'];
    }
    const token =
      request.body.token ||
      request.query.token ||
      request.headers['Authorization'];
    if (!token) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
    try {
      if (token.startsWith('Bearer ')) {
        const userData = this.jwtService.verify(token.split('Bearer ')[1]);
        const roles = this.reflector.get<RoleTypes[]>(
          'roles',
          context.getHandler(),
        );
        if (roles && roles.length > 0) {
          const x = roles.some((v) => v === userData.role);
          if (!x) {
            throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
          }
          return true;
        }
        return true;
      }
    } catch (e) {
      console.log('eeeeeee ', e);
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
  }
}
