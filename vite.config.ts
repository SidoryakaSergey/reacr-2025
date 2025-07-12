/// <reference types="vitest/config" />

import { defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const config: UserConfig = {
    plugins: [react(), svgr()],
    build: {
      target: 'es2022',
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './tests/setup.js',
      coverage: {
        provider: 'istanbul',
        reporter: ['text', 'json', 'html'],
        exclude: ['**/*.d.ts', '**/*.config.ts', 'tests/**', 'src/constants/**', 'src/types/**', 'dist', 'coverage'],
      },
    },
  };

  if (mode === 'production') {
    config.base = './';
  }

  return config;
});
