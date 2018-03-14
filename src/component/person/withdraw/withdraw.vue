<template>
  <div class="withdraw">
    <div class="title">申请提现</div>
    <div><div>我的可提现金额：</div><span class="money">{{totalBalance}}</span></div>
    <div>
      <div>收款银行：</div>
      <el-input class="input" v-model="withdrawData.bank_name" placeholder="输入银行"></el-input>
      <div class="remind" v-popover:popover>
        已存银行<div class="trangle"></div>
        <el-popover
          ref="popover"
          placement="bottom-start"
          width="200"
          trigger="hover">
          <div class="wr-list">
            <div class="wr-item"
              v-for="(bankCard, index) in bankCards" :key="index"
              @click="historyClick(bankCard)">
            <div class="wri-name">{{bankCard.holder_name}}</div>
            <div class="wri-code"
              >{{`${bankCard.bank_name}(${bankCard.bank_card_number})`}}</div>
            </div>
          </div>
        </el-popover>
      </div>
    </div>
    <div><div>开户支行：</div><el-input class="input" v-model="withdrawData.bank_branch_name" placeholder="输入完整开户行信息"></el-input><span class="branch-remind">例：中国银行北京通州九棵树支行</span></div>
    <div><div>收款卡号：</div><el-input class="input" v-model="withdrawData.bank_card_number" placeholder="输入卡号"></el-input></div>
    <div><div>开户人姓名：</div><el-input class="input" v-model="withdrawData.holder_name" placeholder="输入开户人姓名"></el-input></div>
    <div><div>提现金额：</div><el-input class="input" autofocus v-model="inputMoney" placeholder="输入提现金额"></el-input></div>
    <div>
      <div>到账时间：</div>
      <el-radio class="radio" v-model="withdrawData.arrive_delay" label="normal">普通（3-5个工作日）</el-radio>
      <el-radio class="radio" v-model="withdrawData.arrive_delay" label="urgent">加急（1-2个工作日）</el-radio>
    </div>
    <div><div>服务费：</div><span>¥{{serviceMoney}}(付款总额<span class="money">¥{{totalMoney}}</span>）</span></div>
    <div><div>提现密码：</div><el-input class="input" type="password" v-model="withdrawData.password" placeholder="输入提现密码"></el-input><span class="remind" @click="passwordShow = true">设置提现密码</span></div>
    <div><div></div><el-button class="submit" type="primary" @click="submit">提交申请</el-button></div>
    <div class="password-container"
      v-if="passwordShow">
      <Password
        @close="closePassword"
        :title="pTitle"
        :action="pAction" />
    </div>
    <div class="w-remind">
      <h4>申请提现遇到问题？</h4>
      <ul>
        <li>1.转账到银行卡信息没填对，资金如何退还？</li>
        <li>答：款项会全额退还。 本金、服务费将退回{{theme.application}}账户余额里，请关注。 银行退款一般会在7个工作日内退回（处理速度由银行决定）。 </li>
        <li>2.服务费收费标准?</li>
        <li>答：普通（3-5个工作日）到账，费率0.15%（最低2元，最高25元）；加急（1-2个工作日）到账，费率0.2%（最低2元，最高25元）。</li>
        <li>3.提现限额标准？</li>
        <li>答.单笔：5万元（向个人账户）；10万元（向公司账户）。</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Password from '../account/password/password.vue'
import { Input, Popover, Radio } from "element-ui";
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Input);
Vue.use(Popover)
Vue.use(Radio)

