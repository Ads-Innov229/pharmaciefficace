import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import js from '@eslint/js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  // Ignore build and dependency directories
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/node_modules/**',
      '**/.next/**',
      '**/.vscode/**',
      '**/coverage/**',
      '**/*.d.ts',
      '**/.vite/**',
      '**/vite.config.*',
      '**/tailwind.config.*',
      '**/postcss.config.*',
      '**/*.config.js',
      '**/__tests__/**',
      '**/__mocks__/**',
      '**/*.test.*',
      '**/*.spec.*',
      '**/*.stories.*',
      '**/.storybook/**'
    ]
  },
  
  // Base configuration
  js.configs.recommended,
  {
    ...reactRecommended,
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ...reactRecommended.languageOptions,
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: {
          ...globals.browser,
          ...globals.es2021,
          ...globals.node,
          // Variables globales du navigateur
          window: 'readonly',
          document: 'readonly',
          localStorage: 'readonly',
          sessionStorage: 'readonly',
          alert: 'readonly',
          // Variables de l'environnement Node
          process: 'readonly',
          // Variables communes
          console: 'readonly',
          setTimeout: 'readonly',
          clearTimeout: 'readonly',
          setInterval: 'readonly',
          clearInterval: 'readonly',
          // Variables React
          JSX: 'readonly',
          React: 'readonly',
        },
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // TypeScript specific rules
      ...tsPlugin.configs['recommended'].rules,
      ...tsPlugin.configs['recommended-requiring-type-checking'].rules,
      // React specific rules
      'react/react-in-jsx-scope': 'off', // Not needed with React 17+
      'react/prop-types': 'off', // We use TypeScript for type checking
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // Custom rules
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }],
      // Gestion des promesses non gérées
      '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
      '@typescript-eslint/no-misused-promises': 'error',
      // Désactiver les avertissements pour les variables globales du navigateur
      'no-restricted-globals': 'off',
      'no-undef': 'off', // Désactivé car TypeScript gère déjà cela
      // Désactiver les avertissements pour les variables globales spécifiques
      'no-restricted-syntax': [
        'error',
        {
          selector: 'CallExpression[callee.object.name="console"][callee.property.name!=/^(log|warn|error|info|trace|debug)$/]',
          message: 'Unexpected property on console object was called',
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error', 'info', 'debug'] }],
      // Règles pour les hooks React
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      // Bonnes pratiques JavaScript
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
    },
  },
];
