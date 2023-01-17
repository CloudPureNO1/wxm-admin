import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// vite  svg  
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

import {
  createStyleImportPlugin,
  ElementPlusResolve,
} from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // element plus 按需引入
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // vite svg
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/components/icons/svg')],
      // svgoOptions: isBuild,
      // default
      symbolId: 'icon-[dir]-[name]',
    }),

    // 解决 按需引入时，ELMessage 和 ELLoading 找不到的
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name: string) => {
            return `element-plus/theme-chalk/${name}.css`
          },
        },
      ]
    }),
 
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  server: {
    host: '192.168.179.137',
    port: 9999,
    // 跨域配置
    // 默认地址  axios.defaults.baseURL = config.BASE_URL
    proxy: {
   
      '/api': {
        target: 'http://localhost:9701/wxmApi', //接口域名
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
 
    },
  },
})
