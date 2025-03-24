import { Module } from '@nestjs/common';

import { ID_GENERATOR } from '@/shared/id-generator/id-generator.interface';
import { UUIDAdapter } from '@/shared/id-generator/uuid.adapter';
import { useClass } from '@/shared/utils/provider-generator';

@Module({
  providers: [useClass(ID_GENERATOR, UUIDAdapter)],
  exports: [ID_GENERATOR],
})
export class IdGeneratorModule {}
