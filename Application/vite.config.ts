import React from '@vitejs/plugin-react';
import TailwindCSS from '@tailwindcss/vite';

import { defineConfig } from 'vite';

const TauriHost = process.env['TAURI_DEV_HOST'];

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
        strictPort: true,
        host: TauriHost || true,
        hmr: TauriHost ? { port: 1421, protocol: 'ws', host: TauriHost } : true,
        watch:
        {
            ignored:
            [
                '**/src-tauri/**'
            ]
        }
    }
}));
