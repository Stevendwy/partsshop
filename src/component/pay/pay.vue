<template>
  <div class="pay">
    <div class="order-info">
      <div class="oi-items-container">
        <div class="oi-items"
          v-for="(item, index) in items" :key="index">
          <div class="oi-title">订单信息{{index + 1}}:</div>
          <div class="oi-item-container">
            <div class="oi-item">{{item}}</div>
          </div>
        </div>
      </div>
      <span class="money"
        v-if="info.money">¥{{info.money}}</span>
    </div>
    <o-type
      v-if="order"
      :od="order"
      :payType="payType"
      @updatePayType="updatePayType"/>
    <component
      :order="order || {}"
      :is="payType"></component>
    <div class="remind">
      <div>交易须知：</div>
      <div>1.以上货款不含运费；</div>
      <div>2.货款支付后，会有第三方平台存管，只有等订单显示“交易成功”后，卖家方可收到货款。</div>
    </div>
  </div>
</template>

<script>
import oType from './type/type.vue'
import wepay from './wepay/wepay.vue'
import alipay from './alipay/alipay.vue'
import Vuex from 'vuex'

export default {
  props: ['order'],
  components: {
    oType,
    wepay,
    alipay
  },
  data() {
    return {
      payType: 'alipay'
    }
  },
  computed: {
    ...Vuex.mapState('pay', ['qrData']),
    info() { // 二维码数据
      return this.qrData.data || {}
    },
    items() { // 订单信息
      return this.qrData.items || {}
    },
  },
  mounted() {
    let payType = this.payType
    // 如果没有订单就前往买家中心
    if(!this.order) this.$router.push('buyer')
  },
  methods: {
    updatePayType(payload) {
      let type = payload.type
      this.payType = type
    }
  }
}
</script>

<style scoped lang="less">
.pay {
  display: flex;
  flex-direction: column;
  align-items: center;

  @eColor: #ec6337;

  .order-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1024px;
    min-height: 70px;
    margin-bottom: 20px;
    background: white;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.24);
    border-radius: 2px;

    .oi-items-container {
      padding: 10px 0;

      .oi-items {
        display: flex;
        margin-left: 40px;
        color: #333;
        font-size: 14px;

        .oi-title {
          width: 80px;
          font-weight: 800;
        }

        .oi-item-container {
          .oi-item {
            width: 600px;
          }
        }
      }
    }

    .money {
      margin-right: 96px;
      font-size: 14px;
      color: @eColor;
    }
  }

  .remind {
    display: flex;
    flex-direction: column;
    width: 1024px;
    min-height: 60px;
    padding: 20px 0;
    border-top: 1px solid #f2f2f2;
    background: white;
    padding-left: 40px;

    &>div {
      font-size: 12px;
      color: #666;
    }

    &>div:nth-child(1) {
      width: 60px;
    }

    &>div:nth-child(2) {
      width: 830px;
    }
  }
}
</style>
