"use strict"

let Delegate = Vue.extend({
  template: '#delegate',
  methods: {
    close:function () {
      this.$emit('close')
    },
    readed:function () {
      this.$emit('readed')
      this.close()
    }
  }
})

let Regist = Vue.extend({
  components: {
    Delegate: Delegate
  },
  template: '#regist',
  data:function () {
    return {
      delegateShow: false, // 显示协议
      userInfo: {
        phone: '',
        sms_code: '',
        password: '',
        real_name: '',
        company: '',
        area: '',
        company_type: '汽配商'
      }, // 用户信息
      checked: false,
      types: ['汽配商', '修理厂', '4S店', '其他'], // 是否阅读同意协议
      options: [], // 联级地区数据
      areaProps: { // 联级组件结构 key
        label: 'name',
        value: 'code',
        children: 'cities'
      },
      code: 0, // 初始值为 0，后面根据返回值赋值
      checkLoop: null, // interval 获取验证码
      checkStr: '获取验证码',
      loopTime: 60, // 验证码倒计时时间
    }
  },
  mounted:function () {
    this.handleAreaClick()
  },
  computed: {
    selectorReq:function () {
      return {p_code: this.code}
    },
    registReq:function () {
      return Object.assign({}, this.userInfo, {area: this.code})
    }
  },
  methods: {
    showDelegate:function () {
      this.delegateShow = true
    },
    getCertificationCode:function () {
      if(this.userInfo.phone.length < 1) {
        alert('请输入手机号')
        return
      }

      if(this.isLoop) return
      else this.isLoop = true

      let self = this

      axios.get('/community/base/sms_code', {params: {action: 'register', phone: this.userInfo.phone}})
        .then(function(res) {
          if(res.data.code !== 1) {
            alert(res.data.msg)
            self.isLoop = false
            return
          }
          
          self.checkStr = self.loopTime + 's'
          self.checkLoop = setInterval(function() {
            self.checkStr = --self.loopTime + 's'
            if(self.loopTime < 1) {
              self.loopTime = 60
              self.checkStr = '获取验证码'
              self.isLoop = false
              clearInterval(self.checkLoop)
            }
          }, 1000)
        })
    },
    regist:function () {
      let registReq = this.registReq

      if (registReq.phone.length < 1) {
        alert('请输入手机号')
        return
      }
      else if (registReq.sms_code.length < 1) {
        alert('请输入验证码')
        return
      }
      else if (registReq.password.length < 1) {
        alert('请输入密码')
        return
      }
      else if (registReq.real_name.length < 1) {
        alert('请输入姓名')
        return
      }
      else if (registReq.company.length < 1) {
        alert('请输入公司名称')
        return
      }
      else if (registReq.area.length < 1) {
        alert('请选择城市')
        return
      }
      else if (!this.checked) {
        alert('必须同意注册协议')
        return
      }
      
      axios.post('/community/user/reg', this.registReq)
        .then(function(res) {
          let data = res.data
          if (data.code === 1) {
            alert('注册成功，前往登录')
            location.href = "/login"
          }
          else alert(data.msg)
        })
        .catch(function(res) {
          console.log(res)
        })
    },
    typeClass:function (type) {
      return type === this.userInfo.company_type ? 'type-selected' : 'type'
    },
    handleAreaClick:function (value) {
      let level = 1
      let indexes = []
      if(value) {
        this.userInfo.area = '' // 取消选中地区
        if(value[1]) {
          value = value[1]
          this.code = value
          return
        }
        else if(value[0]) {
          value = value[0]
          level = 2
          let data = this.options
          for(let i = 0, j = data.length; i < j; i ++) {
            let item = data[i]
            if(item.code === value) {
              indexes[0] = i
              break
            }
          }
        }
      }

      this.code = value
      let self = this

      axios.get('/community/address/selector', {params: this.selectorReq})
        .then(function(res) {
          if(res.data.code === 1) {
            let data = res.data.data
            for(let i = 0, j = data.length; i < j; i ++) {
              let item = data[i]
              if(level < 2) item.cities = []
            }
            if(indexes.length === 1) self.options[indexes[0]].cities = data
            else self.options = data
          }
          else alert(res.body)
        })
    }
  }
})

new Vue({
  el: '#app',
  components: {
    Regist: Regist
  },
  template: '<Regist />'
})