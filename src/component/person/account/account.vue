<template>
  <div class="account">
    <div class="title">账户管理</div>
    <div>登录账号：<span>{{userInfo.username}}</span></div>
    <div>登录密码：<span>{{userInfo.pwd}}</span><span class="util" @click="showPassword">修改登录密码</span></div>
    <div>提现密码：<span>{{userInfo.pays_pwd}}</span><span class="util" @click="showPayPassword">设置提现密码</span></div>
    <div>用户姓名：<span>{{userInfo.full_name}}</span></div>
    <div>公司名称：<span>{{userInfo.company}}</span></div>
    <div>所在城市：<span>{{userInfo.area_cn}}</span></div>
    <div>公司类型：<span>{{userInfo.company_type}}</span></div>
    <div>
      营业执照：<div class="util uploaded" v-if="userInfo.has_license"></div><span class="util uploading" v-if="isUploading">正在上传...</span><span class="util" @click="preLoad" v-if="!userInfo.has_license && !isUploading">立即上传</span>
      <input ref='file' class="file" type="file" name="business-license" value="立即上传"
        @change="changeFile"/>
    </div>
    <div class="password-container"
      v-if="passwordShow">
      <Password
        @close="closePassword"
        :title="pTitle"
        :action="pAction" />
    </div>
  </div>
</template>

<script>
import Password from './password/password.vue'
import Vuex from 'vuex'

export default {
  components: {
    Password,
  },
  data() {
    return {
      isUploading: false, // 是否上传中
      passwordShow: false,// 显示修改密码
      pTitle: '手机验证修改密码', // 修改密码的 title
      pAction: 'changepwd', // 默认是修改密码
    }
  },
  computed: {
    ...Vuex.mapState(['userInfo'])
  },
  mounted() {

  },
  methods: {
    ...Vuex.mapActions(['aUserInfo']),
    showPassword() {
      this.passwordShow = true
      this.pTitle = '手机验证修改密码'
      this.pAction = 'changepwd'
    },
    showPayPassword() {
      this.passwordShow = true
      this.pTitle = '设置提现密码'
      this.pAction = 'pays'
    },
    closePassword() {
      this.passwordShow = false
    },
    preLoad() {
      this.$refs.file.click()
    },
    changeFile(e) {
      if(this.isUploading) return
      else this.isUploading = true

      let formData = new FormData();
      formData.append('action', 'license');
      formData.append('file_name', 'file');
      formData.append('file', e.target.files[0]);

      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      axios.post('/community/file/uploads', formData, config)
        .then(res => {
          this.isUploading = false
          this.haveUploaded = true
          this.aUserInfo() // 上传成功后刷新一下用户状态
        })
    }
  }
}
</script>

<style scoped lang="less">
.account {
  width: 100%;
  height: 100%;
  padding: 0 40px;

  @eColor: #ec6337;
  @d8line: 1px solid #d8d8d8;

  &>div:not(.password-container) {
    display: flex;
    align-items: center;
    height: 20px;
    margin-top: 20px;
    font-size: 14px;
    color: #666;

    &>span:nth-child(1) {
      margin-left: 15px;
      padding-right: 4px;
    }

    &>span:nth-child(2) {
      padding-left: 4px;
      border-left: @d8line;
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
    background: url(~/static/img/spirit.png) 0 -520px ~'/' 40px auto no-repeat;
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
}
</style>
