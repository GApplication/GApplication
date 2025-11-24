import type { Rule } from 'eslint';
import type { TSESTree } from '@typescript-eslint/utils';

import Globals from 'globals';
import PluginJS from '@eslint/js';
import PluginTS from 'typescript-eslint';
import PluginReact from 'eslint-plugin-react';
import PluginSonar from 'eslint-plugin-sonarjs';
import PluginUnicorn from 'eslint-plugin-unicorn';
import PluginStylistic from '@stylistic/eslint-plugin';

import { defineConfig } from 'eslint/config';

export default defineConfig([

    PluginJS.configs.all,
    PluginTS.configs.all,
    PluginUnicorn.configs.all,
    PluginStylistic.configs.all,
    PluginReact.configs.flat.all,
    PluginSonar.configs.recommended,

    {
        languageOptions:
        {
            parserOptions:
            {
                projectService: true,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                tsconfigRootDir: import.meta.dirname
            },
            globals:
            {
                ...Globals.browser
            }
        },
        plugins:
        {
            custom:
            {
                rules:
                {
                    'no-predefined-tailwindcss':
                    {
                        meta:
                        {
                            type: 'problem',
                            docs:
                            {
                                description: 'Disallow predefined TailwindCSS numeric values.'
                            },
                            messages:
                            {
                                predefined: 'Avoid predefined.'
                            },
                            schema:
                            [
                                //
                            ]
                        },
                        create(context)
                        {
                            const sourceCode = context.sourceCode;

                            return {
                                JSXAttribute(node: TSESTree.JSXAttribute)
                                {
                                    if (node.name.name !== 'className' || !node.value)
                                    {
                                        return;
                                    }

                                    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
                                    if (node.value.type !== 'Literal' || typeof node.value.value !== 'string')
                                    {
                                        return;
                                    }

                                    if (node.value.value.length < 3 || !node.value.value.includes('-'))
                                    {
                                        return;
                                    }

                                    const Result = node.value.value.split(' ');

                                    for (const R of Result)
                                    {
                                        if (!(/-\d/).test(R))
                                        {
                                            continue;
                                        }

                                        const ID = node.value.value.indexOf(R);

                                        if (ID === -1 || R.includes('duration-') || R.includes('flex-') || R.includes('z-') || R.includes('bg-') || R.includes('border-') || R.includes('text-') || R.includes('from-') || R.includes('to-') || R.includes('calc('))
                                        {
                                            continue;
                                        }

                                        const Begin = node.value.range[0] + 1 + ID;

                                        context.report({ node: node.value, loc: { start: sourceCode.getLocFromIndex(Begin), end: sourceCode.getLocFromIndex(Begin + R.length) }, messageId: 'predefined' });
                                    }
                                }
                            };
                        }
                    } as Rule.RuleModule
                }
            }
        },
        rules:
        {
            'custom/no-predefined-tailwindcss': 'error',

            'no-void': 'off',
            'new-cap': 'off',
            'max-lines': 'off',
            'id-length': 'off',
            'sort-keys': 'off',
            'func-style': 'off',
            'no-ternary': 'off',
            'no-continue': 'off',
            'no-console': 'warn',
            'guard-for-in': 'off',
            'sort-imports': 'off',
            'default-case': 'off',
            'no-undefined': 'off',
            'no-script-url': 'off',
            'max-statements': 'off',
            'arrow-body-style': 'off',
            'no-inline-comments': 'off',
            'no-warning-comments': 'off',
            'no-duplicate-imports': 'off',
            'capitalized-comments': 'off',
            'max-lines-per-function': 'off',
            'require-unicode-regexp': 'off',
            'prefer-named-capture-group': 'off',

            'one-var': [ 'error', 'never' ],

            'sonarjs/fixme-tag': 'off',
            'sonarjs/slow-regex': 'off',
            'sonarjs/no-uniq-key': 'off',
            'sonarjs/no-small-switch': 'off',
            'sonarjs/no-commented-code': 'off',
            'sonarjs/prefer-regexp-exec': 'off',
            'sonarjs/no-nested-functions': 'off',

            'unicorn/better-regex': 'off',
            'unicorn/no-keyword-prefix': 'off',
            'unicorn/prefer-global-this': 'off',
            'unicorn/no-typeof-undefined': 'off',
            'unicorn/no-useless-undefined': 'off',
            'unicorn/prevent-abbreviations': 'off',
            'unicorn/prefer-string-replace-all': 'off',
            'unicorn/prefer-add-event-listener': 'off',
            'unicorn/no-await-expression-member': 'off',

            'unicorn/filename-case': [ 'error', { case: 'camelCase' } ],

            'react/jsx-indent': 'off',
            'react/jsx-no-bind': 'off',
            'react/jsx-max-depth': 'off',
            'react/hook-use-state': 'off',
            'react/jsx-no-literals': 'off',
            'react/button-has-type': 'off',
            'react/jsx-indent-props': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-wrap-multilines': 'off',
            'react/require-default-props': 'off',
            'react/forbid-component-props': 'off',
            'react/jsx-filename-extension': 'off',
            'react/jsx-closing-tag-location': 'off',

            'react/jsx-curly-spacing': [ 'error', { when: 'always' } ],
            'react/jsx-closing-bracket-location': [ 'error', 'after-props' ],

            '@typescript-eslint/max-params': 'off',
            '@typescript-eslint/no-magic-numbers': 'off',
            '@typescript-eslint/naming-convention': 'off',
            '@typescript-eslint/prefer-regexp-exec': 'off',
            '@typescript-eslint/prefer-destructuring': 'off',
            '@typescript-eslint/prefer-optional-chain': 'off',
            '@typescript-eslint/no-confusing-void-expression': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/prefer-readonly-parameter-types': 'off',

            '@stylistic/lines-around-comment': 'off',
            '@stylistic/multiline-comment-style': 'off',

            '@stylistic/quotes': [ 'error', 'single' ],
            '@stylistic/brace-style': [ 'error', 'allman' ],
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
            '@stylistic/object-property-newline': [ 'error', { allowAllPropertiesOnSameLine: true } ],
            '@stylistic/indent': [ 'error', 4, { SwitchCase: 1, ObjectExpression: 1, assignmentOperator: 0 } ],
            '@stylistic/space-before-function-paren': [ 'error', { anonymous: 'never', named: 'never', asyncArrow: 'never', catch: 'always' } ]
        }
    }
]);
