import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Tailwind v4 is wired in as a Vite plugin — no postcss.config / tailwind.config needed.
// All design tokens live in `src/index.css` inside the `@theme` block.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5173, open: false },
})
