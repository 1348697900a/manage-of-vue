import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue': 'vue/dist/vue.esm-bundler.js',
    },
  },
  server: {
    proxy: {
      '/manageServer': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/esp8266': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  optimizeDeps: {
    include: ['crypto-js'],
  },
});
