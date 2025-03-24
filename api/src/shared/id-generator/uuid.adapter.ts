import { v4 } from 'uuid';

import { IIdGenerator } from '@/shared/id-generator/id-generator.interface';

export class UUIDAdapter implements IIdGenerator {
  gen(): string {
    return v4();
  }
}
