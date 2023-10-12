import { defineConfig } from 'vite'
import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
    }),
    Components({}),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'icons': resolve(__dirname, './src/assets/icons'),
      'atoms': resolve(__dirname, './src/components/atoms'),
      'pages': resolve(__dirname, './src/pages'),
    },
  },
})
