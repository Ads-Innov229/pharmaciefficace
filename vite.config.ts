import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import path from 'path';
import { fileURLToPath } from 'url';
import { visualizer } from 'rollup-plugin-visualizer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins: PluginOption[] = [
    react({
      // Activation du babel pour la compatibilité navigateur
      babel: {
        plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['@babel/plugin-proposal-class-properties', { loose: true }]
        ]
      }
    })
  ];

  // Visualiseur de bundle en production
  if (mode === 'analyze') {
    plugins.push(visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }) as PluginOption);
  }

  return {
    base: process.env.NODE_ENV === 'production' ? '/front_PharmaSurvy/' : '/',
    plugins: [
      ...plugins,
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: 'PharmaciEfficace - Plateforme de Gestion Pharmaceutique',
            description: 'Solution complète de gestion pharmaceutique pour les professionnels de santé.',
            favicon: '/favicon.ico',
            ogImage: '/android-chrome-512x512.png'
          }
        }
      })
    ],
    // Configuration des alias de chemins
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '~': path.resolve(__dirname, './public'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@context': path.resolve(__dirname, './src/context'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@lib': path.resolve(__dirname, './src/lib'),
        '@api': path.resolve(__dirname, './src/api'),
        '@store': path.resolve(__dirname, './src/store'),
        '@types': path.resolve(__dirname, './src/types'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    
    // Configuration du serveur de développement
    server: {
      port: 3001,
      strictPort: true,
      host: true,
      open: '/',
      cors: true,
      watch: {
        usePolling: true,
        ignored: ['**/node_modules/**', '**/.git/**'],
      },
      hmr: {
        overlay: true,
        port: 3002,
      },
    },
    
    // PostCSS configuration is handled by postcss.config.cjs
    
    
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'zod',
        'axios',
        'zustand',
        '@tanstack/react-query'
      ],
      exclude: ['lucide-react'],
      esbuildOptions: {
        // Options pour améliorer la compilation
        target: 'es2020',
        supported: { bigint: true },
      },
    },
    
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      target: 'es2020',
      minify: mode === 'production' ? 'terser' : false,
      sourcemap: mode !== 'production',
      assetsInlineLimit: 4096, // 4kb
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            const fileName = assetInfo.name || 'asset';
            const extMatch = fileName.split('.');
            let extType = extMatch.length > 1 ? extMatch[extMatch.length - 1] : 'other';
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'img';
            }
            return `assets/${extType}/[name]-[hash][extname]`;
          },
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            vendor: ['zod', 'axios', 'zustand'],
            ui: ['lucide-react', 'tailwind-merge', 'class-variance-authority', 'clsx'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    
    preview: {
      port: 3003,
      strictPort: true,
    },
    
    // Configuration pour le cache
    cacheDir: './.vite',
    
    // Configuration pour le mode développement
    define: {
      'process.env': {}
    },
  };
});