export default {
  components: {
    Password,
  },
  props: ["balance"],
  data() {
    return {
      withdrawData: {
        arrive_delay: 'normal',
      }, // 提现数据
      inputMoney: '', // 输入框输入的钱数目
      bankCards: [], // 银行数据
      passwordShow: false,// 显示修改密码
      pTitle: '设置提现密码', // 修改密码的 title
      pAction: 'pays', // 默认是修改密码
    }
  },
  computed: {
    ...Vuex.mapState(["userInfo", 'theme']),
    totalBalance() {
      return "¥" + (this.balance.total_balance || "");
    },
    rate() {
      return this.withdrawData.arrive_delay === 'urgent' ? .002 : .0015
    },
    amount() {
      return parseFloat(this.inputMoney || 0)
    },
    serviceMoney() {
      let money = this.amount * this.rate
      if(money < 2) money = 2
      if(money > 25) money = 25
      
      return money.toFixed(2)
    },
    totalMoney() {
      return (parseFloat(this.serviceMoney) + this.amount).toFixed(2)
    }
  },
  mounted() {
    this.aBankcard()
  },
  methods: {
    aBankcard() {
      u.get('/account/bankcard/list')
        .then(res => {
          this.bankCards = res.data
        })
    },
    historyClick(bankCard) {
      this.withdrawData = Object.assign({}, this.withdrawData, bankCard)
    },
    submit() {
      this.withdrawData.amount = this.inputMoney // 增加一个提交属性

      let withdrawData = this.withdrawData
      let error = ''

      if(!withdrawData.bank_name || withdrawData.bank_name.length < 1) {
        error = '请输入收款银行'
      }
      else if(!withdrawData.bank_branch_name || withdrawData.bank_branch_name.length < 1) {
        error = '请输入开户支行'
      }
      else if(!withdrawData.bank_card_number || withdrawData.bank_card_number.length < 1) {
        error = '请输入收款卡号'
      }
      else if(!withdrawData.holder_name || withdrawData.holder_name.length < 1) {
        error = '请输入开户人姓名'
      }
      else if(!this.inputMoney || this.inputMoney.length < 1) {
        error = '请输入提现金额'
      }
      else if(!withdrawData.password || withdrawData.password.length < 1) {
        error = '请输入提现密码'
      }
      else if(parseFloat(this.totalMoney) > parseFloat(this.balance.total_balance)) {
        this.$alert('提现金额不得大于可提现金额')
        return
      }

      if(error.length > 0) {
        this.$message({
          message: error,
          type: 'error'
        })
        return
      }
      let loading = this.$loading()

      u.post('/account/balance/draw', this.withdrawData)
        .then(res => {
          loading.close()

          if(!res) return

          this.initialWithDrawData() // 重置页面
          this.$emit('reBalance') // 重新拉取余额相关
          this.aBankcard() // 银行卡信息更新

          this.$message({
            message: '申请提现成功',
            type: 'success'
          })
        })
    },
    closePassword() {
      this.passwordShow = false
    },
    initialWithDrawData() {
      this.inputMoney = ''
      this.withdrawData = {
        arrive_delay: 'normal',
      }
    }
  }
}
</script>

<style scoped lang="less">
.withdraw {
  width: 100%;
  min-height: 100%;
  padding: 0 40px 20px 40px;

  @eColor: #ec6337;
  @d8line: 1px solid #d8d8d8;
  @olColor: #151515;
  @wrBC: #f2f2f2;

  .money {
    color: @eColor;
  }

  & > div {
    display: flex;
    align-items: center;
    margin-top: 20px;
    font-size: 14px;
    color: #666;

    & > div {
      width: 120px;
    }

    & > .input {
      width: 320px;
      height: 40px;
    }

    .branch-remind {
      margin-left: 4px;
      color: #999;
    }

    & > .remind {
      display: flex;
      align-items: center;
      padding-left: 4px;
      color: @eColor;
      cursor: pointer;

      .trangle {
        display: inline-block;
        box-sizing: content-box;
        border: 5px solid transparent;
        border-bottom: 0;
        border-top: 6px solid @eColor;
        margin-left: 4px;
      }
    }

    .submit {
      width: 160px;
    }

    .radio {
      font-size: 14px;
      color: #666;
      font-weight: 400;
    }

    .password {
      width: 356px;
    }
  }

  .title {
    color: #333;
    font-weight: 800;
  }

  .util {
    color: @eColor;
    cursor: pointer;
  }

  .uploaded {
    display: inline-block;
    width: 40px;
    height: 40px;
    background: url(/sp/static/img/spirit.png) 0 -520px ~"/" 40px auto no-repeat;
    cursor: default;
  }

  .uploading {
    cursor: default;
  }

  .file {
    visibility: hidden;
  }

  .password-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
  }

  .password-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
  }

  .w-remind {
    position: relative;
    left: -30px;
    width: 804px;
    display: block;
    flex-direction: column;
    padding: 20px;
    margin-top: 40px;
    border-radius: 2px;
    border: @d8line;
    background: @wrBC;

    h4 {
      margin: 0;
    }

    ul,li {
      margin: 0;
      padding: 0;
    }

    ul {
      list-style: none;

      li {
        font-size: 12px;
        color: @olColor;
        line-height: 20px;
        white-space: pre-wrap;
      }
    }
  }
}
</style>
