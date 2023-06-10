import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Role } from 'src/api/role/entities';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserAddress } from './userAddress.entity';

@Entity()
export class User extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => UserAddress, (address) => address.user, { nullable: true })
  @JoinColumn()
  addresses: UserAddress[];

  @ManyToOne(() => Role, (role) => role.user)
  role: Role;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
