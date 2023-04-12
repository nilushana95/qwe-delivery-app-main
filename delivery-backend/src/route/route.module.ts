import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Route, RouteSchema } from './route.schema';
import { AuthGuard } from 'src/common/auth.gaurd';
import { AuthJwt } from 'src/auth/auth';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Route.name, schema: RouteSchema }]),
    AuthJwt.config(),
  ],
  providers: [RouteService, AuthGuard],
  controllers: [RouteController],
})
export class RouteModule {}
