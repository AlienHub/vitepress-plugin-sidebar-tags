import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      exclude: ['**/*.test.ts', '**/test/**'],
      outDir: 'dist',
      include: ['src/**/*.ts'],
      rollupTypes: true
    })
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        client: resolve(__dirname, 'src/client/index.ts')
      },
      name: 'VitePressPluginSidebarTags',
      formats: ['es']
    },
    rollupOptions: {
      external: [
        'vitepress',
        'vue',
        'fs',
        'path',
        'gray-matter'
      ],
      output: {
        globals: {
          vue: 'Vue',
          vitepress: 'VitePress'
        }
      }
    },
    sourcemap: true,
    minify: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
}) 