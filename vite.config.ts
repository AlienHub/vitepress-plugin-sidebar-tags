import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
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