/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-03-08 14:43:15
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-08 16:21:46
 */
import { Texture } from 'pixi.js'
import { inject } from 'vue'

export default {
  name: 'DragView',
  setup () {
    const texture = Texture.WHITE
    const game = inject('game')
    const { width, height } = game.$options

    // 不允许超出屏幕范围规定的矩形
    const dragLimitHandler = (obj, data) => {
      if (obj.name === 'dragMoveBefore') {
        const target = obj.target
        let { dx, dy } = data
        let isLimit = false
        if (target.x + dx < 0) {
          dx = 0 - target.x
          isLimit = true
        }
        if (target.x + target.width + dx > width) {
          dx = width - target.x - target.width
          isLimit = true
        }
        if (target.y + dy < 0) {
          dy = 0 - target.y
          isLimit = true
        }
        if (target.y + target.height + dy > height) {
          dy = height - target.y - target.height
          isLimit = true
        }

        if (isLimit) {
          obj.move(dx, dy)
          return false
        }
      }
    }

    return {
      texture, dragLimitHandler
    }
  }
}