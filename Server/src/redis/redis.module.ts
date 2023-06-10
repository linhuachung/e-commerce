import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): RedisModuleOptions => {
        return {
          config: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
          },
        };
      },
    }),
  ],
})
export class RedisConfig {}
