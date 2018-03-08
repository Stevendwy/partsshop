<template>
  <div class="table">
    <div class="header">
      <div class="h-item"
        v-for="(item, index) in headerTitles" :key="index">
        <div class="hi-first"
          v-if="index === 0">
          <el-checkbox
            v-model="allSelected"
            @change="selectedAll">全选</el-checkbox>
        </div>
        <span v-once
          v-else>{{item}}</span>
      </div>
    </div>
    <!-- element checkbox bug 处理 -->
    <div class="content-container">
      <div class="content"
        v-if="orders.length">
        <div class="c-container"
          v-for="(order, sIndex) in orders" :key="sIndex">
          <el-checkbox class="c-server"
            v-model="order.selected"
            @change="selectedPart(order, $event)">{{order.title}}</el-checkbox>
          <div
            :class="enable(item) ? 'c-items' : 'c-items-disable'"
            v-for="(item, gIndex) in order.items" :key="gIndex">
            <div class="c-item">
              <el-checkbox
                v-if="enable(item)"
                v-model="item.selected"
                @change="change(item)"></el-checkbox>
              <div class="ci-disable"
                v-else>失效</div>
            </div>
            <div class="c-item"></div>
            <div class="c-item">{{item.pid}}</div>
            <div class="c-item">{{item.label}}</div>
            <div class="c-item">{{item.price}}</div>
            <div class="c-item">
              <el-input-number v-model="item.quantity" @change="inputNumberChange($event, item)" :min="1" :max="enable(item) ? 999 : 1" label="描述文字"></el-input-number>
            </div>
            <div class="c-item">{{(item.price * item.quantity).toFixed(2)}}</div>
            <div class="c-item c-delete"
              @click="deleteSub({p_uid: item.p_uid})">删除</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-container">
      <div class="footer">
        <div class="f-left">
          <el-checkbox
            v-model="allSelected"
            @change="selectedAll">全选</el-checkbox>
          <el-button type="text" class="f-delete"  v-once
            @click="deleteCollection">删除</el-button>
        </div>
        <div class="f-right">
          <span class="f-count">已选<span class="count">{{totalCount}}</span></span>
          <span class="f-pay">合计:<span class="money">{{totalMoney}}元</span></span>
          <el-button class="f-submit" type="primary"  v-once
            @click="submit">结算</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import Vuex from "vuex";

export default {
  data() {
    return {
      headerTitles: ["", "", "零件号", "注释", "单价(元)", "数量", "金额(元)", ""],
      allSelected: true
    };
  },
  mounted() {
    this.clearSO();
    this.aList().then(() => this.selectedAll(true));
  },
  computed: {
    ...Vuex.mapState("cart", ["orders", "submitOrders"]),
    totalCount() {
      let count = 0;
      this.submitOrders.forEach(order => {
        count += 1;
      });
      return count;
    },
    totalMoney() {
      let money = 0.0;
      this.submitOrders.forEach(order => {
        money += parseFloat(order.price * order.quantity);
      });
      return money.toFixed(2);
    }
  },
  methods: {
    ...Vuex.mapMutations("cart", ["updateSO", "addSO", "delSO", "clearSO"]),
    ...Vuex.mapActions("cart", ["cartSubmit", "deleteCollection", "aList"]),
    selectedAll(selected) {
      if (selected) {
        for (let i = 0, j = this.orders.length; i < j; i++) {
          let order = this.orders[i];
          let item = order.items;
          this.$set(order, "selected", selected);

          for (let m = 0, n = item.length; m < n; m++) {
            let sg = item[m];
            if (!sg.amount_enable) continue; // 失效处理
            this.addSO({ item: sg });
            this.$set(sg, "selected", selected);
          }
        }
      } else {
        for (let i = 0, j = this.orders.length; i < j; i++) {
          let order = this.orders[i];
          let item = order.items;
          this.$set(order, "selected", selected);

          for (let m = 0, n = item.length; m < n; m++) {
            let sg = item[m];
            this.$set(sg, "selected", selected);
          }
        }
        this.clearSO();
      }
      this.allSelected = selected;
    },
    selectedPart(order, selected) {
      let items = order.items;
      if (selected) {
        for (let i = 0, j = items.length; i < j; i++) {
          let sg = items[i];
          if (!sg.amount_enable) continue; // 失效处理
          this.addSO({ item: sg });
          this.$set(sg, "selected", selected);
        }
      } else {
        for (let i = 0, j = items.length; i < j; i++) {
          let sg = items[i];
          this.$set(sg, "selected", selected);
          this.delSO({ item: sg });
        }
      }
    },
    change(item) {
      if (item.selected) this.addSO({ item });
      else this.delSO({ item });
    },
    inputNumberChange(quantity, item) {
      this.updateSO({
        p_uid: item.p_uid,
        quantity
      });
    },
    deleteSub(payload) {
      this.deleteCollection(payload).then(() => {
        this.selectedAll(true);
      });
    },
    submit() {
      if (this.$store.state.cart.submitOrders.length < 1) {
        Message.error("没有选择任何零件");
        return;
      } else this.cartSubmit().then(() => this.$router.push("/cart/order"));
    },
    enable(item) {
      return item.amount_enable;
    }
  }
};
</script>

