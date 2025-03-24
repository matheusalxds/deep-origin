import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InjectThrottlerOptions, InjectThrottlerStorage, ThrottlerGuard, ThrottlerStorage } from '@nestjs/throttler';
import { ThrottlerModuleOptions } from '@nestjs/throttler/dist/throttler-module-options.interface';
import { GraphQLError } from 'graphql';
import { PinoLogger } from 'nestjs-pino';

import { LogMsgMidIn, msgMid } from '@/shared/logger/log-msg';

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  private readonly logMsg: LogMsgMidIn = { msg: 'getTracker', svc: GqlThrottlerGuard.name };

  constructor(
    @InjectThrottlerStorage() storage: ThrottlerStorage,
    @InjectThrottlerOptions() options: ThrottlerModuleOptions,
    private readonly logger: PinoLogger,
  ) {
    super(options, storage, new Reflector());
  }

  protected async getTracker(req: Record<string, any>): Promise<string> {
    this.logger.info(msgMid(this.logMsg, { id: req.ip }));
    return req.ip;
  }

  getRequestResponse(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();
    return { req: ctx.req, res: ctx.res };
  }

  protected throwThrottlingException(): Promise<void> {
    throw new GraphQLError('Too many requests happening for a short period of time', {
      extensions: { code: HttpStatus.TOO_MANY_REQUESTS },
    });
  }
}
