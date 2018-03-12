<template lang="pug">
  .app(@scroll="updateAppScrollTop({scrollTop: $event.target.scrollTop})")
    y-header
    router-view
</template>

<script>
import yHeader from './component/header/header.vue'
import Vuex from 'vuex'

export default {
  components: {
    yHeader
  },
  mounted() {
    this.untouch()
    setInterval(this.untouch, 15000) // 循环请求未处理订单状态
    this.aUserInfo()
  },
  methods: {
    ...Vuex.mapMutations(['updateAppScrollTop']),
    ...Vuex.mapActions(['untouch', 'aUserInfo']),
  }
}
</script>


<style lang='less'>
* {
  box-sizing: border-box;
}

html {
  background-color: #f2f2f2;
}

html, body, .app {
  height: 100%;
}

body {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#mum {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: none;
  background: rgba(255,255,255,.8) url(https://cdns.007vin.com/img/mum.gif) center no-repeat;
  z-index: 10;
}

.app {
  width: 100%;
  overflow-y: scroll;

  button, input {
    outline: none;
  }

  button {
    cursor: pointer;
  }

  ::-moz-placeholder {
    color: #999;
  }

  .search-icon {
    
  }

  .el-dialog__header {
    text-align: center;
  }

  .el-upload {
    width: 100%;

    .el-upload-dragger {
      width: 100%;
    }
  }
}

// hub.vue
.hub-result-container{
  .hub-filter{
      padding: 7px 12px 7px 11px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .el-checkbox__label{
        font-size: 12px;
      }
      .el-checkbox{
        .el-checkbox__inner:hover{
          border-color: #0076FF;
        }
      }
      .is-checked{
        .el-checkbox__inner{
          background-color: #0076FF;
          border-color: #0076FF;
        }
        .el-checkbox__label{
          color: #333333;
        }
      }
      
      .filter-btn{
        width: 64px;
        height: 32px;
        margin-left: 20px;
      }

      .hub-filter-right{
        font-size: 12px;
        color: #999999;
      }

      .el-button:hover{
        color: white;
        border-color: #0076FF;
        background-color: #0076FF;
      }
      .el-button:focus{
        color: #333333;
        border-color: white;
        background-color: white;
        border: 1px solid #d8dce5;
      }
    }

  .hrc-row{
    .el-checkbox{
      width: 90%;
      -webkit-user-select: auto;
      -moz-user-select: auto;
      -ms-user-select: auto;
      user-select: auto;
      
      .el-checkbox__inner:hover{
        border-color: #0076FF;
      }
    }
    .el-checkbox-group{
      .is-checked{
        .el-checkbox__inner{
          background-color: #0076FF;
          border-color: #0076FF;
        }
      }
      
      .el-checkbox__label{
        font-size: 14px;
        color: #333333;
        margin-bottom: 12px;
      }
    }
    
  }
}
</style>
