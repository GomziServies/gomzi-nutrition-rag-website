import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { websiteContentPlugin } from './scripts/website-content-compiler.mjs'
import tailwindcss from '@tailwindcss/vite'
import { isLocalApiUrl } from './src/config/api-url.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const target = env.VITE_API_URL?.trim() || 'http://localhost:3005'
  const proxy = isLocalApiUrl(target) ? {
    '/api': {
      target,
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api(?=\/|$)/, ''),
    },
  } : undefined

  return {
    plugins: [websiteContentPlugin(process.cwd()), react(), tailwindcss()],
    server: { host: true, proxy },
    preview: { host: true, proxy },
  }
})
