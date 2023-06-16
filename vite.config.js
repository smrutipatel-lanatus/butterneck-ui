import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint({
      exclude: ['/virtual:/**', 'node_modules/**'], // https://github.com/storybookjs/builder-vite/issues/535
    }),
  ],
  server: {
    port: 3000,
  },
  define: {
    'process.env': {},
  },
  esbuild: {
    loader: 'jsx',
    include: [
      // Business as usual for .jsx  files
      'src/**/*.jsx',
      // Add these lines to allow all .js files to contain JSX
      'src/**/*.js',
      // https://github.com/mui/material-ui/issues/32727
      '@mui/icons-material',
    ],
    exclude: [],
  },
});
