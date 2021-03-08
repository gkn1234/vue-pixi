<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-07 19:25:34
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-02-10 14:52:29
-->
<template>
  <Container ref="activeContainer"
    v-pon:pointerover="overHandler"
    v-pon:pointerout="outHandler"
    v-pon:pointerdown="downHandler"
    v-pon:pointerup="upHandler"
    v-pon:pointerupoutside="upOutsideHandler"
    v-pon:pointermove="moveHandler">
    <slot></slot>
  </Container>
</template>

<script src="./ActiveContainer.js"></script>