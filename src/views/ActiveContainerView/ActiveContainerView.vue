<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-09 09:43:29
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-02-19 16:50:47
-->
<template>
  <Container>
    <ActiveContainer dragable :x="pos.x" :y="pos.y" @downmove="handler">
      <Sprite :texture="texture" :width="100" :height="100" :x="100" :y="100"></Sprite>
    </ActiveContainer>
    <Button :x="300" :y="300" :bdColor="0xffffff" :bdWidth="3" :bgColor="0x007aff" :radius="10" :text="12345" :hoverScale="1.2"></Button>
  </Container>
</template>

<script src="./ActiveContainerView.js"></script>