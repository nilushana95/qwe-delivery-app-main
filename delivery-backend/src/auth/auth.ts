import { JwtModule } from '@nestjs/jwt';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { DynamicModule } from '@nestjs/common';
import JwtKey from 'src/common/authJWT';

export class AuthJwt {
  static config(): DynamicModule {
    return JwtModule.register({
      privateKey: JwtKey.getPrivateKey(),
      publicKey: JwtKey.getPublicKey(),
      signOptions: { expiresIn: '7d', algorithm: 'RS256' },
    });
  }
}
