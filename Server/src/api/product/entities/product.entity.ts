import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductCategory } from './productCategory.entity';
import { CartProduct } from './productCart.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  slug: string;

  @Column()
  descriptions: string;

  @Column()
  SKU: number;

  @Column()
  price: number;

  @Column()
  price_sale: number;
  @Column()
  status: number;

  @ManyToOne(() => ProductCategory, (category) => category.products)
  category: ProductCategory;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.productId)
  cartProduct: CartProduct[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
