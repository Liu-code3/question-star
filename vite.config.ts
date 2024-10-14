import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { visualizer } from 'rollup-plugin-visualizer' // 打包查看包信息

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const envConfig = loadEnv(mode, './')

  return {
    plugins: [
      react(),
      UnoCSS()
    ],
    // 配置路径别名
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: Number(envConfig.VITE_PORT) || 3000,
      proxy: {
        '/api': {
          target: envConfig.VITE_API_BASEURL,
          changeOrigin: true,
          // rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      rollupOptions: {
        plugins: [
          // 打包分析
          visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true,
          }),
        ],
      },
    }
  }
})
