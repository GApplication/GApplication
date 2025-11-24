/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import React from '@vitejs/plugin-react';
import TailwindCSS from '@tailwindcss/vite';

import { defineConfig } from 'vite';

// @ts-expect-error Tauri
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
        port: 1420,
        host: TauriHost,
        strictPort: true,
        hmr: typeof TauriHost === 'boolean' ? undefined : { port: 1421, protocol: 'ws', host: TauriHost },
        watch:
        {
            ignored:
            [
                '**/src-tauri/**'
            ]
        }
    }
}));
