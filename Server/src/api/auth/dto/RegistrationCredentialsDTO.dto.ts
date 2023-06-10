import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsNumber,
} from 'class-validator';

export class RegistrationCredentialsDTO {
  @ApiProperty({
    example: 'example@example.com',
    description: 'Email address of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Password of the user' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 1, description: '1: Admin, 2: Seller, 3: Buyer' })
  @IsNumber()
  @IsNotEmpty()
  role_id: number;
}
