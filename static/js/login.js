"use strict"

// 默认加载供应商列表 先干掉
// !function() {
//   axios.get('http://www.yhcqp.com/system/members')
//     .then(res => {
//       if(!res.data) return

//       let companysDOM = document.getElementById('companys')
//       let companys = res.data.data
//       let companysLength = companys.length
//       for(let i = 0, j = (parseInt(companys.length / 6) + 1) * 6; i < j; i ++) {
//         let isEmpty = i >= companysLength
//         let company = isEmpty ? { name: '敬请期待' } : companys[i]

//         let li = ""
//         let className = ""
//         if(parseInt(i / 6) % 2 === 1) {
//           className = "even-row"
//           if(isEmpty) className += ' empty'
//         }
//         else {
//           className = "uneven-row"
//           if(isEmpty) className += " empty"
//         }
//         li = "<li class=\"" + className + "\">" + company.name + "</li>"
//         companysDOM.innerHTML += li
//       }
//     })
// }()

let Login = Vue.extend({
  template: '#login',
  mounted: function() {
    this.handleLoginDisplay()
    this.username = localStorage.getItem('ppy-alliance-username') || ''
    this.password = localStorage.getItem('ppy-alliance-password') || ''
    if(this.username.length > 0 || this.password.length > 0) this.checked = true
  },
  data: function() {
    return {
      username: '',
      password: '',
      checked: false // 是否保存密码
    }
  },
  watch: {
    checked: function(newValue) {
      let username = ''
      let password = ''

      if(newValue) {
        username = this.username
        password = this.password
      }

      localStorage.setItem('ppy-alliance-username', username)
      localStorage.setItem('ppy-alliance-password', password)
    }
  },
  methods: {
    handleLoginDisplay:function () {
      let login = this.$refs.login
      let loginButton = document.querySelector('#login-button')
  
      if(location.search.match(/frominside=true/)) {
        login.style.display = 'none'
        loginButton.style.display = 'none'
        
        axios.get('http://www.yhcqp.com/community/user/profile')
          .then(function(res) {
            if(!res.data || res.data.code !== 1) {
              login.style.display = 'flex'
              loginButton.style.display = 'inline-block'
            }
          })
          .catch(function(err) {
            login.style.display = 'flex'
            loginButton.style.display = 'inline-block'
          })
      }else {
        login.style.display = 'flex'
        loginButton.style.display = 'inline-block'
      }
    },
    login: function() {
      if (this.username.length < 1) {
        alert('请输入用户名')
        return
      }

      if (this.password.length < 1) {
        alert('请输入密码')
        return
      }

      let body = {
        username: this.username,
        password: this.password
      }

      let self = this

      axios.post('http://www.yhcqp.com/community/login', body)
        .then(function(res) {
          let data = res.data
          if (data.code === 1) {
            if(self.checked) {
              localStorage.setItem('ppy-alliance-username', self.username)
              localStorage.setItem('ppy-alliance-password', self.password)
            }
            location.href = "./index.html"
          }
          else alert(data.msg)
        })
        .catch(function(res) {
          console.log(res)
        })
    },
    regist: function() {
      location.href='/regist'
    },
    forget: function() {
      this.$emit('route', {component: 'Forget'})
    }
  }
})

let Forget = Vue.extend({
  template: '#forget',
  data: function() {
    return {
      inputData: {
        phone: localStorage.getItem('ppy-alliance-username') || '',
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
    submitReq: function() {
      return {
        phone: this.inputData.phone,
        password: this.inputData.password,
        sms_code: this.inputData.sms_code
      }
    }
  },
  methods: {
    back: function() {
      this.$emit('route', {component: 'Login'})
    },
    getCertificationCode: function() {
      if(this.isLoop) return
      else this.isLoop = true

      let self = this

      axios.get('/community/base/sms_code', {params: {action: 'findpwd', phone: this.inputData.phone}})
        .then(function(res) {
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
    submit: function() {
      let inputData = this.inputData
      if(inputData.phone.length < 1) {
        alert('请输入手机号')
        return
      }
      else if(inputData.sms_code.length < 1) {
        alert('请输入验证码')
        return
      }
      else if(inputData.password.length < 1) {
        alert('请输入密码')
        return
      }
      else if(inputData.checkPassword !== inputData.password) {
        alert('请输入相同的确认密码')
        return
      }

      let self = this

      axios.post('/community/user/find_pwd', this.submitReq)
        .then(function(res) {
          if(res.data.code === 1) {
            alert('修改密码成功')
            self.$emit('route', {component: 'Login'})
          }
          else alert(res.data.msg)
        })
    }
  }
})

new Vue({
  el: '#app',
  components: {
    Login: Login,
    Forget: Forget
  },
  template: '<component :is="witchOne" @route="updateWitchOne" />',
  data: {
    witchOne: 'Login'
  },
  methods: {
    updateWitchOne: function(payload) {
      this.witchOne = payload.component
    }
  }
})

Vue.config.keyCodes = {
  v: 86,
  f1: 112,
  // camelCase 不可用
  mediaPlayPause: 179,
  // 取而代之的是 kebab-case 且用双引号括起来
  "media-play-pause": 179,
  up: [38, 87]
}