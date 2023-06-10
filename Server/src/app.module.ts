import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './utils/validators/env.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource } from 'typeorm';
import databaseConfig from './config/database.config';
import { ApiModule } from './api/api.module';
import { RedisConfig } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      validate,
    }),
    ApiModule,
    RedisConfig,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
