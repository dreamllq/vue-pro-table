import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    vueJsx(),
    cssInjectedByJsPlugin()
  ],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  esbuild: { drop: ['console', 'debugger'] },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'LcVueProTable',
      fileName: 'index'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        'vue',
        'lodash',
        'uuid',
        'moment',
        'rxjs',
        '@vueuse/core',
        'vuedraggable',
        '@element-plus/icons',
        'ag-grid-vue3',
        '@vueuse/shared',
        'element-plus',
        'ag-grid-community/styles/ag-grid.css',
        'ag-grid-community/styles/ag-theme-alpine.css'
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          uuid: 'uuid',
          lodash: '_',
          'moment': 'moment',
          'rxjs': 'rxjs',
          '@vueuse/core': '@vueuse/core',
          'vuedraggable': 'vuedraggable',
          '@element-plus/icons': '@element-plus/icons',
          'ag-grid-vue3': 'ag-grid-vue3',
          '@vueuse/shared': '@vueuse/shared',
          'element-plus': 'element-plus'
        },
        exports: 'named'
      }
    }
  }
});
