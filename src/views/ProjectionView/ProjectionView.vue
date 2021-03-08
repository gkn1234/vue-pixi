<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-03-05 18:56:55
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-08 19:44:24
-->
<template>
  <Container>
    <Container2d ref="container" :x="screen.width / 2" :y="screen.height">
      <Sprite2d ref="surface" :texture="textures.plane"
        :anchorX="0.5" :anchorY="1.0"
        :width="screen.areaWidth" :height="screen.areaHeight"></Sprite2d>
      <Sprite2d ref="squarePlane" v-drag="dragPlaneHandler"
        v-ticker="planeAnimate"
        :texture="textures.white"
        :anchorX="0.5" :anchorY="0" :tint="planeTint"
        :x="-screen.areaWidth / 4" :y="-screen.areaHeight / 2">
        <Sprite2d ref="bunny" :texture="textures.monster" v-drag="dragBunnyHandler"
          :anchorX="0.5" :anchorY="1">
        </Sprite2d>
      </Sprite2d>
    </Container2d>

    <Sprite ref="squareFar" v-drag="dragSquareFarHandler"
      :texture="textures.white"
      :x="screen.width / 2" :y="screen.height - screen.areaHeight + 50" :tint="squareFarTint"
      :anchorX="0.5" :anchorY="0.5"></Sprite>
  </Container>
</template>

<script src="./ProjectionView.js"></script>