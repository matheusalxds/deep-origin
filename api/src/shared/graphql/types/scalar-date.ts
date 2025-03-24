import { CustomScalar, Scalar } from '@nestjs/graphql';
import { formatInTimeZone } from 'date-fns-tz';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<string, Date> {
  description = 'Date custom scalar type';

  parseValue(value: string | number): Date {
    return new Date(value);
  }

  serialize(value: Date): string {
    return formatInTimeZone(value, 'America/Sao_Paulo', 'yyyy-MM-dd HH:mm:ss');
  }

  parseLiteral(ast): Date {
    return new Date(ast.value);
  }
}
