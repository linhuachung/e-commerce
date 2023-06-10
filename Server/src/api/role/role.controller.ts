import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleDto } from 'src/api/role/dto/role.dto';
import { Role } from 'src/api/role/entities';
import { RoleService } from 'src/api/role/role.service';

@ApiTags('roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() roleDto: RoleDto): Promise<Role> {
    return this.roleService.create(roleDto);
  }
}
