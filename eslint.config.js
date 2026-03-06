import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'
import storybookPlugin from 'eslint-plugin-storybook'
import prettierConfig from 'eslint-config-prettier'
import { fixupPluginRules } from '@eslint/compat'
import globals from 'globals'

export default [
  // JavaScript推奨ルール
  js.configs.recommended,

  // 無視するファイル・ディレクトリ
  {
    ignores: [
      'dist',
      'node_modules',
      '.eslintrc.cjs',
      'coverage',
      'storybook-static',
    ],
  },

  // TypeScript + React ファイルの設定
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': fixupPluginRules(reactHooksPlugin),
      'react-refresh': reactRefreshPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // TypeScript推奨ルール
      ...tsPlugin.configs.recommended.rules,

      // React推奨ルール
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,

      // TypeScript環境では不要なルールを無効化
      'no-undef': 'off', // TypeScriptが型チェックするため
      'no-redeclare': 'off', // TypeScriptが型チェックするため

      // React
      'react/react-in-jsx-scope': 'off', // React 17+ では不要
      'react/prop-types': 'off', // TypeScript を使用しているため
      'react/display-name': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // 一般的なルール
      'no-console': ['warn', { allow: ['warn', 'error', 'log'] }],
      'prefer-const': 'warn',
      'no-var': 'error',

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // Storybook ファイルの設定
  {
    files: ['**/*.stories.{ts,tsx}', '**/.storybook/**/*.{ts,tsx,js}'],
    plugins: {
      storybook: storybookPlugin,
    },
    rules: {
      ...storybookPlugin.configs.recommended.rules,
    },
  },

  // shadcnが自動生成したファイルに対するルールの上書き
  {
    files: ['src/shared/ui/shadcn/**'],
    rules: {
      'react-refresh/only-export-components': 'off',
      '@typescript-eslint/no-explicit-any': 'off', // shadcnは any を使う場合がある
    },
  },

  // Prettier との統合（最後に配置して他のルールを上書き）
  prettierConfig,
]
