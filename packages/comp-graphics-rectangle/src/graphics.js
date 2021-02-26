/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-05 10:26:46
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-02-12 15:17:16
 */
import { Texture } from 'pixi.js'
import { ref, onMounted, onBeforeUnmount } from 'vue'

export function graphicsProps () {
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

export function graphics () {
  // 图形对象体
  let graphicsObj = ref(null)

  // 指定线的样式
  function lineStyle (target, width, color, texture, alpha, align) {
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
  function beginFill (target, color, texture, alpha) {
    // 根据color和texture的值确定是颜色填充还是纹理填充，texture不为null即为纹理填充
    if (texture && texture instanceof Texture) {
      target.beginTextureFill({ texture, color, alpha })
    }
    else {
      target.beginFill(color, alpha)
    }
  }

  // 重绘函数，需要重写
  function draw () {}

  const output = { graphicsObj, lineStyle, beginFill, draw }

  onMounted(() => {
    output.draw()
  })

  onBeforeUnmount(() => {
    // 请注意，由于图形可以与其他实例共享GraphicsGeometry。有必要调用destroy() 来正确地解除对底层GraphicsGeometry的引用并避免内存泄漏。或者，继续使用相同的Graphics实例，并在重绘之间调用 clear()。
    // 防止内存泄漏的操作
    graphicsObj.value.destroy()
  })

  return output
}