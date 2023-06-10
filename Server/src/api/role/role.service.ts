import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleDto } from 'src/api/role/dto/role.dto';
import { Role } from 'src/api/role/entities';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }
  async findById(id: any): Promise<Role> {
    return this.roleRepository.findOne(id);
  }

  async findByName(name: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { name } });
  }

  async create(roleDto: RoleDto): Promise<Role> {
    const role = new Role();
    role.name = roleDto.name;
    return this.roleRepository.save(role);
  }

  async update(id: number, updatedRole: Role): Promise<Role> {
    const role = await this.findById(id);
    if (!role) {
      return null;
    }

    Object.assign(role, updatedRole);
    return await this.roleRepository.save(role);
  }

  async delete(id: number): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
