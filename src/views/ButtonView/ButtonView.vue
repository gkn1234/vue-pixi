<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-09 09:43:29
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-03-09 13:25:12
-->
<template>
  <Container>
    <Button text="缩放特效"
      :x="150" :y="50" :w="150" :h="50"
      :bdColor="0xffffff" :bdWidth="3" :bgColor="0x007aff" :radius="10" 
      :hoverScale="scaleData.hover" :clickScale="scaleData.click"></Button>
    <Button :text="scaleData.txt" @up="scaleUpHandler"
      :x="400" :y="50" :w="150" :h="50"
      :bdColor="0xffffff" :bdWidth="3" :bgColor="0xff0000" :radius="10" 
      :hoverScale="1.2" :clickScale="0.95"></Button>
  </Container>
</template>

<script src="./ButtonView.js"></script>