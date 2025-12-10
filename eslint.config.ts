import Globals from 'globals';
import PluginJS from '@eslint/js';
import PluginTS from 'typescript-eslint';
import PluginReact from 'eslint-plugin-react';
import PluginSonar from 'eslint-plugin-sonarjs';
import PluginUnicorn from 'eslint-plugin-unicorn';
import PluginStylistic from '@stylistic/eslint-plugin';
import PluginTailwindCSS from 'eslint-plugin-better-tailwindcss';

import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([

    // Global Ignore
    globalIgnores([ 'dist/', 'build/', 'src-tauri/', 'node_modules/' ]),

    // JavaScript
    PluginJS.configs.recommended,

    // TypeScript
    PluginTS.configs.strictTypeChecked,
    PluginTS.configs.stylisticTypeChecked,

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

    // Popular Plugin
    PluginSonar.configs.recommended,
    PluginUnicorn.configs.recommended,

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
            // SonarJS
            'sonarjs/pseudo-random': 'off',
            'sonarjs/no-small-switch': 'off',
            'sonarjs/no-nested-functions': 'off',
            'sonarjs/function-return-type': 'off',

            // Unicorn
            'unicorn/prefer-global-this': 'off',
            'unicorn/no-typeof-undefined': 'off',
            'unicorn/prevent-abbreviations': 'off',

            'unicorn/filename-case': [ 'error', { case: 'camelCase' } ],

            // React
            'react/jsx-curly-spacing': [ 'error', { when: 'always' } ],
            'react/jsx-closing-bracket-location': [ 'error', 'after-props' ],
            'react/jsx-sort-props': [ 'error', { noSortAlphabetically: false } ],

            // TailwindCSS
            'better-tailwindcss/enforce-consistent-line-wrapping': 'off',

            'better-tailwindcss/no-unregistered-classes': [ 'error', { ignore: [ 'fi' ] } ],

            // TypeScript
            '@typescript-eslint/no-unused-vars': 'off', // Handled by TypeScript Compiler

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

/*
import type { Rule } from 'eslint';
import type { TSESTree } from '@typescript-eslint/utils';

    // Custom
    {
        plugins:
        {
            custom:
            {
                rules:
                {
                    //
                }
            }
        },
        rules:
        {
            // 'custom/no-predefined-tailwindcss': 'error'
        }
    }

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
*/
