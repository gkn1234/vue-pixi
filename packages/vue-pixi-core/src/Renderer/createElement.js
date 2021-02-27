/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-01-29 11:17:24
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-02-27 11:00:21
 */
import {
  Container,
  Sprite,
  TilingSprite,
  Text,
  Graphics
} from 'pixi.js'

export default function getCreateElement () {
  const g = window || globalThis
  const PIXI = g.PIXI || null

  const elementList = {
    Container,
    Sprite,
    TilingSprite,
    Text,
    Graphics,
    // pixi-projection里面的元素
    Container2d: PIXI && PIXI.projection ? PIXI.projection.Container2d : Container,
    Sprite2d: PIXI && PIXI.projection ? PIXI.projection.Sprite2d : Sprite
  }

  return (type) => {
    const Creator = elementList[type] ? elementList[type] : Container
    return new Creator()
  }
}