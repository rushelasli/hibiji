import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import path from 'path'

// Second entry: the projects-hub landing page served at
// https://project.nyaahibi.web.id (built separately into dist-hub/).
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('model-viewer'),
        },
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    outDir: 'dist-hub',
    rollupOptions: {
      input: path.resolve(import.meta.dirname, 'hub.html'),
    },
  },
})
