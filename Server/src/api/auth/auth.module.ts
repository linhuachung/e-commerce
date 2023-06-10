import { JWTStrategy } from './strategy/jwt.strategy';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RoleModule } from 'src/api/role/role.module';
import { Role } from 'src/api/role/entities';
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'I have a dream hehe',
      signOptions: {
        expiresIn: '10m',
      },
    }),
    TypeOrmModule.forFeature([User, Role]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
  exports: [PassportModule, JWTStrategy],
})
export class AuthModule {}
