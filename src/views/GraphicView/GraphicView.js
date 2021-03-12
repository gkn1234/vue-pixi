/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-03-12 13:25:03
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-12 18:07:31
 */
import { Rectangle, Ellipse } from '$vue-pixi'
import { Texture, Matrix } from 'pixi.js'
import { reactive, ref } from 'vue'

export default {
  name: 'GraphicView',
  components: {
    Rectangle, Ellipse
  },
  setup () {
    const texture = Texture.from('/kldy.png')
    let matrix = reactive(new Matrix(0.29, 0, 0, 0.29, 0, 0))
    let width = ref(192)
    setTimeout(() => {
      //matrix.a = 0.5
      width.value *= 2
    }, 1000)
    setTimeout(() => {
      //matrix.a = 0.5
    }, 2000)

    return { texture, matrix, width }
  }
}