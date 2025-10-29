/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import React from '@vitejs/plugin-react';
import TailwindCSS from '@tailwindcss/vite';

import { defineConfig } from 'vite';

// @ts-expect-error Env
const TauriHost = process.env.TAURI_DEV_HOST ?? false;

export default defineConfig(() => ({

    root: './src',
    clearScreen: false,

    plugins:
    [
        React(),
        TailwindCSS()
    ],

    server:
    {
        host: TauriHost,
        port: 1420,
        hmr: typeof TauriHost === 'boolean' ? undefined : { port: 1421, protocol: 'ws', host: TauriHost },
        strictPort: true,
        watch:
        {
            ignored:
            [
                '**/src-tauri/**'
            ]
        }
    }
}));
