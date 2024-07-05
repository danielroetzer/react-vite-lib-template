/// <reference types="vite/client" />
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import path, { resolve } from 'node:path'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'
import { fileURLToPath } from 'node:url'
import { globSync } from 'glob'

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
      // This keeps the component structure in the dist folder.
      // Without it, everything would be put into a single file.
      input: Object.fromEntries(
        globSync(['lib/components/**/index.ts*', entryFile]).map((file) => {
          // This remove `lib/` as well as the file extension from each
          // file, so e.g. lib/components/button.js becomes components/button
          const entryName = path.relative(
            'lib',
            file.slice(0, file.length - path.extname(file).length),
          )
          // This expands the relative paths to absolute paths, so e.g.
          // lib/components/button becomes /project/lib/components/button.js
          const entryUrl = fileURLToPath(new URL(file, import.meta.url))
          return [entryName, entryUrl]
        }),
      ),
      output: {
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
})
