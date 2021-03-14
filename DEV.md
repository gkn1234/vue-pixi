<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-03-12 18:37:41
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-13 11:02:13
-->
# 2021-3-13
- `PIXI.Graphic` 的 `beiginTextureFill` 和 `lineTextureFill` 方法，因为WEBGL内核不同，在不同的浏览器上表现不一致，故使用 `Graphic` 时，一律只用纯色填充。`Texture` 一律用 `PIXI.Sprite` 显示。