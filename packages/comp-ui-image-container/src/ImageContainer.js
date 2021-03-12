/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-03-12 14:33:25
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-12 15:05:59
 */
import { HORIZONTAL_MODE, VERTICAL_MODE, FIX_MODE } from './plugins/base.js'
import { Texture } from 'pixi.js'

// 图片容器
export default {
  name: 'ImageContainer',
  components: {

  },
  props: {
    // 容器的宽高，图片不可能超出这个范围
    w: { type: Number, default: 100 },
    h: { type: Number, default: 100 },
    // 图片地址或纹理
    src: {
      type: [Texture, String],
      default: null
    },
    /**
     * 容器的内边距，格式同CSS，顺序 上 右 下 左
     * @example 10 / [10] 相当于四个边距都是10
     * @example [10, 20] 相当于上右边距为10， 下左边距为20
     * @example [10, 20, 30] 相当于上右边距为10， 下边距为20，左边距为30
     * @example [10, 20, 30, 40] 相当于上边距为10， 右边距为20，下边距为30，左边距为40
     */
    paddings: {
      type: [Number, Array],
      default: 0
    },
    // 水平位置
    horizontal: { 
      type: String, 
      default: HORIZONTAL_MODE.center, 
      validator: val => Object.values(HORIZONTAL_MODE).indexOf(val) >= 0
    },
    // 垂直位置
    vertical: { 
      type: String, 
      default: VERTICAL_MODE.center, 
      validator: val => Object.values(VERTICAL_MODE).indexOf(val) >= 0
    },
    // 图片能被容器完全包含时，是否强制适配容器
    forceFix: { type: Boolean, default: false },
    // 适配容器的方式，高度优先适配，宽度优先适配，全填充适配
    fixMode: {
      type: String, 
      default: FIX_MODE.fixHeight, 
      validator: val => Object.values(FIX_MODE).indexOf(val) >= 0
    }
  },
  setup (props) {

  }
}