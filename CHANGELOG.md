<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-03-04 12:02:23
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-09 16:39:35
-->
# 1.0.4 (2021-3-9)
## 功能新增
- 将 [pixi-projection](https://github.com/pixijs/pixi-projection) 中的 `Projection2d` 模块移植为esm版本，添加入本库 `@cmgl/pixi-projection2d`，使得 `pixi-projection` 不再会以 `PIXI` 变量污染全局作用域。
- 新增了手势库 `@cmgl/pixi-gesture`。
- 以手势库 `@cmgl/pixi-gesture` 为基础给 `@cmgl/vue-pixi-core` 拓展了 `v-gesture` 以及 `v-drag` 指令，取代了原先的 `@cmgl/active-container` 组件(将被废弃)。
- `@cmgl/button` 新增点击缩放特效，并且优化了代码结构，开放了通用的hooks。
- 新增 `@cmgl/graphic` 整合了原先的 `@cmgl/ellipse` 和 `@cmgl/rectangle` (两者将被废弃)。新的 `@cmgl/graphic` 的代码经过了结构优化，开放了通用的hooks。

# 1.0.3 (2021-3-4)
1.0.2版本发布前没打包导致错误。

# 1.0.2 (2021-3-4)
## BUG修复
- 修改了@cmgl/tween，当动画名为字符串时报错的BUG。
## 功能调整
- 为了配合@cmjs/utils-validator的修改，修改了@cmgl/vue-pixi-core，gameOptionsValidator将初始化options将采用默认参数。