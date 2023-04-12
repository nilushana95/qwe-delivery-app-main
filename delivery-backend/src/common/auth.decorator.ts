import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleTypes } from 'src/auth/user.dto';
import { AuthGuard } from './auth.gaurd';

export function Auth(...roles: RoleTypes[]) {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(AuthGuard));
}
