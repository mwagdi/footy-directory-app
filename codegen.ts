
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://footy-directory-59316565a7b1.herokuapp.com/',
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-document-nodes']
    }
  }
};

export default config;
