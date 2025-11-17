import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  CreateTokenInterface,
  PayloadTokenInterface,
  RevokeTokenInterface,
} from './interfaces';
import { AuthorizationTokenEnum } from 'src/common/enums';

@Injectable()
export class TokensService {
  private readonly randomToken = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  private readonly getKey = ({
    type,
    userId,
  }: {
    type: AuthorizationTokenEnum;
    userId: string;
  }) => `token:${type}:user:${userId}`;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async generateToken({ userId, type, ttl = 900000 }: CreateTokenInterface) {
    try {
      return await this.cacheManager.set(
        this.getKey({ type, userId }),
        { userId, type, token: this.randomToken() },
        ttl,
      );
    } catch {
      throw new BadRequestException('There was an error.');
    }
  }

  async validateToken({ userId, type, token }: PayloadTokenInterface) {
    try {
      const payload = await this.cacheManager.get<PayloadTokenInterface>(
        this.getKey({ type, userId }),
      );

      if (!payload || payload.token !== token)
        throw new BadRequestException('Invalid or expired token.');

      return payload;
    } catch {
      throw new BadRequestException('There was an error.');
    }
  }

  async revokeToken({ userId, type }: RevokeTokenInterface): Promise<boolean> {
    try {
      return await this.cacheManager.del(this.getKey({ type, userId }));
    } catch {
      throw new BadRequestException('There was an error.');
    }
  }
}
