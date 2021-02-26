/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-26 11:06:50
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-02-26 18:27:56
 */
const path = require('path')

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '@', replacement: path.join(__dirname, './src') },
      { find: /^\$(.*)/, replacement: path.join(__dirname, './packages/$1/src/index.js') }
    ]
  }
})