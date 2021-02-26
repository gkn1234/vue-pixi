/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-01-29 20:15:18
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-02-09 10:48:05
 */
import vPon from './v-pon.js'
import vPshow from './v-pshow.js'
import vTicker from './v-ticker.js'

export default function bindDirectives (app, game) {
  if (!app || typeof app.directive !== 'function') {
    return
  }
  
  app.directive('pon', vPon())
  app.directive('pshow', vPshow())
  app.directive('ticker', vTicker(game))
}