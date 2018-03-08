<template>
  <div class="record">
    <div class="title">账户管理</div>
    <div class="title">账户余额：<span class="money">¥{{balance.total_balance}}</span></div>
    <div class="table">
      <div class="header">
        <div class="item">申请时间</div>
        <div class="item">内容</div>
        <div class="item">订单号|流水号</div>
        <div class="item">对方</div>
        <div class="item">金额|明细</div>
        <div class="item">状态</div>
        <div class="item">完成时间</div>
      </div>
      <div class="content">
        <div class="c-row"
          v-for="(item, index) in items" :key="index">
          <div class="item">{{item.create_time}}</div>
          <div class="item">{{item.reason_str}}</div>
          <div class="item">
            <div v-if="item.order_id">订单号：{{item.order_id}}</div>
            <div>流水号：{{item.serial}}</div>
          </div>
          <div class="item">
            <div>{{item.name}}</div>
            <div>{{item.bank_info}}</div>
          </div>
          <div class="item">{{item.amount}}</div>
          <div class="item">{{item.status}}</div>
          <div class="item">{{item.enable_time}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["balance"],
  data() {
    return {
      items: []
    }
  },
  mounted() {
    this.aHistory()
  },
  methods: {
    aHistory() {
      u.get('/account/balance/history')
        .then(res => {
          this.items = res.data || []
        })
    }
  }
}
</script>

<style scoed lang="less">
.record {
  width: 100%;
  height: 100%;

  @eColor: #ec6337;
  @d8line: 1px solid #d8d8d8;
  @headerBC: #f6f6f6;

  .title {
    margin-top: 20px;
    margin-left: 40px;
    font-size: 14px;
    color: #666;
    font-weight: 800;

    .money {
      color: @eColor;
    }
  }

  .table {
    width: 804px;
    height: 344px;
    margin: 10px 0 0 10px;
    border: @d8line;

    .row {
      display: flex;
      height: 40px;

      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #666;
        font-size: 12px;
      }

      .item:nth-child(1) {
        width: 90px;
        padding-left: 10px;
      }
      .item:nth-child(2) {
        width: 70px;
      }
      .item:nth-child(3) {
        width: 242px;
      }
      .item:nth-child(4) {
        width: 150px;
      }
      .item:nth-child(5) {
        width: 80px;
      }
      .item:nth-child(6) {
        width: 70px;
      }
      .item:nth-child(7) {
        width: 100px;
        padding-right: 10px;
      }
    }

    .header {
      .row;
      background: @headerBC;
    }

    .content {
      height: 304px;
      overflow-y: scroll
    }

    .c-row {
      .row;
      min-height: 58px;
      border-top: @d8line;   
    }
  }
}
</style>
