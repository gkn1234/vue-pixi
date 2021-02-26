/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-07 19:25:43
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-02-12 14:37:54
 */
import { inject } from 'vue'

export default {
  name: 'ActiveContainer',
  props: {
    // 是否可以拖拽，注意该值设置为true时，会动态改变外层Container的位置，故此时不要手动对组件的x和y进行值的绑定
    dragable: { type: Boolean, default: false }
  },
  setup (props, { emit }) {
    // move事件是否被激活，只有先通过over事件才能激活
    let moveSignal = false
    // downmove事件是否被激活，只有先通过down事件才能激活
    let downmoveSignal = false

    // 拖拽手势
    const { dragDownHandler, dragMoveHandler, dragUpHandler } = dragable(props, emit)

    // @section 手势触发事件
    // 鼠标移入
    function overHandler (e) {
      //console.log('over', e, e.data.global.x, e.data.global.y)
      // 激活move事件
      moveSignal = true
      emit('over', e)
    }

    // 鼠标移出
    function outHandler (e) {
      //console.log('out', e, e.data.global.x, e.data.global.y)
      // 手势移出有效区，move以及downmove事件均失活
      moveSignal = false
      downmoveSignal = false
      emit('out', e)
    }

    // 手势在有效范围内按下
    function downHandler (e) {
      //console.log('down', e.currentTarget, e.data.global.x, e.data.global.y)
      // 激活downmove事件
      downmoveSignal = true
      emit('down', e)

      // 处理手势事件
      dragDownHandler(e)
    }

    // 手势在有效范围内松开
    function upHandler (e) {
      //console.log('up', e, e.data.global.x, e.data.global.y)
      // downmove事件失活
      downmoveSignal = false
      emit('up', e)

      // 处理手势事件
      dragUpHandler(e)
    }

    // 手势在有效范围外松开
    function upOutsideHandler (e) {
      //console.log('upOut', e, e.data.global.x, e.data.global.y)
      // downmove事件失活
      downmoveSignal = false
      emit('upOut', e)

      // 处理手势事件
      dragUpHandler(e)
    }

    // 手势移动
    function moveHandler (e) {
      if (moveSignal) {
        //console.log('move', e, e.data.global.x, e.data.global.y)
        // 只有在有效范围内才会触发move，因此需要先通过over事件激活
        emit('move', e)
        if (downmoveSignal) {
          // console.log('move', e, e.data.global.x, e.data.global.y)
          // 只有同时满足有效范围、以及手势按下两个条件才触发downmove，因此需要通过down事件激活
          emit('downmove', e)

        }
      }
      // 拖动手势不仅仅局限于有效范围内，否则会出现目标移动跟不上手势速度的情况
      dragMoveHandler(e)
    }

    // @section 通用方法

    return {
      overHandler, outHandler, downHandler, upHandler, upOutsideHandler, moveHandler
    }
  }
}

// 拖拽逻辑
function dragable (props, emit) {
  // 渲染目标的根节点容器，获取次容器是为了适配屏幕
  let rootContainer = inject('rootContainer')
  // 当前拖拽目标
  let target = null
  // 当前的手势id
  let id = null
  // 拖拽目标上一次触发事件的坐标
  let prevPos = null

  // 拖拽开始
  function start (e) {
    target = e.currentTarget
    id = e.data.identifier
    prevPos = rootContainer.toLocal(e.data.global)
    emit('dragstart', e)
  }
  // 拖拽停止
  function stop (e) {
    target = null
    id = null
    emit('dragend', e)
  }

  // 手势按下时拖拽逻辑处理
  function dragDownHandler (e) {
    if (!props.dragable) { return }
    // 如果当前拖拽目标还没指定，则立即绑定拖拽对象
    if (!target) {
      start(e)
    }
  }

  // 手势移动时拖拽逻辑处理
  function dragMoveHandler (e) {
    if (!props.dragable) {
      // 如果在拖拽过程中中断拖拽，当前手势会直接失效
      if (target && e.data.identifier === id) { stop(e) }
      return
    }
    if (e.data.identifier !== id) {
      // 免除多点触控对拖拽的干扰
      return
    }
    /**
     * 这里把全局坐标转换为容器相对坐标后再进行计算
     * 因为屏幕适配涉及到旋转舞台，按照全局坐标计算无法实现拖拽
     */
    const pos = rootContainer.toLocal(e.data.global)
    const dx = pos.x - prevPos.x
    const dy = pos.y - prevPos.y
    // 及时更新上一次触发事件的坐标
    prevPos = pos
    target.x = target.x + dx
    target.y = target.y + dy
    emit('drag', e)
  }

  // 手势抬起时拖拽逻辑的处理
  function dragUpHandler (e) {
    // 直接使当前拖拽手势失效
    if (e.data.identifier === id && target) { stop(e) }
  }

  return { dragDownHandler, dragMoveHandler, dragUpHandler }
}

// 拖放逻辑


// 滑动监听逻辑