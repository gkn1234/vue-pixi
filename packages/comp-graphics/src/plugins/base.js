/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-03-09 15:27:40
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-09 16:28:48
 */
import { Texture } from 'pixi.js'
import { ref, watchEffect, onMounted, onBeforeUnmount } from 'vue'

export function useGraphicsProps () {
  return {
    // 线的宽度
    lineWidth: { type: Number, default: 0 },
    // 线的颜色
    lineColor: { type: [String, Number], default: 0 },
    // 线的透明度
    lineAlpha: { type: Number, default: 1 },
    // 线段的填充纹理
    lineTexture: { type: Texture, default: null },
    // 线段的对齐方式(0 = 内部，0.5 = 居中，1 = 外部)
    lineAlign: { type: Number, default: 1 },
    // 内部填充颜色
    fillColor: { type: [String, Number], default: 0 },
    // 内部填充透明度
    fillAlpha: { type: Number, default: 1 },
    // 内部填充纹理
    fillTexture: { type: Texture, default: null },
  }
}

/**
 * 画图的基础方法
 */
// 指定线的样式
export function lineStyle (target, width, color, texture, alpha, align) {
  // 根据color和texture的值确定是颜色填充还是纹理填充，texture不为null即为纹理填充
  if (texture && texture instanceof Texture) {
    target.lineTextureStyle({
      width, texture, color, alpha,
      alignment: align
    })
  }
  else {
    target.lineStyle(width, color, alpha, align)
  }
}
// 指定填充样式
export function beginFill (target, color, texture, alpha) {
  // 根据color和texture的值确定是颜色填充还是纹理填充，texture不为null即为纹理填充
  if (texture && texture instanceof Texture) {
    target.beginTextureFill({ texture, color, alpha })
  }
  else {
    target.beginFill(color, alpha)
  }
}

/**
 * 图形组件都是检测到属性变化后，通过重绘实现，这里是在确定了不同的重绘方法后，实现重绘注册逻辑
 * @param {Function} draw 重写的画图方法，
 */
export function useDraw (draw) {  
  // 图形对象
  const graphicsObj = ref(null)

  watchEffect(() => {
    draw(graphicsObj.value)
  })

  // 不再需要onMounted，因为当元素挂载后，graphicsObj.value的改变会再次触发watchEffect中的draw方法
  /*
  onMounted(() => {
    draw(graphicsObj.value)
  })
  */

  onBeforeUnmount(() => {
    // 请注意，由于图形可以与其他实例共享GraphicsGeometry。有必要调用destroy() 来正确地解除对底层GraphicsGeometry的引用并避免内存泄漏。或者，继续使用相同的Graphics实例，并在重绘之间调用 clear()。
    // 防止内存泄漏的操作
    graphicsObj.value.destroy()
  })

  return { graphicsObj }
}
/**
 * function draw () {}
 * draw方法的参数说明
 * @param {PIXI.DisplayObject} target 有效的PIXI显示对象
 */