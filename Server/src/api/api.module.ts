import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { RoleModule } from 'src/api/role/role.module';
import { UsersModule } from 'src/api/users/users.module';
import { ProductModule } from './product/product.module';
@Module({
  imports: [AuthModule, UsersModule, RoleModule, ProductModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
