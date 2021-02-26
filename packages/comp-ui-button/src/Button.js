/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-07 17:23:35
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-02-26 18:29:47
 */
import { ref, reactive, computed, watchEffect } from 'vue'
import { Texture } from 'pixi.js'

import { Tween } from '@cmgl/tween'

import { ActiveContainer } from '@cmgl/active-container'
import { Rectangle } from '@cmgl/rectangle'

export default {
  name: 'Button',
  components: {
    ActiveContainer,
    Rectangle
  },
  props: {
    // 按键宽度
    w: { type: Number, default: 100 },
    // 按键高度
    h: { type: Number, default: 50 },

    // 底部矩形配置相关
    // 是否显示底部矩形
    rec: { type: Boolean, default: true },
    // 边框颜色
    bdColor: { type: [String, Number], default: 0 },
    // 边框宽度
    bdWidth: { type: Number, default: 0 },
    // 边框透明度
    bdAlpha: { type: Number, default: 1 },
    // 背景颜色
    bgColor: { type: [String, Number], default: 0 },
    // 背景透明度
    bgAlpha: { type: Number, default: 1 },
    // 进度条矩形的圆角
    radius: { type: Number, default: 0 },

    // 中部Sprite配置相关
    bgTexture: { type: [Texture, String], default: null },

    // 顶部Text配置相关
    // 文字
    text: { type: String, default: '' },
    // 字号
    textSize: { type: Number, default: 24 },
    // 颜色
    textColor: { type: [Number, String], default: 0xffffff },
    // 其他样式配置
    textOptions: { type: Object, default () { return {} } },
    // 文字默认居中，offset设定偏移量，右正左负
    offsetX: { type: Number, default: 0 },
    offsetY: { type: Number, default: 0 },
    
    // @section 特效区
    // 鼠标悬停特效，放大倍率
    hoverScale: { type: Number, default: null },
    // 鼠标悬停放大倍率特效时间
    hoverScaleDuration: { type: Number, default: 100 },
  },
  setup (props, { emit }) {
    const { textStyle } = useText(props)

    // 事件触发
    const { container, overHandler, outHandler, downHandler, upHandler } = handlers(props, emit)

    return {
      textStyle,
      container,
      overHandler, outHandler, downHandler, upHandler
    }
  }
}

// 字体样式逻辑
function useText (props) {
  let textStyle = reactive({})

  // 初始化字体样式，后续动态更新
  watchEffect(() => {
    textStyle.fill = props.textColor
    textStyle.fontSize = props.textSize
    Object.assign(textStyle, props.textOptions)
  })

  return textStyle
}

// 事件触发逻辑
function handlers (props, emit) {
  // 容器对象
  let container = ref(null)

  // 按键放大特效
  const { triggerScaleTween } = hoverScaleEffect(container, props)

  // 鼠标移入
  function overHandler (e) {
    // console.log('over', e)
    // 特效处理
    triggerScaleTween.over()

    emit('over', e)
  }

  function outHandler (e) {
    // console.log('out', e)
    // 特效处理
    triggerScaleTween.out()

    emit('out', e)
  }

  // 鼠标按下
  function downHandler (e) {
    // console.log('down', e, e.currentTarget)
    emit('down', e)
  }

  // 鼠标抬起
  function upHandler (e) {
    // console.log('up', e)
    emit('up', e)
  }

  return {
    container,
    overHandler, outHandler, downHandler, upHandler
  }
}

// 鼠标悬停放大特效
function hoverScaleEffect (container, props) {
  // 按键放大动画对象
  let scaleTween = new Tween()
  // 按键放大动画是否有效
  let isScaleTweenEnabled = computed(() => { return props.hoverScale !== null && props.hoverScale > 0 && props.hoverScale !== Infinity })

  // 特效钩子
  const triggerScaleTween = {
    // 鼠标移入
    over () {
      if (isScaleTweenEnabled) {
        if (!scaleTween.getEl()) {
          initScaleTween()
        }
        else {
          scaleTween.tween.reversed(false)
        }
      }      
    },
    out () {
      // 鼠标移出
      if (isScaleTweenEnabled) {
        scaleTween.tween.reversed(true)
      }
    }
  }

  // 初始化按键放大动画
  function initScaleTween () {
    const el = container.value.$el
    scaleTween.on(el.scale)
      .duration(props.hoverScaleDuration)
      .ani(null, { x: props.hoverScale, y: props.hoverScale })
      .exec()
  }

  return { triggerScaleTween }
}