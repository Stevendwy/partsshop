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
        <send-order
          v-if="order.status === 'paid'"
          type="paid"
          :order="order"
          @reloadData="reloadData" />
        <get-order
          v-else-if="order.status === 'sent'"
          type="sent"
          :order="order"/>
        <sign-order
          v-else-if="order.status === 'received'"
          type="received"
          :order="order"/>
      </div>
    </div>
  </div>
</template>

<script>
import sendOrder from '../send/order.vue'
import getOrder from '../get/order.vue'
import signOrder from '../sign/order.vue'
import Vuex from 'vuex'

export default {
  components: {
    sendOrder,
    getOrder,
    signOrder
  },
  props: ['orders', 'type', 'reloadData'],
  data() {
    return {
      headerTitles: ['零件号、名称', '单价（元）', '数量', '买家', '交易状态', '交易操作', '实收款']
    }
  },
  computed: {
    
  },
  methods: {
    ...Vuex.mapActions('seller', ['aDetail', 'handleOrder']),
    openDetail(order) {
      this.aDetail({order_id: order.order_id})
        .then(() => this.$router.push('/seller/detail'))
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
  @0Color: #0076ff;

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #999;

    &:nth-child(1) {
      width: 200px;
    }
    &:nth-child(2) {
      width: 80px;
    }
    &:nth-child(3) {
      width: 70px;
    }
    &:nth-child(4) {
      width: 128px;
    }
    &:nth-child(5) {
      width: 105px;
    }
    &:nth-child(6) {
      width: 105px;
    }
    &:nth-child(7) {
      width: 115px;
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

    .order {
      display: flex;
      flex-direction: column;
      width: 804px;
      margin-top: 10px;
      font-size: 12px;
      color: #333;
      background-color: white;

      .o-title {
        display: flex;
        align-items: center;
        height: 32px;
        padding: 0 10px;
        box-sizing: border-box;
        background-color: #d8d8d8;

        .ot-id {
          margin-left: 8px;
        }

        .ot-time {
          margin-left: 4px;
          color: #999;
        }
      }

      .o-content {
        display: flex;
        
        .o-list {
          display: flex;
          flex-direction: column;

          .ol-item {
            display: flex;
            width: 360px;
            height: 80px;
            // margin-left: 10px;
            padding-top: 10px;
            box-sizing: border-box;
            border-bottom: @d8line;
            border-right: @d8line;

            &:last-child {
              border-bottom: 0;
            }

            .oli-part {
              display: flex;

              .olip-image {
                width: 70px;
              }

              .olip-detail {
                display: flex;
                flex-direction: column;
                width: 80px;

                span:nth-child(n+2) {
                  margin-top: 10px;
                }
              }
            }

            .oli-price {
              display: flex;
              justify-content: center;
              width: 150px;
            }

            .oli-count {
              display: flex;
              justify-content: center;
              width: 50px;
            }
          }
        }
        
        .o-total {
          display: flex;
          padding-top: 10px;
          box-sizing: border-box;

          .center {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .ot-result {
            .center;
            width: 150px;

            span:nth-child(n+2) {
              margin-top: 10px;
            }

            .otr-freight {
              color: #999;
            }
          }

          .ot-detail {
            .center;
            width: 150px;
            
            span:nth-child(n+2) {
              margin-top: 10px;
              cursor: pointer;
            }

            .otd-status {
              color: @0Color;
            }
          }

          .ot-operation {
            .center;
            width: 100px;

            .el-button--primary {
              padding: 8px 19px;
              background-color: @0Color;
              border-color: @0Color;
            }

            .close {
              margin-top: 10px;
              cursor: pointer;
            }

            .closed {
              margin-top: 10px;
              cursor: not-allowed;
            }
          }

          .ot-other {
            width: 54px;
            
            span {
              cursor: pointer;
            }

            .oto-complaint {
              color: #999;
              cursor: not-allowed;
            }
          }
        }
      }
    }
  }
}
</style>