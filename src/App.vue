<!--
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-05 15:37:17
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-02-26 18:19:21
-->
<template>
  <Container>
    <Text text="hello world"></Text>
    <component :is="curView"></component>
  </Container>
</template>

<script src="./App.js"></script>
