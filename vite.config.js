import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { websiteContentPlugin } from './scripts/website-content-compiler.mjs'

import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [websiteContentPlugin(process.cwd()), react(), tailwindcss()],
})
