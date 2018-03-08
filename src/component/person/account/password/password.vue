<template>
  <div class="password">
    <span class="title">{{title}}</span>
    <span class="phone">验证码发送至 {{userInfo.username}}</span>
    <div class="input-container">
      <input v-model="inputData.sms_code" placeholder="验证码" />
      <button class="check-button"
        @click="aCertificationCode" v-text="checkStr"></button>
    </div>
    <div class="input-container"><input v-model="inputData.password" :placeholder="placeholder" type="password" /></div>
    <div class="input-container"><input v-model="inputData.checkPassword" :placeholder="checkPlaceholder" type="password" /></div>
    <button @click="submit">确认</button>
    <div class="p-close" @click="close"></div>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  props: ['title', 'action'],
  data() {
    return {
      inputData: {
        sms_code: '',
        password: '',
        checkPassword: ''
      }, // 输入信息
      checkStr: '获取验证码', // 获取验证码按钮信息
      isLoop: false, // 是否获取验证码中
      loopTime: 60, // 获取验证码时长
      checkLoop: null, // 获取验证码的 loop
    }
  },
  computed: {
    ...Vuex.mapState(['userInfo']),
    submitReq() {
      return {
        password: this.inputData.password,
        sms_code: this.inputData.sms_code
      }
    },
    placeholder() {
      let p = '新密码（6位以上数字或字母）'
      if(this.isPays) p = '设置提现密码（6位以上数字或字母）'
      return p
    },
    checkPlaceholder() {
      let cp = '确认密码（6位以上数字或字母）'
      if(this.isPays) cp = '确认提现密码（6位以上数字或字母）'
      return cp 
    },
    isPays() { // 是否为支付
      return this.action === 'pays'
    }
  },
  mounted() {

  },
  methods: {
    aCertificationCode() {
      if(this.isLoop) return
      else this.isLoop = true

      axios.get('/community/base/sms_code', {params: {action: this.action}})
        .then(res => {
          this.checkStr = this.loopTime + 's'
          this.checkLoop = setInterval(() => {
            this.checkStr = --this.loopTime + 's'
            if(this.loopTime < 1) {
              this.loopTime = 60
              this.checkStr = '获取验证码'
              this.isLoop = false
              clearInterval(this.checkLoop)
            }
          }, 1000)
        })
    },
    submit() {
      let inputData = this.inputData
      if(inputData.sms_code.length < 1) {
        alert('请输入验证码')
        this.$message({
          message:'请输入验证码',
          type: 'error'
        })
        return
      }
      else if(inputData.password.length < 1) {
        this.$message({
          message:'请输入密码',
          type: 'error'
        })
        return
      }
      else if(inputData.checkPassword !== inputData.password) {
        this.$message({
          message:'请输入相同的确认密码',
          type: 'error'
        })
        return
      }

      let url = '/community/user/find_pwd'
      let successMessage = '修改密码成功'
      if(this.isPays) {
        url = '/account/payspwd/modify'
        successMessage = '设置提现密码成功'
      }

      axios.post(url, this.submitReq)
        .then(res => {
          if(res.data.code === 1) {
            this.$message({
              message: successMessage,
              type: 'success'
            })
            this.close()
          }
          else alert(res.data.msg)
        })
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="less">
.password {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 356px;
  height: 360px;
  background: white;
  box-shadow: 0 0 24px 0 rgba(0,0,0,0.12), 0 24px 24px 0 rgba(0,0,0,0.24);
  border-radius: 4px;

  @eColor: #ec6337;
  @d8line: 1px solid #d8d8d8;

  &>.title {
    color: @eColor;
    margin-top: 40px;
    margin-bottom: 10px;
  }

  &>.phone {
    color: #666;
    font-size: 12px;
  }

  .back {
    display: flex;
    align-items: center;
    width: 320px;
    height: 40px;
    font-size: 12px;
    color: #666;
    white-space: pre-wrap;

    span {
      cursor: pointer;
    }
  }

  .input-container {
    position: relative;
    width: 320px;
    margin-top: 12px;

    .normalSize {
      width: 320px;
      height: 40px;
      border: @d8line;
      outline: none;
      box-sizing: border-box;
      border-radius: 4px;
    }
  
    input {
      .normalSize;
      font-size: 12px;
      color: #333;  
      padding-left: 8px;
    }
  
    ::-moz-placeholder {
      color: #999;
    }
  
    ::-webkit-input-placeholder {
      color: #999;
    }
  
    .check-button {
      .normalSize;
      position: absolute;
      right: 0;
      top: 0;
      width: 98px;
      color: @eColor;
      border: 0;
      background: transparent;
    }

    .mark {
      position: absolute;
      right: -14px;
      top: 10px;
      margin-left: 8px;
      color: @eColor;
    }
  
    &>span:not(.el-cascader) {
      .mark;
    }
  }

  &>button {
    width: 320px;
    height: 40px;
    border: 0;
    margin-top: 40px;
    outline: none;
    background: @eColor;
    color: white;
  }

  .p-close {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 30px;
    height: 30px;
    background: url(/static/img/icon_close.png) 0 0 ~'/' 30px 30px no-repeat;
    border-radius: 15px;
    cursor: pointer;
  }
}
</style>
