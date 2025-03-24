import { ClassProvider, Type } from '@nestjs/common';

export const useClass = (provide: string | symbol, useClass: Type<any>): ClassProvider => ({ provide, useClass });
