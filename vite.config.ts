/// <reference types="vite/client" />
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'

const entryFile = 'lib/index.ts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['lib'],
      exclude: ['**/*.stories.ts*', '**/*.test.ts*'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, entryFile),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name][extname]',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
})
