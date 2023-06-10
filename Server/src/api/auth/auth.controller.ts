import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegistrationCredentialsDTO } from 'src/api/auth/dto/RegistrationCredentialsDTO.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { messageResponse } from './dto/reponseMessage.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.OK)
  async register(
    @Body() registrationCredentialsDTO: RegistrationCredentialsDTO,
  ): Promise<messageResponse> {
    console.log('RegistrationCredentialsDTO', RegistrationCredentialsDTO);
    return this.authService.register(registrationCredentialsDTO);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }
}
