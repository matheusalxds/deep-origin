import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule as GraphQLModuleNestJS } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { join } from 'path';

type OriginalError = Maybe<
  Error & {
    readonly extensions?: { [key: string]: any };
  }
>;

@Module({
  imports: [
    GraphQLModuleNestJS.forRootAsync<ApolloDriverConfig>({
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => {
        const enablePlayground = configService.get('NODE_ENV') !== 'production';
        return {
          subscriptions: {
            'graphql-ws': {
              onConnect: (params) => ({ connectionParams: params }),
              path: '/graphql',
            },
          },
          introspection: enablePlayground,
          csrfPrevention: false,
          sortSchema: true,
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          playground: enablePlayground,
          context: ({ req, res }) => ({ req, res }),
          formatError: (error) => {
            const originalError = error.extensions?.errors as OriginalError;
            if (Array.isArray(originalError)) {
              return new GraphQLError('Validation Error', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  errors: originalError.map((msg) => msg.message),
                },
              });
            }
            return { message: error.message, statusCode: error.extensions?.code };
          },
        };
      },
    }),
  ],
})
export class GraphQLModule {}
