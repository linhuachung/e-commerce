import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { RegistrationCredentialsDTO } from 'src/api/auth/dto/RegistrationCredentialsDTO.dto';
import { Repository } from 'typeorm';
import { User } from './../users/entities/user.entity';
import { LoginDTO } from './dto/login.dto';
import { messageResponse } from './dto/reponseMessage.dto';
import { Role } from 'src/api/role/entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // Register new user
  async register(
    registrationCredentialsDTO: RegistrationCredentialsDTO,
  ): Promise<messageResponse> {
    // Check if the email is already registered
    const existingUserByEmail = await this.usersRepository.findOne({
      where: { email: registrationCredentialsDTO.email },
    });
    if (existingUserByEmail) {
      // throw new ConflictException('Email is already registered');
      throw new BadRequestException({
        message: 'Email is already registered',
        error: 'email_exist',
        statusCode: 400,
      });
    }

    // // Check if the username is already registered
    // const existingUserByUsername = await this.usersRepository.findOne({
    //   where: { email: registrationCredentialsDTO.email },
    // });
    // if (existingUserByUsername) {
    //   throw new ConflictException('Username is already registered');
    // }

    // Hash the password
    const hashPassword = await argon.hash(registrationCredentialsDTO.password);

    // Find the default role
    const roleChoose = await this.roleRepository.findOne({
      where: { id: registrationCredentialsDTO.role_id },
    });

    if (!roleChoose) {
      throw new BadRequestException({
        message: 'Role not exist',
        error: 'role_not_exist',
        statusCode: 400,
      });
    }

    // Create a new user with hashed password
    const newUser = this.usersRepository.create({
      ...registrationCredentialsDTO,
      password: hashPassword,
      role: roleChoose,
    });

    // Save the new user to the database
    await this.usersRepository.save(newUser);

    return {
      message: 'Created new user successfully!',
      time: Date.now(),
    };
  }

  // login user
  async login(loginDTO: LoginDTO) {
    const user = await this.usersRepository.findOne({
      where: {
        email: loginDTO.email,
      },
    });
    if (!user) {
      // throw new ForbiddenException('User with is this email not exist');
      throw new BadRequestException({
        message: 'User with is this email not exist',
        error: 'user_not_exist',
        statusCode: 400,
      });
    }

    const passwordMatched = await argon.verify(
      user.password,
      loginDTO.password,
    );
    if (!passwordMatched) {
      // throw new ForbiddenException('Incorrect password');
      throw new BadRequestException({
        message: 'Incorrect password',
        error: 'incorrect_password',
        statusCode: 400,
      });
    }

    return this.signJWT(user.id, user.email);
  }

  async signJWT(id: string, email: string): Promise<{ accessToken: string }> {
    const payload = {
      sub: id,
      email: email,
    };

    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET'),
    });
    const data = {
      accessToken: jwtString,
    };
    return data;
  }
}
