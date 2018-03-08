<template>
  <div class="alipay">
    <div class="content">
      <div class="code-info">
        <div>扫一扫付款: <span class="money" v-if="info.money">¥{{info.money}}</span></div>
        <img class="qrc-img" :src="qrImgUrl" alt="二维码">
        <span class="qrc-refresh"
          @click="refresh">刷新二维码</span>
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
      loopInterval: null,
      destoryed: false // 是否销毁本组件，用来关闭 loop
    }
  },
  computed: {
    ...Vuex.mapState('pay', ['qrData']),
    info() { // 二维码数据
      return this.qrData.data || {}
    },
    qrImgUrl() {
      let url = '/static/img/img_loading.png'
      let img = this.info.img
      if(img) {
        url = img
        if(this.qrData.isLocal) url = 'http://yhcqp.youfan.pub/' + img // 本地测试处理
      }
      return url
    }
  },
  mounted() {
    if(this.order.order_id) this.aData()
  },
  beforeDestroy() {
    this.destoryed = true
    if(this.loopInterval) clearInterval(this.loopInterval)
  },
  methods: {
    ...Vuex.mapMutations(['updateNSP']),
    ...Vuex.mapMutations('pay', ['updateQRData']),
    ...Vuex.mapActions('pay', ['aQRData']),
    aData() {
      clearInterval(this.loopInterval) // 刷新导致 bug
      this.aQRData({order: this.order, payType: 'wechatpay'})
        .then(() => this.loopStart())
    },
    loopStart() {
      if(this.destoryed) return
      
      this.loopInterval = setInterval(() => (
        u.get('/pays/check/wechatpay', {order_id: this.info.orderid,}, {closeMum: true})
          .then(res => {
            let status = res.status
            if(status === '408') ; // 继续轮询
            else if(status === '405') this.paySuccess() // 成功
            else {
              clearInterval(this.loopInterval)

              if(status === '404') this.payFail(res.msg) // 没有订单
              else if(status === '406') this.payFail(res.msg) // 关闭了订单
              else this.$message('未知问题，请重试') // 其他
            }
          })
      ), 3000)
    },
    paySuccess() {
      clearInterval(this.loopInterval)
      this.updateNSP({path: '/buyer'})
      this.$router.push('/buyer/send')
      this.$message({
        message: '支付成功',
        type: 'success'
      })
    },
    payFail(message) {
      clearInterval(this.loopInterval)
      this.$router.push('/buyer/pay')
      this.$confirm('付款遇到问题, 是否继续支付?', '提示', {
          confirmButtonText: '继续支付',
          cancelButtonText: '取消支付',
          type: 'warning'
        }).then(() => {
          this.info = {}
          this.aData()
        }).catch(() => {
          this.$router.push('/buyer/pay')     
        })
    },
    refresh() {
      this.aData()
    }
  }
}
</script>

<style scoped lang="less">
.alipay {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @eColor: #ec6337;

  // .title {
  //   width: 100%;
  //   border-radius: 2px;
  //   background-color: white;
  //   box-shadow: 0 2px 4px 0 rgba(0,0,0,0.24);

  //   .t-container {
  //     display: flex;
  //     align-items: center;
  //     width: 1024px;
  //     height: 60px;

  //     .t-logo {
  //       width: auto;
  //       height: 40px;
  //     }

  //     .rich-scan {
  //       color: #999;
  //       font-size: 14px;
  //     }
  //   }
  // }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1024px;
    min-height: 390px;
    margin-top: 10px;
    background-color: white;

    .code-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      width: 140px;
      // height: 170px;
      margin-top: 60px;

      .money {
        color: @eColor;
      }

      .qrc-img {
        width: 140px;
        height: 140px;
        box-shadow: 0 4px 12px #d8d8d8;
      }

      .qrc-refresh {
        font-size: 12px;
        color: #666;
        margin-top: 4px;
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .order-info {
      display: flex;
      flex-direction: column;
      width: 980px;
      min-height: 60px;
      margin-top: 70px;
      margin-bottom: 20px;

      .oi-items {
        display: flex;
        margin-top: 10px;
        color: #333;
        font-size: 14px;

        .oi-title {
          width: 80px;
          font-weight: 800;
        }

        .oi-item {
          width: 900px;
        }
      }
    }

    .remind {
      display: flex;
      flex-direction: column;
      width: 980px;
      min-height: 60px;
      padding: 20px 0;
      border-top: 1px solid #f2f2f2;

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
}
</style>
