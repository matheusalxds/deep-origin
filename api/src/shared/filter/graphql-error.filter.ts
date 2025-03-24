import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { GraphQLError } from 'graphql/error';
import { I18nContext } from 'nestjs-i18n';

import { t } from '@/shared/translator/i18n';

@Catch(BadRequestException)
export class GraphQLValidationExceptionFilter implements ExceptionFilter {
  constructor() {}

  async catch(exception: any, host: ArgumentsHost) {
    const i18n = I18nContext.current(host);
    const response = exception.getResponse() as any;
    const translatedErrors = await Promise.all(response.message.map(async (msg: string) => i18n.t(t(msg))));
    return new GraphQLError('Validation Error', {
      extensions: {
        code: 'BAD_USER_INPUT',
        errors: translatedErrors.map((message) => ({ message })),
      },
    });
  }
}
