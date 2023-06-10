import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsString()
  descriptions: string;

  @ApiProperty()
  @IsNumber()
  SKU: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  price_sale: number;

  @ApiProperty()
  @IsNumber()
  status: number;
  @ApiProperty()
  @IsString()
  category: string;
}
