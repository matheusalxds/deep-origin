import type { CodegenConfig } from '@graphql-codegen/cli';

import { env } from './src/shared/env';

const config: CodegenConfig = {
  overwrite: true,
  schema: env.API_URL,
  documents: 'src/data/**/*.gql.ts',
  generates: {
    '__generated__/gql/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
        avoidOptionals: true,
        enumsAsTypes: true,
        immutableTypes: true,
        strictScalars: true,
        namingConvention: 'keep',
        onlyOperationTypes: true,
        useTypeImports: true,
        useImplementingTypes: true,
      },
    },
  },
};

export default config;
