<template>
  <div class="order">
    <div class="o-title">
      <span>订单号:<span class="ot-id">{{order.order_id}}</span></span>
      <span class="ot-time">{{order.order_dt}}</span>
    </div>
    <div class="o-content">
      <div class="o-list">
        <div class="ol-item"
          v-for="(item, gIndex) in order.items" :key="gIndex">
          <div class="oli-part">
            <span class="olip-image"></span>
            <div class="olip-detail">
              <span>{{item.pid}}</span>
              <span>{{item.label}}</span>
            </div>
          </div>
          <span class="oli-price">¥{{item.price}}</span>
          <span class="oli-count">{{item.quantity}}</span>
        </div>
      </div>
      <div class="o-total">
        <div class="ot-buyer">
          <span>{{order.buyers_name}}</span>
        </div>
        <div class="ot-detail">
          <span class="otd-status">待发货</span>
          <span class="otd-order"
            @click="openDetail(order)">订单详情</span>
        </div>
        <div class="ot-operation">
          <el-popover
            ref="popover4"
            placement="right"
            v-model="popoverShow"
            width="430"
            trigger="click">
            <div class="oto-title">
              请填写物流信息:
            </div>
            <div class="oto-input-container">
              <div><span class="blue-start">*</span>物流公司</div>
              <el-select class="oto-select"
                v-model="expressObj.logistics"
                filterable
                allow-create
                placeholder="输入物流公司">
                <el-option
                  v-for="(express, index) in expresses" :key="index"
                  :label="express.name"
                  :value="express.name">
                </el-option>
              </el-select>
            </div>
            <div class="oto-input-container">
              <div><span class="blue-start">*</span>运单号码</div>
              <el-input class="oto-input" placeholder="输入运单号码"
                v-model="expressObj.waybill_no"/>
            </div>
            <div class="oto-input-container">
              <div class="otoi-remind">备注</div>
              <el-input class="oto-input" placeholder="输入内容"
                v-model="expressObj.remark"/>
            </div><div class="oto-input-container">
              <div class="otoi-remind"><span class="blue-start">*</span>运费金额</div>
              <el-input class="oto-input" placeholder="输入运费金额"
                v-model="expressObj.carriage"/>
            </div>
            <div class="oto-buttons">
              <button class="oto-cancle"
                @click="popoverShow = false">取消</button>
              <button class="oto-submit"
                @click="send(order)">确定</button>
            </div>
          </el-popover>
          <el-button type="primary" class="oto-pay" v-popover:popover4>发货</el-button>
        </div>
        <div class="ot-other">
          <span class="oto-money">¥{{order.total_money}}</span>
          <span class="oto-carriage"><span>{{carriage}}</span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import {
  Input,
  Popover,
  Select,
  Option
} from 'element-ui'

Vue.use(Input)
Vue.use(Popover)
Vue.use(Select)
Vue.use(Option)

export default {
  props: ['order', 'type'],
  data() {
    return {
      expressObj: {}, // 快递对象
      popoverShow: false // 身边显示 popover
    }
  },
  computed: {
    ...Vuex.mapState('seller', ['expresses']),
    carriage() {
      return this.order.carriage_unit + this.order.carriage
    }
  },
  methods: {
    ...Vuex.mapMutations('seller', ['updateMI']),
    ...Vuex.mapActions('seller', ['aList', 'aDetail', 'handleOrder', 'deliver']),
    openDetail(order) {
      this.aDetail({order_id: order.order_id})
        .then(() => this.$router.push('/seller/detail'))
    },
    send(order) {
      let expressObj = this.expressObj
      if(!expressObj.waybill_no || expressObj.waybill_no.length < 1) {
        this.$message({
          message: '请输入物流单号',
          type: 'error'
        })
        return 
      }
      else if(!expressObj.carriage || expressObj.carriage.length < 1) {
        this.$message({
          message: '请输入运费金额',
          type: 'error'
        })
        return 
      }

      this.deliver({request: Object.assign(this.expressObj, {order_id: order.order_id})})
        .then(() => {
          this.$message({
            message: '发货成功',
            type: 'success'
          })
          this.$emit('reloadData', {index: 1})
          // this.$confirm('发货成功, 是否查看?', '提示', {
          //   confirmButtonText: '确认',
          //   cancelButtonText: '取消',
          //   type: 'success'
          // }).then(() => {
          //   this.updateMI({index: '0-2'}) // 0-2 是待收货
          //   this.$router.push('/seller/get')
          // }).catch(() => {
          //   this.$emit('reloadData', {index: 1})
          // })
        })
    },
    close(order) {
      this.handleOrder({order_id: order.order_id, status: this.type})
    },
    complaint() {
      this.$message('此功能暂未开通...')
    }
  }
}
</script>

<style scoped lang="less">
@d8line: 1px solid #d8d8d8;
@0Color: #0076ff;

.el-popover {

  .oto-title {
    margin: 11px 11px;
  }

  .oto-input-container {
    display: flex;
    width: 100%;
    margin-top: 10px;

    div {
      width: 72px;
      margin-right: 16px;
      line-height: 40px;
      text-align: right;
    }

    .otoi-remind {
      text-align: right;
    }

    .oto-select {
      width: 320px;
    }

    .oto-input {
      width: 320px;
    }

    .blue-start {
      color: @0Color;
    }
  }

  .oto-buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 76px;

    button {
      outline: none;
      border: 0;
      width: 64px;
      height: 36px;
      padding: 0;
      border-radius: 4px;
      cursor: pointer;
    }

    .oto-cancle {
      border: 1px solid #c0ccda;
    }

    .oto-submit {
      color: white;
      background: #20A0FF;
      border-radius: 4px;
      margin: 0 20px;
    }
  }
}

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
        width: 350px;
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
            width: 130px;

            span:nth-child(n+2) {
              margin-top: 10px;
            }
          }
        }

        .oli-price {
          display: flex;
          justify-content: center;
          width: 80px;
        }

        .oli-count {
          display: flex;
          justify-content: center;
          width: 69px;
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

      .ot-buyer {
        .center;
        width: 128px;
      }

      .ot-detail {
        .center;
        width: 105px;
        
        span:nth-child(n+2) {
          margin-top: 10px;
          cursor: pointer;
        }

        .otd-status {
          color: @0Color;;
        }

        .otd-order {
          text-decoration: underline;

          &:hover {
            color: @0Color;
          }
        }
      }

      .ot-operation {
        .center;
        width: 105px;

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
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 116px;
        
        .oto-money {
          color: #333;
        }

        .oto-carriage {
          margin-top: 10px;
          color: #999;
        }
      }
    }
  }
}
</style>