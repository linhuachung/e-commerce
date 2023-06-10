import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column()
  address_line: string;

  @Column()
  city: string;

  @Column()
  postal_code: string;

  @Column()
  country: string;

  @Column()
  phone: string;

  @Column()
  status: number;

  @Column()
  customer_name: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
