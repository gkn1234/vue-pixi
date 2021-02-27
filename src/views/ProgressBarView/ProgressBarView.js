/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-06 10:35:07
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-02-27 10:55:05
 */
import { reactive, ref, inject, onMounted, onUnmounted } from 'vue'
import { ProgressBar } from '$vue-pixi'

export default {
  name: 'ProgressBarView',
  components: {
    ProgressBar
  },
  setup () {
    const game = inject('game')


    // 纹理进度条
    const textureBar = reactive({
      background: '/img/outer.png',
      progress: '/img/inner.png'
    })

    // 进度条数据
    const { progress, progressFoward } = progressForward()

    return {
      textureBar,
      progress, progressFoward
    }
  }
}

// 进度前进逻辑
function progressForward () {
  const game = inject('game')
  let progress = ref(0)
  // 每一帧前进1
  function progressFoward (time, ticker, stop) {
    //console.log(time, ticker)
    if (progress.value < 100) {
      progress.value = progress.value + 1
    }
    else {
      stop()
    }
  }

  return { progress, progressFoward }
}