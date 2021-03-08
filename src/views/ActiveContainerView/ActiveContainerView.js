/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-09 09:43:37
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-08 19:16:27
 */
import { onMounted, reactive, ref } from 'vue'
import { Texture } from 'pixi.js'
import { ActiveContainer, Button, Tween, Strong } from '$vue-pixi'

export default {
  name: 'ActiveContainerView',
  components: {
    ActiveContainer,
    Button
  },
  setup () {
    const texture = Texture.WHITE

    let pos = reactive({
      x: 0,
      y: 0
    })

    const handler = (e) => {
      // console.log(e)
      const { x, y } = e.data.global
      
      //console.log(x, y)
      //pos.x = x; pos.y = y
    }

    return { texture, pos, handler }
  }
}