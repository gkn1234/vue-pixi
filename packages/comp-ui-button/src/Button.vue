<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-07 17:23:29
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-02-19 16:51:22
-->
<template>
  <ActiveContainer ref="container"
    @over="overHandler"
    @out="outHandler"
    @up="upHandler"
    @down="downHandler"
    :pivotX="w / 2" :pivotY="h / 2">
    <slot name="bottom"></slot>
    <Rectangle v-if="rec"
      name="bgRec"
      :w="w" :h="h"
      :radius="radius"
      :lineWidth="bdWidth"
      :lineColor="bdColor"
      :lineAlpha="bdAlpha"
      :fillColor="bgColor"
      :fillAlpha="bgAlpha"></Rectangle>
    <slot name="center"></slot>
    <Sprite v-if="bgTexture"
      name="bgSprite"
      :width="w" :height="h"
      :texture="bgTexture"></Sprite>
    <Text name="text"
      :text="text"
      :x="w / 2 + offsetX" :y="h / 2 + offsetY"
      :anchorX="0.5" :anchorY="0.5"
      :style="textStyle"></Text>
    <slot></slot>
  </ActiveContainer>
</template>

<script src="./Button.js"></script>