<template lang="pug">
.cart
  keep-alive(exclude='cart-order')
    router-view
</template>

<script>
import Vue from 'vue'
import {
  Checkbox,
  InputNumber
} from 'element-ui'

Vue.use(Checkbox)
Vue.use(InputNumber)

export default {
  
}
</script>

<style scoped lang="less">
.cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: e('calc(100% - 32px)');
  min-height: 500px;

  @eColor: #ec6337;
}
</style>
