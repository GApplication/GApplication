import Globals from 'globals';
import PluginJS from '@eslint/js';
import PluginTS from 'typescript-eslint';
import PluginReact from 'eslint-plugin-react';
import PluginStylistic from '@stylistic/eslint-plugin';
import PluginTailwindCSS from 'eslint-plugin-better-tailwindcss';

import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([

    // Global Ignore
    globalIgnores([ 'dist/', 'build/', 'src-tauri/', 'node_modules/' ]),

    // JavaScript
    PluginJS.configs.recommended,

    // TypeScript
    PluginTS.configs.recommended,
    PluginTS.configs.stylistic,

    // React
    {
        ...PluginReact.configs.flat['recommended'],
        ...PluginReact.configs.flat['jsx-runtime'],
        settings:
        {
            react:
            {
                version: 'detect'
            }
        }
    },

    // Stylistic
    PluginStylistic.configs.customize({ indent: 4, semi: true, jsx: true, braceStyle: 'allman', commaDangle: 'never', quoteProps: 'as-needed' }),

    // TailwindCSS
    {
        languageOptions:
        {
            parserOptions:
            {
                ecmaFeatures:
                {
                    jsx: true
                }
            }
        },
        plugins:
        {
            'better-tailwindcss': PluginTailwindCSS
        },
        rules:
        {
            ...PluginTailwindCSS.configs['recommended-error'].rules
        },
        settings:
        {
            'better-tailwindcss':
            {
                entryPoint: 'src/app.css'
            }
        }
    },

    // Global
    {
        languageOptions:
        {
            parserOptions:
            {
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            },
            globals:
            {
                __dirname: false,

                ...Globals.browser
            }
        },
        rules:
        {
            // React
            'react/jsx-curly-spacing': [ 'error', { when: 'always' } ],
            'react/jsx-closing-bracket-location': [ 'error', 'after-props' ],
            'react/jsx-sort-props': [ 'error', { noSortAlphabetically: false } ],

            // TailwindCSS
            'better-tailwindcss/enforce-consistent-line-wrapping': 'off',

            'better-tailwindcss/no-unregistered-classes': [ 'error', { ignore: [ 'fi' ] } ],

            // TypeScript
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'warn',
            '@typescript-eslint/no-floating-promises': 'warn',

            '@typescript-eslint/no-unused-vars': [ 'error', { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' } ],

            // Stylistic
            '@stylistic/jsx-curly-spacing': 'off',
            '@stylistic/operator-linebreak': 'off',
            '@stylistic/jsx-wrap-multilines': 'off',
            '@stylistic/jsx-closing-tag-location': 'off',
            '@stylistic/jsx-closing-bracket-location': 'off',

            '@stylistic/arrow-parens': [ 'error', 'always' ],
            '@stylistic/padded-blocks': [ 'error', 'never' ],
            '@stylistic/linebreak-style': [ 'error', 'unix' ],
            '@stylistic/quote-props': [ 'error', 'as-needed' ],
            '@stylistic/jsx-quotes': [ 'error', 'prefer-single' ],
            '@stylistic/object-curly-spacing': [ 'error', 'always' ],
            '@stylistic/array-bracket-spacing': [ 'error', 'always' ],
            '@stylistic/template-curly-spacing': [ 'error', 'always' ],
            '@stylistic/array-element-newline': [ 'error', 'consistent' ],
            '@stylistic/array-bracket-newline': [ 'error', 'consistent' ],
            '@stylistic/multiline-ternary': [ 'error', 'always-multiline' ],
            '@stylistic/function-call-argument-newline': [ 'error', 'consistent' ],
            '@typescript-eslint/restrict-template-expressions': [ 'error', { allowNumber: true } ],
            '@stylistic/object-property-newline': [ 'error', { allowAllPropertiesOnSameLine: true } ],
            '@stylistic/indent': [ 'error', 4, { SwitchCase: 1, ObjectExpression: 1, assignmentOperator: 0 } ],
            '@stylistic/space-before-function-paren': [ 'error', { anonymous: 'never', named: 'never', asyncArrow: 'never', catch: 'always' } ]
        }
    }
]);
