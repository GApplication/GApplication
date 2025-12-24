import globals from 'globals';
import pluginJS from '@eslint/js';
import pluginTS from 'typescript-eslint';
import pluginStylistic from '@stylistic/eslint-plugin';

import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([

    // Global Ignore
    globalIgnores([ 'dist/', 'node_modules/' ]),

    // JavaScript
    pluginJS.configs.recommended,

    // TypeScript
    pluginTS.configs.recommended,
    pluginTS.configs.stylistic,

    // Stylistic
    pluginStylistic.configs.customize({ indent: 4, semi: true, jsx: false, braceStyle: 'allman', commaDangle: 'never', quoteProps: 'as-needed' }),

    // Global
    {
        languageOptions:
        {
            parserOptions:
            {
                projectService: true
            },
            globals:
            {
                ...globals.node
            }
        },
        rules:
        {
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
            '@stylistic/indent': [ 'error', 4, { SwitchCase: 1, ObjectExpression: 1 } ],
            '@stylistic/object-property-newline': [ 'error', { allowAllPropertiesOnSameLine: true } ],
            '@stylistic/space-before-function-paren': [ 'error', { anonymous: 'never', named: 'never', asyncArrow: 'never', catch: 'always' } ],

            // Hamed
            'space-before-blocks': 'error',

            'block-spacing': [ 'error', 'always' ],

            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'warn',
            '@typescript-eslint/no-floating-promises': 'warn',

            '@typescript-eslint/consistent-type-definitions': [ 'error', 'interface' ],
            '@typescript-eslint/restrict-template-expressions': [ 'error', { allowNumber: true } ],
            '@typescript-eslint/no-unused-vars': [ 'error', { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' } ],
            '@typescript-eslint/member-ordering':
            [
                'error',
                {
                    default:
                    [
                        'public-instance-field',
                        'protected-instance-field',
                        'private-instance-field',

                        'constructor',

                        'public-instance-method',
                        'protected-instance-method',
                        'private-instance-method'
                    ]
                }
            ],
            '@typescript-eslint/naming-convention':
            [
                'error',
                { selector: 'class', format: [ 'PascalCase' ] },
                { selector: 'classMethod', format: [ 'camelCase' ] },
                { selector: 'classProperty', format: [ 'camelCase', 'snake_case' ] },
                { selector: 'interface', format: [ 'PascalCase' ] },
                { selector: 'variable', format: [ 'camelCase' ] },
                { selector: 'variable', modifiers: [ 'const' ], format: [ 'camelCase', 'UPPER_CASE' ] },
                { selector: 'variable', modifiers: [ 'const', 'exported' ], types: [ 'function' ], format: [ 'camelCase', 'PascalCase' ] }
            ]
        }
    }
]);
