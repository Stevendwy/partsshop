<template>
  <div class="person">
    <div class="title">
      <span>我的{{theme.application}}</span>
      <span>{{userInfo.username}}</span>
      <span>
        账户余额:
        <span v-if="displayBalance">{{totalBalance}}</span>
        <span v-else @click="displayBalance = true">显示余额</span>
      </span>
      <el-button class="t-withdraw" type='primary' @click="withdraw">申请提现</el-button>
    </div>
    <div class="content">
      <p-menu />
      <div class="c-route">
        <router-view :balance="balance" @reBalance="aBalance"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import pMenu from './menu/menu.vue'
import Vuex from 'vuex'

export default {
  components: {
    pMenu
  },
  data() {
    return {
      displayBalance: false, // 不显示余额
      balance: {}, // 账户信息
    }
  },
  computed: {
    ...Vuex.mapState(['userInfo', 'theme']),
    totalBalance() {
      return '¥' + (this.balance.total_balance || '')
    }
  },
  mounted() {
    this.aBalance()
    this.updateNSP({path: '/person'})
  },
  methods: {
    ...Vuex.mapMutations(['updateNSP']),
    withdraw() {
      this.$router.push('/person/withdraw')
    },
    aBalance() {
      axios.get('/account/balance/detail')
        .then(res => {
          this.balance = res.data.data
        })
    },
  }
}
</script>

<style scoped lang="less">
.person {
  height: e('calc(100% - 30px)');

  .title {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 88px;
    box-sizing: border-box;
    padding: 0 e('calc(50% - 512px)');    
    background: white;
    box-shadow: 0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24);
    font-size: 14px;
    z-index: 2;

    &>span:nth-child(1) {
      margin-left: 40px;
      font-size: 20px;
      color: #ED6A40;
    }

    span:nth-child(2) {
      margin-left: 100px;
    }

    span:nth-child(3) {
      margin-left: 20px;

      &>span:nth-child(1) {
        margin-left: 10px;
        color: #ED6A40;
        cursor: pointer;
      }
    }

    .t-withdraw {
      margin-left: 20px;
    }
  }

  .content {
    display: flex;
    width: 100%;
    min-height: e('calc(100% - 88px)');
    padding: 0 e('calc(50% - 512px)');

    .c-route {
      width: 824px;
      min-height: 100%;
      background: white;
    }
  }
}
</style>
