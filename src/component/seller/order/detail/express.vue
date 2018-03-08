<template>
  <div class="express-container">
    <div class="has-info"
      v-if="expressObj.waybill_no">
      <div class="title">
        <span>物流信息</span>
      </div>
      <div class="express">
        <div class="e-container">
          <span class="ec-title">物流公司: {{expressObj.logistics}}</span>
          <span class="ec-title">运单号码: {{expressObj.waybill_no}}</span>
          <span class="ec-title">备注: {{expressObj.remark}}</span>
          <span class="ec-title">运费金额: {{carriage}}</span>
          <!-- <div class="ec-after">
            <div class="ec-title">物流跟踪: </div>
            <div class="eca-list">
              <div class="eca-item"
                v-for="(item, index) in list" :key="index">{{item}}</div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <div class="no-info"
      v-else>
      当前订单状态：待发货
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  data() {
    return {
      expressObj: {} // 运单对象
    }
  },
  computed: {
    ...Vuex.mapState('seller', ['detailOrdersData']),
    list() {
      return this.expressObj.tracing || []
    },
    carriage() {
      return this.expressObj.carriage_unit + this.expressObj.carriage
    }
  },
  mounted() {
    this.aList()
  },
  methods: {
    aList() {
      u.get('/community/order/logistics/info', {order_id: this.detailOrdersData.order_id})
        .then(res => this.expressObj = res)
    }
  }
}
</script>

<style scoped lang="less">
.express-container {
  width: 1024px;

  @0Color: #eef6ff;

  .title {
    display: flex;
    align-items: center;
    width: 1024px;
    height: 40px;
    background-color: @0Color;
    font-size: 14px;
    color: #333;

    span {
      margin-left: 10px;
    }
  }

  .express {
    width: 1024px;
    font-size: 18px;

    .e-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      width: 100%;
      margin-top: 10px;
      background-color: white;

      .ec-title {
        margin-top: 10px;
        margin-left: 10px;
        font-size: 12px;
        color: #333;
        white-space: pre;


        &:nth-child(4) {
          margin-bottom: 10px;
        }
      }

      .ec-after {
        display: flex;
        margin-bottom: 10px;

        .eca-list {
          display: flex;
          flex-direction: column;
          width: 900px;
          margin-top: 10px;

          .eca-item {
            color: #333;
            font-size: 12px;
          }
        }
      }
    }
  }

  .no-info {
    width: 100%;
    line-height: 60px;
    padding-left: 10px;
    font-size: 14px;
    background: @0Color;
  }
}
</style>
