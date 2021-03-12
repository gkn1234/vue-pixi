<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-03-12 13:24:48
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-12 18:23:48
-->
<template>
  <Container>
    <Rectangle :bdWidth="10" :bdColor="0xffffff" :bdTexture="texture" :bdTextureMatrix="matrix" :bdAlign="0.5"
      :bgTexture="texture" :bgTextureMatrix="matrix" :radius="10"
      :w="width" :h="108" 
      :x="200" :y="20" :anchorX="0.5" :anchorY="0.5"></Rectangle>
    <Ellipse :bdWidth="2" :bdColor="0xffffff"
      :bgTexture="texture" :bgTextureMatrix="matrix"
      :rw="96" :rh="54" 
      :x="200" :y="150"></Ellipse>

    <Rectangle
      :bdWidth="5" :bdColor="0xffffff"
      :bgColor="0x007aff" 
      :w="192" :h="108" 
      :x="200" :y="600"
      :anchorX="0.5" :anchorY="0.5"></Rectangle>
  </Container>
</template>

<script src="./GraphicView.js"></script>