<style scoped lang="less">
.table {
  position: relative;
  width: 100%;
  height: e("calc(100% - 60px)");
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-left: @d8line;
  border-right: @d8line;

  @fColor: #f2f2f2;
  @eColor: #ec6337;
  @d8line: 1px solid #d8d8d8;

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;

    &:nth-child(1) {
      width: 40px;
    }
    &:nth-child(2) {
      width: 70px;
    }
    &:nth-child(3) {
      width: 214px;
    }
    &:nth-child(4) {
      width: 230px;
    }
    &:nth-child(5) {
      width: 80px;
    }
    &:nth-child(6) {
      width: 240px;
    }
    &:nth-child(7) {
      width: 80px;
    }
    &:nth-child(8) {
      width: 70px;
    }
  }

  .header {
    display: flex;
    height: 32px;
    box-sizing: border-box;
    background-color: #f8f8f8;

    .h-item {
      .item;
      font-size: 14px;

      &:nth-child(1) {
        width: 110px;
        justify-content: flex-start;
        padding-left: 13px;
      }
      &:nth-child(2) {
        width: 0;
      }
    }
  }

  .content-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: e("calc(100% - 72px)");
    overflow-y: scroll;

    .content {
      width: 1024px;
      background-color: white;

      .c-container {
        width: 100%;

        .c-server {
          display: flex;
          align-items: center;
          height: 40px;
          padding-left: 13px;
          border-top: @d8line;
          font-size: 12px;
          background-color: @fColor;
        }

        .c-items {
          display: flex;
          width: 100%;
          height: 40px;
          background-color: white;
          border-top: @d8line;

          .c-item {
            .item;
            font-size: 14px;

            .ci-disable {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 28px;
              height: 20px;
              background-color: #999;
              color: white;
              border-radius: 2px;
              font-size: 12px;
            }
          }

          .c-delete {
            color: @eColor;
            cursor: pointer;
          }
        }

        .c-items-disable {
          .c-items;
          background-color: #d8d8d8;
        }
      }
    }
  }

  .footer-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    margin-top: 10px;
    border-top: @d8line;
    font-size: 14px;
    background-color: white;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1024px;
    height: 40px;
    font-size: 14px;

    .f-left {
      margin-left: 13px;

      .f-delete {
        margin-left: 28px;
        color: @eColor;
        cursor: pointer;
      }
    }

    .f-right {
      .f-submit {
        width: 110px;
        padding: 10px 20px;
      }

      .count,
      .money {
        margin-left: 4px;
        color: @eColor;
      }
    }
  }
}
</style>
