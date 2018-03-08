<template>
  <div class="seller-container">
    <div class="title-container">
      <div class="title">
        <!-- <span class="t-name">{{theme.application}}卖家中心</span> -->
        <span class="t-name">小麦汽配卖家中心</span>
        <span class="t-company">{{userInfo.company}}</span>
        <span class="t-hub" v-once
          @click="hub">库存管理</span>
      </div>
    </div>
    <div class="seller">
      <b-menu />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import bMenu from './menu/menu.vue'
import Vue from 'vue'
import Vuex from 'vuex'

import {
  Menu,
  Submenu,
  MenuItem
} from 'element-ui'

Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)

export default {
  components: {
    bMenu
  },
  mounted() {
    this.aUserInfo()
    this.aExpresses()
  },
  computed: {
    ...Vuex.mapState(['userInfo', 'theme'])
  },
  methods: {
    ...Vuex.mapActions(['aUserInfo']),
    ...Vuex.mapActions('seller', ['aExpresses']),
    hub() {
      this.$router.push('/hub')
    }
  }
}
</script>

<style scoped lang="less">
.seller-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: e('calc(100% - 32px)');

  .title-container {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: white;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.24);
    border-radius: 2px;
    z-index: 2;

    .title {
      position: relative;
      display: flex;
      align-items: center;
      width: 1024px;
      height: 60px;

      .t-name {
        font-size: 20px;
        color: #0076ff;
        margin: 0 50px 0 20px;
      }

      .t-company {
        font-size: 14px;
        color: #333;
      }

      .t-hub {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70px;
        height: 32px;
        margin-left: 40px;
        font-size: 14px;
        color: #333;
        border: 1px solid #20a0ff;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }

  .seller {
    display: flex;
    width: 100%;
    height: e('calc(100% - 60px)');
    overflow-x: hidden;
    overflow-y: scroll;
  }
}
</style>