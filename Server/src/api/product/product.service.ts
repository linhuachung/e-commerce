/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CartProduct, Product, ProductCategory } from './entities';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(ProductCategory)
    private productsCategoryRepository: Repository<ProductCategory>,
    @InjectRepository(CartProduct)
    private productCartRepository: Repository<CartProduct>,
  ) {}

  async findAllProduct(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async createProduct(createProductDto): Promise<Product[]> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async searchProduct(searchProductDto): Promise<Product[]> {
    console.log(searchProductDto);
    const products = this.productsRepository.findBy({
      title: Like(`%${searchProductDto.title}%`),
    });
    return products;
  }

  async addProductToCart(addProductToCartDto): Promise<CartProduct[]> {
    const findProduct = await this.productsRepository.findBy({
      id: addProductToCartDto.productId,
    });
    if (!findProduct) {
      throw new BadRequestException({
        message: 'Product is not exist',
        error: 'product_invalid',
        statusCode: 400,
      });
    }
    const findProductCart = this.productCartRepository.create(findProduct);
    if (!findProductCart) {
      console.log('adsfasdf');
    }
    console.log(findProduct);
    console.log(findProductCart);
    console.log(addProductToCartDto);
    const proDuct = addProductToCartDto;
    return this.productCartRepository.save(findProductCart);
  }

  // category
  async createProductCategory(
    createProductCategoryDto,
  ): Promise<ProductCategory[]> {
    console.log(createProductCategoryDto);
    const productCategory = this.productsCategoryRepository.create(
      createProductCategoryDto,
    );
    return this.productsCategoryRepository.save(productCategory);
  }

  async findAllCategory(): Promise<ProductCategory[]> {
    return await this.productsCategoryRepository.find();
  }
}
