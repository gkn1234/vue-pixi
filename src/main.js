/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-26 11:06:50
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-02-26 18:23:09
 */
import { Game } from '$vue-pixi'
import App from '@/App.vue'

const game = new Game({
  pixiOptions: {
    // 抗锯齿
    antialias: true,
    autoDensity: true,
    resolution: 2,
    powerPreference: 'high-performance'
  }
})

game.onLandscape(() => {
  if (Game.isMobile()) {
    // 移动端横屏适配
    game.resetStage()
    game.fixFull()
  }
  else {
    // PC端横屏适配
    game.fixWidth()    
  }
})
game.onPortrait(() => {
  if (Game.isMobile()) {
    // 移动端竖屏适配
    game.rotateStage()
    game.fixFull()
  }
  else {
    // PC端竖屏适配
    game.fixWidth()
  }
})

game.mount('#app').pixiRender(App, null, false)

console.log(game)