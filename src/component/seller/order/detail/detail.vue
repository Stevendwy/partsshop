<template>
  <div class="order">
    <div class="o-title">
      订单详情
      <div class="o-print-container" @click="goPrint">
        <div class="o-print"></div>
        <span>打印</span>
      </div>
    </div>
    <div class="o-top">
      <o-express />
      <o-address
        :addressInfo="detailOrdersData.contact" />
      <div class="o-list-container">
        <o-list/>
        <div class="pay-total-container">
          <div class="pay-total">
            <div class="pt-count">
              总计:
              <span>货品种类: {{detailOrdersData.total_quantity}}类</span>
              <span>数量总计: {{detailOrdersData.total_quantity}}件</span>
            </div>
            <div class="pt-pay">
              <span>货品总金额: <span class="money">¥{{detailOrdersData.total_money}}</span></span>
              <span>运费到付: <span class="money">{{carriage}}</span></span>
              <!-- <span>实收款(不含运费): <span class="money">¥{{detailOrdersData.total_money}}</span></span> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="o-footer-container">
      <div class="o-footer">
        <el-button type="primary" class="back" v-once
          @click="back">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import oExpress from './express.vue'
import oAddress from './address.vue'
import oList from './list/list.vue'
import Vuex from 'vuex'

export default {
  components: {
    oExpress,
    oAddress,
    oList
  },
  computed: {
    ...Vuex.mapState('seller', ['detailOrdersData']),
    carriage() {
      return this.detailOrdersData.carriage_unit + this.detailOrdersData.carriage
    }
  },
  methods: {
    back() {
      this.$router.history.go(-1)
    },
    goPrint() {
      window.open('/community/order/seller/printer?order_id=' + this.detailOrdersData.order_id)
    }
  }
}
</script>

<style scoped lang="less">
.order {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: e('calc(100% - 32px)');

  @0Color: #0076ff;

  .o-title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    background-color: white;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.24);
    font-size: 20px;
    color: @0Color;

    .o-print-container {
      position: absolute;
      right: e('calc(50% - 500px)');
      top: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;

      .o-print {
        width: 68px;
        height: 32px;
        background: #0076FF url(~/static/img/spirit.png) 14px -564px ~'/' 40px auto no-repeat;
        border-radius: 4px;
      }

      &>span {
        color: #333;
        font-size: 12px;
      }
    }
  }

  .o-top {
    margin-top: 10px;
  }

  .pay-total-container {
    .pay-total {
      display: flex;
      align-items: center;
      height: 112px;
      width: 1024px;
      padding: 0 10px;
      margin-top: 10px;
      font-size: 14px;
      color: #666;
      background-color: #eef6ff;
      justify-content: space-between;

      .pt-count {

      }

      .pt-pay {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        span {
          margin: 4px 0;
        }

        .money {
          color: @0Color;
          margin-left: 4px;
        }
      }
    }
  }

  .o-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: e('calc(100% - 120px)');
    overflow-y: scroll;

    .o-list-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
  }

  .o-footer-container {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 10px;
    background-color: white;

    .o-footer {
      display: flex;
      justify-content: flex-end;
      width: 1024px;

      .back {
        width: 110px;
        padding: 10px 20px;
        background-color: @0Color;
        border: 1px solid @0Color;
      }
    }
  }
}
</style>
