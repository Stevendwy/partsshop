<template>
  <div class="order">
    <div>
      <o-address />
      <div class="o-content">
        <o-list
          :orders="ordersData.order_data"/>
      </div>
    </div>
    <div class="o-footer">
      <el-button type="text" class="of-back" v-once
        @click="back">返回购物车</el-button>
      <div class="of-total">
        <span>应付总额(不含运费):<span class="money">¥{{ordersData.total_money}}</span></span>
        <el-button type="primary" v-once
          @click="submit">提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import oAddress from './address/address.vue'
import oList from './list/list.vue'
import Vuex from 'vuex'

export default {
  name: 'cart-order',
  data() {
    return {
      
    }
  },
  components: {
    oAddress,
    oList
  },
  mounted() {
    this.aList()
      .then(() => {
        if(this.ordersData && this.ordersData.order_data.length < 1) {
          this.$message({
            message: '你有一个未完成订单，请及时支付。',
            type: 'warning'
          })
          this.$router.push('/buyer/pay')
          this.updateNSP({path: '/buyer'})
        }
      })
  },
  beforeDestroy() {
    this.clearOD() // 退出时候清空数据
  },
  computed: {
    ...Vuex.mapState(['naviSelectedPath']),
    ...Vuex.mapState('cart/order', ['ordersData', 'addr_id'])
  },
  methods: {
    ...Vuex.mapMutations(['updateNSP']),
    ...Vuex.mapMutations(['updateBadgeCount']),
    ...Vuex.mapMutations('cart/order', ['clearOD']),
    ...Vuex.mapActions('cart/order', ['aList', 'submitOrders']),
    back() {
      this.$router.history.go(-1)
    },
    submit() {
      if(!this.addr_id || this.addr_id.length < 1) {
        this.$message({
          message: '请填写地址收货',
          type: 'error'
        })
        return
      }
      this.submitOrders()
        .then(res => this.goPay({order: res}))
    },
    goPay({order}) {
      this.updateBadgeCount({badgeCount: 0}) // 清空购物车角标
      this.$router.push({path: '/pay', name: 'pay', params: {order}})
    }
  }
}
</script>

<style scoped lang="less">
.order {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;

  @eColor: #ec6337;

  .o-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 10px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .o-footer {
    display: flex;
    justify-content: space-between;
    width: 1024px;
    background-color: white;

    .of-back {
      margin-left: 10px;
    }

    .of-total {
      display: flex;
      align-items: center;
      margin-right: 10px;
      font-size: 14px;
      color: #333;

      .money {
        color: @eColor;
        margin-left: 4px;
      }

      .el-button {
        padding: 10px 20px;
      }
    }
  }
}
</style>
