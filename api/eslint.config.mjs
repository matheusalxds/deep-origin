import pluginJs from '@eslint/js';
import prettier from 'eslint-config-prettier';
import eslintImport from 'eslint-plugin-import';
import importHelpers from 'eslint-plugin-import-helpers';
import prettierPlugin from 'eslint-plugin-prettier';
import unusedImports from 'eslint-plugin-unused-imports';
import tsEslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  prettier,
  {
    plugins: {
      prettier: prettierPlugin,
      'unused-imports': unusedImports,
      'import-helpers': importHelpers,
      import: eslintImport,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'warn',
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: ['module', '/^@/\/', ['parent', 'sibling', 'index']],
          alphabetize: { order: 'asc', ignoreCase: true },
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],
    },
  },
];
