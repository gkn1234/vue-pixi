/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-04 18:42:05
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-09 16:29:15
 */
import { useGraphicsProps, lineStyle, beginFill, useDraw } from '../../plugins/base.js'

export default {
  name: 'Rectangle',
  props: {
    /* 
      注意，Graphics只是一个画板，并非一个图形对象
      anchorX和anchorY无效果，Graphics没有这个属性。**矩形的anchor中心在左上角顶点**。
      width和height只能对画板起到整体缩放的效果，并不能实际决定图形的尺寸。因此动态改变图像的尺寸通过重绘实现，性能可能不佳
    */
    /* 基础属性通过Attribute继承了  */
    
    // 图形通用属性
    ...useGraphicsProps(),
    // 矩形的宽高，不仅仅是缩放效果，会引起面板重绘的真实宽高
    w: { type: Number, default: 100 },
    h: { type: Number, default: 100 },
    // 矩形的圆角
    radius: { type: Number, default: 0 }
  },
  setup (props, { emit }) {
    // 重写draw重绘函数
    function draw (target) {
      if (!target) { return }
      target.clear()
      lineStyle(target, props.lineWidth, props.lineColor, props.lineTexture, props.lineAlpha, props.lineAlign)
      beginFill(target, props.fillColor, props.fillTexture, props.fillAlpha)
      // 根据圆角大小决定是画普通矩形或者圆角矩形
      target.drawRoundedRect(0, 0, props.w, props.h, props.radius)
      // 重绘触发事件
      emit('draw', target, props)
      target.endFill()
    }

    // 激活重绘
    const { graphicsObj } = useDraw(draw)

    return { graphicsObj }
  }
}