/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-04 18:41:49
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-02-26 17:44:39
 */
import { watchEffect } from 'vue'
import { graphicsProps, graphics } from '@cmgl/rectangle'

export default {
  name: 'Ellipse',
  props: {
    // 通常属性同矩形，相关描述见Rectangle.js
    // 注意椭圆的anchor中心在圆心

    // 图形通用属性
    ...graphicsProps(),
    // 横向半径
    rw: { type: Number, default: 50 },
    // 纵向半径
    rh: { type: Number, default: 50 },
  },
  setup (props, { emit }) {
    let graphicsUtils = graphics()
    let { graphicsObj, lineStyle, beginFill } = graphicsUtils

    // 重写draw重绘函数
    graphicsUtils.draw = () => {
      const target = graphicsObj.value
      if (!target) { return }

      target.clear()
      lineStyle(target, props.lineWidth, props.lineColor, props.lineTexture, props.lineAlpha, props.lineAlign)
      beginFill(target, props.fillColor, props.fillTexture, props.fillAlpha)
      target.drawEllipse(0, 0, props.rw, props.rh)
      // 重绘触发事件
      emit('draw', target, props)
      target.endFill()
    }

    // watchEffect第一次执行会收集依赖，所以必须放在draw重写后，不能放在公共逻辑中
    watchEffect(() => {
      graphicsUtils.draw()
    })

    return { graphicsObj }
  }
}