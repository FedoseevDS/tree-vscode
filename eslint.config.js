import js from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  perfectionist.configs['recommended-alphabetical'],
  eslintPluginPrettierRecommended,
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'no-console': 'error',
      'no-shadow': ['error'],
      'perfectionist/sort-imports': [
        'error',
        {
          environment: 'node',
          ignoreCase: true,
          internalPattern: ['~/**'],
          matcher: 'minimatch',
          maxLineLength: undefined,
          newlinesBetween: 'always',
          order: 'asc',
          sortSideEffects: true,
          specialCharacters: 'keep',
          type: 'alphabetical',
        },
      ],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/jsx-no-constructed-context-values': ['error'],
    },
  },
);