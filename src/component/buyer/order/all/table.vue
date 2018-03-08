<template>
  <div class="table">
    <div class="header">
      <div class="h-item" v-once
        v-for="(title, index) in headerTitles" :key="index">
        {{title}}
      </div>
    </div>
    <div class="orders">
      <div class="order-container"
        v-for="(order, oIndex) in orders" :key="oIndex">
        <pay-order
          v-if="order.status === 'created'"
          type="all"
          :order="order"/>
        <send-order
          v-else-if="order.status === 'paid'"
          type="all"
          :order="order"/>
        <get-order
          v-else-if="order.status === 'sent'"
          type="all"
          :order="order"/>
        <sign-order
          v-else-if="order.status === 'received'"
          type="all"
          :order="order"/>
        <close-order
          v-else-if="order.status === 'closed'"
          type="all"
          :order="order"/>
      </div>
    </div>
  </div>
</template>

<script>
import payOrder from '../pay/order.vue'
import sendOrder from '../send/order.vue'
import getOrder from '../get/order.vue'
import signOrder from '../sign/order.vue'
import closeOrder from '../close/order.vue'
import Vuex from 'vuex'

export default {
  props: ['orders', 'type'],
  components: {
    payOrder,
    sendOrder,
    getOrder,
    signOrder,
    closeOrder
  },
  data() {
    return {
      headerTitles: ['零件号、名称', '单价（元）', '数量', '总金额（元）', '订单状态', '交易操作', '其他']
    }
  },
  computed: {
    
  },
  methods: {
    ...Vuex.mapActions('buyer', ['aDetail', 'handleOrder']),
    openDetail(order) {
      this.aDetail({order_id: order.order_id})
        .then(() => this.$router.push('/buyer/detail'))
    },
    pay() {
      this.$message('此功能暂未开通...')
    },
    close(order) {
      this.handleOrder({order_id: order.order_id, status: this.type})
    },
    complaint() {
      this.$message('此功能暂未开通...')
    },
    orderStatus(status) {
      let statusStr = '其他'
      switch(status) {
        case 'closed': statusStr = '已关闭'
        break
        case 'created': statusStr = '等待买家付款'
        break
        case 'paid': statusStr = '等待卖家发货'
        break
        case 'sent': statusStr = '等待买家签收'
        break
        default: 
      }
      return statusStr
    }
  }
}
</script>

<style scoped lang="less">
.table {
  width: 100%;
  height: e('calc(100% - 64px)');

  @d8line: 1px solid #d8d8d8;

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #999;

    &:nth-child(1) {
      width: 150px;
    }
    &:nth-child(2) {
      width: 150px;
    }
    &:nth-child(3) {
      width: 50px;
    }
    &:nth-child(4) {
      width: 150px;
    }
    &:nth-child(5) {
      width: 150px;
    }
    &:nth-child(6) {
      width: 100px;
    }
    &:nth-child(7) {
      width: 54px;
    }
  }

  .header {
    display: flex;
    align-items: center;
    width: 804px;
    height: 32px;
    background-color: #f8f8f8;

    .h-item {
      .item;
    }
  }

  .orders {
    width: 100%;
    height: e('calc(100% - 42px)');
    overflow-y: scroll;
    overflow-x: hidden;
  }
}
</style>