<template>
  <div class="table">
    <div class="t-header">
      <div class="th-item"
        v-for="title in headerTitles" :key="title">{{title}}</div>
    </div>
    <div class="t-content">
      <div class="tc-row"
        v-for="(item, index) in contentList" :key="index + 'item'">
        <div class="tcr-item">
          <span>{{item.pid}}</span>
        </div>
        <div class="tcr-item">
          <span>{{item.mill}}</span>
        </div>
        <div class="tcr-item">
          <span>{{item.amount}}</span>
        </div>
        <div class="tcr-item">
          <span>{{item.prices}}</span>
        </div>
        <div class="tcr-item">
          <span>{{item.address}}</span>
        </div>
        <div class="tcr-item">
          <span>{{item.location}}</span>
        </div>
        <div class="tcr-item">
          <span>{{item.supplier}}</span>
        </div>
        <div class="tcr-item">
          <div :class="item.in_spcarts ? 'sale-shopping-cart-selected' : 'sale-shopping-cart'" @click="cartClick(item)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  props: ['headerTitles', 'contentList'],
  methods: {
    ...Vuex.mapActions('part', ['cartAdd', 'cartDel']),
    ...Vuex.mapMutations('cart', ['updateOrders']),
    ...Vuex.mapMutations(['updateBadgeCount']),
    cartClick(item) {
      if(item.in_spcarts) {
        this.cartDel({item})
          .then(() => {
            this.updateOrders({ item, mode: "decrease" })
            this.updateBadgeCount({ mode: "decrease" })
          })
          .then(() => this.$message.success('取消加入购物车'))
      }
      else {
        this.cartAdd({item})
          .then(() => {
            this.updateOrders({ item, mode: "plus" })
            this.updateBadgeCount({ mode: "plus" })
          })
          .then(() => this.$message.success('加入购物车成功'))
      }
    }
  }
}
</script>

<style scoped lang='less'>
@d8line: 1px solid #d8d8d8;

.table {
  width: 1024px;
  font-size: 14px;
  margin-top: 10px;

  .row {
    display: flex;
    width: 100%;
    min-height: 40px;
    border-bottom: @d8line;
  }

  .item {
    display: flex;
    justify-content: center;
    align-items: center;

    &:nth-child(1) {
      width: 20%;
    }
    &:nth-child(2) {
      width: 15%;
    }
    &:nth-child(3) {
      width: 10%;
    }
    &:nth-child(4) {
      width: 15%;
    }
    &:nth-child(5) {
      width: 10%;
    }
    &:nth-child(6) {
      width: 10%;
    }
    &:nth-child(7) {
      width: 10%;
    }
    &:nth-child(8) {
      width: 10%;
    }
    
    &>span {
      display: inline-block;
      width: 100%;
      word-wrap: break-word;
      text-align: center;
      padding: 2px 0;
    }
  }

  .t-header {
    .row;
    background-color: #f5f5f5;

    .th-item {
      .item;
    }
  }

  .t-content {
    width: 100%;

    .tc-row {
      .row;
      border-bottom: @d8line;

      .tcr-item {
        .item;
        border-right: @d8line;

        &:nth-child(1) {
          border-left: @d8line;
        }

        .sale-shopping-cart {
          width: 40px;
          height: 40px;
          background: url(/static/img/spirit.png) 0 -40px ~"/" 40px auto no-repeat;
          cursor: pointer;
        }

        .sale-shopping-cart-selected {
          .sale-shopping-cart;
          background: url(/static/img/spirit.png) 0 -320px ~"/" 40px auto no-repeat;
        }
      }
    }
  }
}
</style>
