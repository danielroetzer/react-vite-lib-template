/// <reference types="vite/client" />
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { extname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { globSync } from 'glob'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

const storiesPattern = '**/*.stories.{ts,tsx}'
const testsPattern = '**/*.test.{ts,tsx}'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      include: ['lib'],
      exclude: [storiesPattern, testsPattern],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      // This is the recommended way to bundle with keeping the original file structure.
      // The `preserveModules` option would be the alternative, but it breaks the css modules.
      // See: https://rollupjs.org/configuration-options/#input
      input: Object.fromEntries(
        globSync('lib/**/*.{ts,tsx}', {
          ignore: [storiesPattern, testsPattern, '**/*.d.ts'],
        }).map((file) => [
          // This removes `lib/` as well as the file extension from each file,
          // so e.g. lib/src/components/button.tsx becomes src/components/button
          relative('lib', file.slice(0, file.length - extname(file).length)),
          // This expands the relative paths to absolute paths, so e.g.
          // lib/src/components/button becomes .../project/lib/src/components/button.tsx
          fileURLToPath(new URL(file, import.meta.url)),
        ]),
      ),
      external: ['react', 'react-dom', 'react/jsx-runtime'],
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
