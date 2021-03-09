/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-04 18:41:49
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-09 15:59:36
 */
import { useGraphicsProps, lineStyle, beginFill, useDraw } from '../../plugins/base.js'

export default {
  name: 'Ellipse',
  props: {
    // 通常属性同矩形，相关描述见Rectangle.js
    // 注意椭圆的anchor中心在圆心

    // 图形通用属性
    ...useGraphicsProps(),
    // 横向半径
    rw: { type: Number, default: 50 },
    // 纵向半径
    rh: { type: Number, default: 50 },
  },
  setup (props, { emit }) {
    // 重写draw重绘函数
    function draw (target) {
      if (!target) { return }
      target.clear()
      lineStyle(target, props.lineWidth, props.lineColor, props.lineTexture, props.lineAlpha, props.lineAlign)
      beginFill(target, props.fillColor, props.fillTexture, props.fillAlpha)
      target.drawEllipse(0, 0, props.rw, props.rh)
      // 重绘触发事件
      emit('draw', target, props)
      target.endFill()
    }

    // 激活重绘
    const { graphicsObj } = useDraw(draw)

    return { graphicsObj }
  }
}