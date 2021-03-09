/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-09 09:43:37
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-09 13:29:04
 */
import { Button } from '$vue-pixi'
import { computed, reactive, ref } from 'vue'

export default {
  name: 'ButtonView',
  components: {
    Button
  },
  setup () {
    const { scaleData, scaleUpHandler } = triggerScale()
    return {
      scaleData, scaleUpHandler
    }
  }
}

function triggerScale () {
  const scaleRatio = {
    hover: 1.2,
    click: 0.95
  }
  let enabled = ref(true)
  let scaleData = computed(() => {
    if (enabled.value) {
      return {
        txt: '禁止缩放',
        hover: scaleRatio.hover,
        click: scaleRatio.click
      }
    }
    return {
      txt: '开启缩放',
      hover: null,
      click: null
    }
  })

  function scaleUpHandler () {
    enabled.value = !enabled.value
  }

  setTimeout(() => {
    scaleUpHandler()
  }, 2000)

  return {
    scaleData, scaleUpHandler
  }
}