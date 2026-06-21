import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      // Increase warning threshold (default is 500kB)
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Three.js / React Three Fiber ecosystem (very large)
            if (
              id.includes('node_modules/three') ||
              id.includes('node_modules/@react-three') ||
              id.includes('node_modules/@types/three')
            ) {
              return 'vendor-three';
            }
            // Animation libraries
            if (
              id.includes('node_modules/framer-motion') ||
              id.includes('node_modules/motion') ||
              id.includes('node_modules/gsap') ||
              id.includes('node_modules/lenis')
            ) {
              return 'vendor-animation';
            }
            // React core
            if (
              id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/')
            ) {
              return 'vendor-react';
            }
            // UI utilities
            if (
              id.includes('node_modules/lucide-react') ||
              id.includes('node_modules/@phosphor-icons') ||
              id.includes('node_modules/react-icons') ||
              id.includes('node_modules/radix-ui') ||
              id.includes('node_modules/vaul') ||
              id.includes('node_modules/class-variance-authority') ||
              id.includes('node_modules/clsx') ||
              id.includes('node_modules/tailwind-merge')
            ) {
              return 'vendor-ui';
            }
            // Other node_modules go into a general vendor chunk
            if (id.includes('node_modules')) {
              return 'vendor-misc';
            }
          },
        },
      },
    },
  };
});
