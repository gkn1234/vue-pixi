<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-03-08 14:43:22
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-08 16:19:28
-->
<template>
  <Container>
    <Container v-drag="dragLimitHandler" :x="100" :y="100">
      <Sprite :texture="texture" :width="400" :height="150"></Sprite>
      <Text text="不能拖出屏幕"></Text>     
    </Container>

    <Container v-drag :x="150" :y="400">
      <Sprite :texture="texture" :width="400" :height="150"></Sprite>
      <Text text="能拖出屏幕"></Text>     
    </Container>
  </Container>
</template>

<script src="./DragView.js"></script>