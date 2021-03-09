/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-03-05 18:57:06
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-09 16:23:43
 */
import { Texture, Point } from 'pixi.js'
import { computed, inject, ref } from 'vue'
import { AFFINE } from '$pixi-projection2d'

export default {
  name: 'ProjectionView',
  setup () {
    const game = inject('game')
    const { width, height } = game.$options
    const screen = { width, height, areaWidth: 800, areaHeight: 600 }

    const bigWhiteTexture = new Texture(Texture.WHITE.baseTexture)
    bigWhiteTexture.orig.width = 30
    bigWhiteTexture.orig.height = 30
    const textures = {
      white: bigWhiteTexture,
      plane: '/bg_plane.jpg',
      monster: '/flowerTop.png'
    }

    const { container, squareFarTint, dragSquareFarHandler } = containerController(screen)
    const { planeTint, dragPlaneHandler, dragBunnyHandler, planeAnimate } = planeController()

    return {
      screen, textures,
      container,
      squareFarTint, dragSquareFarHandler,
      planeTint, dragPlaneHandler, dragBunnyHandler, planeAnimate
    }
  }
}

// 容器逻辑
function containerController (screen) {
  let container = ref(null)
    
  // 容器透视控制
  let squareFarFactor = ref(1)
  // 控制顶部方块颜色变化
  let squareFarTint = computed(() => squareFarFactor.value ? '0xff0000' : '0x00ff00')

  // 记录按下鼠标的时间，用于判断点击事件
  let downTime = -Infinity
  // 拖拽顶部方块触发
  function dragSquareFarHandler ({ target, name }) {
    if (name === 'start' || name === 'dragMove') {
      // 刚刚完成触发时
      setAxisPoint(target.position)
    }

    // 间隔足够小判定为点击事件
    if (name === 'down') {
      downTime = Date.now()
    }
    if (name === 'up') {
      if (Date.now() - downTime < 200) {
        // 点击判定成立，改变投影透视模式
        squareFarFactor.value = 1 - squareFarFactor.value
        setAxisPoint(target.position)
      }
    }
  }

  // 计算透视点，并对容器进行透视投影变化
  function setAxisPoint (position) {
    /**
     * @warn container.toLocal在旋转屏幕时有BUG，所以手动计算相对坐标
     */
    let pos = new Point()
    pos.x = (-1) * (position.x - screen.width / 2)
    pos.y = (-1) * (position.y - screen.height)
    //console.log(position, pos)
    container.value.proj.setAxisY(pos, -squareFarFactor.value)
  }

  return {
    container,
    squareFarTint,
    dragSquareFarHandler
  }
}

function planeController () {
  // 飞机透视控制
  let isPlaneAffine = ref(1)
  // 飞机颜色控制
  let planeTint = computed(() => isPlaneAffine.value ? '0xff0000' : '0x00ff00')

  // 记录按下鼠标的时间，用于判断点击事件
  let downTime = -Infinity
  // 拖拽飞机触发
  function dragPlaneHandler ({ target, name }) {
    if (name === 'start') {
      // 刚刚完成触发时
      target.proj.affine = isPlaneAffine.value ? AFFINE.AXIS_X : AFFINE.NONE
    }

    // 间隔足够小判定为点击事件
    if (name === 'down') {
      downTime = Date.now()
    }
    if (name === 'up') {
      if (Date.now() - downTime < 200) {
        // 点击判定成立，改变投影透视模式
        isPlaneAffine.value = 1 - isPlaneAffine.value
        target.proj.affine = isPlaneAffine.value ? AFFINE.AXIS_X : AFFINE.NONE
      }
    }
  }

  // 拖拽兔子触发
  function dragBunnyHandler ({ target, name, e }) {
    if (name === 'dragStart') {
      // 阻止冒泡，防止飞机和兔子一起动
      e.stopPropagation()
    }
    if (name === 'dragEnd') {
      target.position.set(0)
    }
  }

  // 飞机旋转动画
  function planeAnimate (time, { el }) {
    el.rotation += 0.1
  }

  return {
    planeTint,
    dragPlaneHandler, dragBunnyHandler, planeAnimate
  }
}