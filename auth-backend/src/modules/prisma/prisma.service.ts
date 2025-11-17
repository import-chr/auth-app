import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger('Auth - App');

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Database Connected');
    } catch (error) {
      const stack = error instanceof Error ? error.stack : undefined;

      this.logger.error('Failed to connect to the database', stack);

      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Database Disconnected');
  }
}
