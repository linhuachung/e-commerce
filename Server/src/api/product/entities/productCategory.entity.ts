import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductCategory extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  title: string;

  @Column()
  slug: string;

  @Column()
  descriptions: string;

  @Column()
  status: number;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
