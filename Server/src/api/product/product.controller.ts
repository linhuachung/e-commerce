import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import { CartProduct, Product, ProductCategory } from './entities';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { AddProductToCartDto } from './dto/add-product-to-cart.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/product')
  @HttpCode(HttpStatus.OK)
  async findAllProduct(): Promise<Product[]> {
    return this.productService.findAllProduct();
  }

  @Post('/create/product')
  @HttpCode(HttpStatus.OK)
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product[]> {
    return this.productService.createProduct(createProductDto);
  }

  @Post('/search/product')
  @HttpCode(HttpStatus.OK)
  async searchProduct(
    @Body() searchProductDto: SearchProductDto,
  ): Promise<Product[]> {
    return this.productService.searchProduct(searchProductDto);
  }

  @Post('/add/product')
  @HttpCode(HttpStatus.OK)
  async addProductToCartDto(
    @Body() addProductToCartDto: AddProductToCartDto,
  ): Promise<CartProduct[]> {
    return this.productService.addProductToCart(addProductToCartDto);
  }

  // category
  @Post('/create/product-category')
  async createCategory(
    @Body() createProductCategoryDto: CreateProductCategoryDto,
  ): Promise<ProductCategory[]> {
    return this.productService.createProductCategory(createProductCategoryDto);
  }

  @Get('/product-category')
  @HttpCode(HttpStatus.OK)
  async findAllCategory(): Promise<ProductCategory[]> {
    return this.productService.findAllCategory();
  }
}
