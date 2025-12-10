import React from '@vitejs/plugin-react';
import TailwindCSS from '@tailwindcss/vite';

import { defineConfig } from 'vite';

// @ts-expect-error Tauri Host
const TauriHost = (process.env.TAURI_DEV_HOST ?? false) as boolean | string;

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
        watch:
        {
            ignored:
            [
                '**/src-tauri/**'
            ]
        }
    }
}));
