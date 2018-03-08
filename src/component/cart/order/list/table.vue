<template>
  <div class="table">
    <div class="t-server">
      {{order.seller_name}}
    </div>
    <div class="t-box">
      <div class="header">
        <div class="h-item"
          v-for="(item, index) in headerTitles" :key="index">
          <span >{{item}}</span>
        </div>
      </div>
      <div class="content">
        <div class="c-list">
          <div class="c-items"
            v-for="(item, gIndex) in order.items" :key="gIndex">
            <div class="c-item"></div>
            <div class="c-item">{{item.pid}}</div>
            <div class="c-item">{{item.label}}</div>
            <div class="c-item">¥{{item.price}}</div>
            <div class="c-item">{{item.quantity}}</div>
            <div class="c-item">¥{{item.money}}</div>
          </div>
        </div>
        <div class="carriage">{{carriage}}</div>
      </div>
    </div>
    <div class="l-requirement">
      <span class="lr-title">需求:</span>
      <input type="text" class="lr-input" placeholder="输入您的特殊需求"
        v-model="order.remark">
      <div class="lr-total">
        <span>运费共计:<span class="money">{{carriage}}</span></span>
        <span>货品总金额:<span class="money">¥{{order.total}}</span></span>
      </div>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  props: ['order'],
  data() {
    return {
      headerTitles: ['', '零件号', '注释', '单价(元)', '数量', '金额(元)', '运费(元)'],
      allSelected: false,
      isIndeterminate: false // 全选按钮标识
    }
  },
  computed: {
    ...Vuex.mapState('cart', ['orders']),
    ...Vuex.mapState('cart/order', ['ordersData']),
    carriage() {
      return this.ordersData.total_carriage_unit + this.ordersData.total_carriage
    }
  },
  methods: {
    selectedAll(selected) {
      for(let i = 0, j = this.orders.length; i< j; i ++) {
        let item = this.orders[i].item

        for(let m = 0, n = item.length; m < n; m ++) {
          let sg = item[m]
          this.$set(sg, 'selected', selected)
        }
      }
      this.isIndeterminate = false
      this.allSelected = selected
    },
    change(selected) {
      this.isIndeterminate = true
    },
    inputNumberChange(count) {

    },
    submit() {
      this.$router.push('/cart/order')
    }
  }
}
</script>

<style scoped lang="less">
.table {
  width: 1024px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  background-color: white;

  @ffColor: #ffe9e2;
  @fColor: #f2f2f2;
  @eColor: #ec6337;
  @d8line: 1px solid #d8d8d8;

  .t-server {
    display: flex;
    align-items: center;
    height: 40px;
    padding-left: 10px;
    font-size: 12px;
    color: #666;
    background-color: @ffColor;
  }

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;

    &:nth-child(1) {
      width: 40px;
    }
    &:nth-child(2) {
      width: 140px;
    }
    &:nth-child(3) {
      width: 212px;
    }
    &:nth-child(4) {
      width: 230px;
    }
    &:nth-child(5) {
      width: 80px;
    }
    &:nth-child(6) {
      width: 220px;
    }
    &:nth-child(7) {
      width: 80px;
    }
  }
  
  .t-box {
    width: 1004px;
    margin: 10px;
    border: @d8line;

    .header {
      display: flex;
      height: 32px;
      background-color: #d8d8d8;

      .h-item {
        .item;
        font-size: 12px;
      }
    }

    .content {
      display: flex;

      .c-list {
        display: flex;
        flex-direction: column;

        .c-items {
          display: flex;
          width: 100%;
          height: 40px;
          background-color: white;
          font-size: 14px;

          .c-item {
            .item;

            &:nth-child(6) {
              font-size: 14px;
              color: @eColor;
            }
          }
        }
      }

      .carriage {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80px;
        font-size: 14px;
        color: @eColor;
      }
    }
  }

  .l-requirement {
    display: flex;
    align-items: center;
    width: 1004px;
    height: 64px;
    margin-left: 10px;

    .lr-title {
      font-size: 14px;
      color: #333;
    }

    .lr-input {
      flex: 1;
      // width: 760px;
      height: 32px;
      padding-left: 8px;
      margin-left: 8px;
      border: @d8line;
    }

    .lr-total {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-left: 120px;
      font-size: 12px;
      color: #333;

      .money {
        margin-left: 4px;
        color: @eColor;
      }
    }
  }
}
</style>
