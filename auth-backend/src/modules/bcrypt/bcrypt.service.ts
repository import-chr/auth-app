import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private readonly saltRounds = 12;

  async hash(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);

    return await bcrypt.hash(data, salt);
  }

  async compare(data: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(data, hash);
  }
}
