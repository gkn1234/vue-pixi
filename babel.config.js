/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-23 12:08:01
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-02-24 17:39:50
 */
// 写组件和库时的配置
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // 放置babel在rollup之前做完commonJS处理，导致rollup的一些处理失败
        modules: false,
      }
    ]
  ],
  plugins: [
    ['@babel/plugin-transform-runtime'],
    ['@babel/plugin-proposal-class-properties']
  ]
}