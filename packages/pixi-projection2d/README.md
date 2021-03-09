<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-03-09 16:40:26
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-09 16:52:03
-->
`@cmgl/pixi-projection2d` is modified from the 2d-projection part in [pixi-projection](https://github.com/pixijs/pixi-projection) to support ESM module.

## Setup
`@cmgl/pixi-projection2d` is only avaliable in *ESM* environment. You can install with command

```
npm install @cmgl/pixi-projection2d
```

## Use
```js
import { Renderer } from 'pixi.js'
import { registerProjection, Sprite2d } from '@cmgl/pixi-projection2d'

// You must register first before use Projection2d
registerProjection(Renderer)

const sprite = new Sprite2d()
// ...
```

Get more detail from [pixi-projection](https://github.com/pixijs/pixi-projection)