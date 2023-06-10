import { User } from 'src/api/users/entities';
import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Role extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => User, (user) => user.role, { nullable: true })
  user?: User[];
}
