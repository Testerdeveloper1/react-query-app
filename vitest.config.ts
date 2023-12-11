import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
 test: {
   environment: 'happy-dom',
   // exclude: ['packages/template/*'],
   setupFiles:['./tests/setup.ts'],
   globals:true,
 },
}))
