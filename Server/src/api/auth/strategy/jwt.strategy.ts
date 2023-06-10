import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/api/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super({
      // token string is added to very request (login / register)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
    console.log('JWT_SECRET');
  }

  async validate(payload: { sub: number; email: string }) {
    console.log('payload' + payload.email);
    const user = await this.usersRepository.findOne({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    console.log(JSON.stringify(user));

    return user;
  }
}
