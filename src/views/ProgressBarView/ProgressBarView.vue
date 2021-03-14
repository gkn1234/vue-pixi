<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-06 10:34:58
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-13 11:08:10
-->
<template>
  <Container v-ticker="progressFoward">
    <ProgressBar :x="100" :y="100" :w="500" :h="68" :radius="30"
      :bdColor="0xffffff" :bdWidth="3" :bgAlpha="0" :progressColor="0x007aff"
      :progress="progress"></ProgressBar>
    <ProgressBar :x="100" :y="200" :w="500" :h="68" :radius="30" :progressScaleX="1702 / 1809" :progressScaleY="166 / 246"
      :progress="progress" 
      :progressTexture="textureBar.progress" 
      :backgroundTexture="textureBar.background"></ProgressBar>
  </Container>
</template>

<script src="./ProgressBarView.js"></script>