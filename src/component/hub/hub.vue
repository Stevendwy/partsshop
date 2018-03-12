<template lang="pug">
.hub-container
  .title-container
    .title
      //- span.t-name {{theme.application}}卖家中心
      span.t-name 小麦汽配卖家中心
      span.t-company {{userInfo.company}}
      span.t-hub(v-once='') 库存管理
  .h-edit(v-if="editing")
    .h-back 
      .h-backleft
        span 库存管理
        span <
        span 编辑商品
      .h-backright
        el-button.refresh(type='warning', :loading='fLoading', @click="backEdit" ) 返回
        el-button.save(type='info', plain , disabled ) 预览
        el-button.save(type='success', :loading='sLoading', @click='editSave' ) 保存
    e-dit(name="编辑")
  .h-content(v-else)
    search(title='库存管理', @search='search', @change='searchChange')
    .total-info
      .info
        .total
          span.remind 上线状态:
          span(:class="!currentReq.online && 'selected'", @click="checkOnline({online: ''})") 全部库存({{total}})
          span(:class="currentReq.online === '1' && 'selected'", @click="checkOnline({online: '1'})") 已上线库存({{total_online}})
          span(:class="currentReq.online === '0' && 'selected'", @click="checkOnline({online: '0'})") 待上线库存({{total_offline}})
      .ctrl
        el-button.refresh(type='success', v-once='', :loading='fLoading', @click='refresh') 刷新
        el-button.save(type='primary', v-once='', :loading='sLoading', @click='save') 保存
    h-table(ref='hubTable')
</template>

<script>
import search from "./search.vue";
import hTable from "./table.vue";
import eDit from './edit.vue';
import Vue from "vue";
import Vuex from "vuex";

export default {
  components: {
    search,
    hTable,
    eDit
  },
  data() {
    return {
      fLoading: false,
      sLoading: false
    };
  },
  computed: {
    ...Vuex.mapState(["userInfo", 'theme']),
    ...Vuex.mapState("hub", [
      "editing",
      "agency",
      "total",
      "total_online",
      "total_offline",
      "currentReq"
    ])
  },
  mounted() {
    this.aUserInfo();
  },
  methods: {
    ...Vuex.mapActions(["aUserInfo"]),
    ...Vuex.mapMutations("hub",["updateCurrentReq","editRoundly"]),
    ...Vuex.mapActions("hub", ["aList", "edit"]),
    refresh() {
      this.fLoading = true;
      this.aList().then(() => (this.fLoading = false));
      this.$refs.hubTable.reset()
    },
    save() {
      this.sLoading = true;
      this.edit({ item: {}, closeMum: true }).then(
        () => (this.sLoading = false)
      );
    },
    search(query) {
      this.aList();
    },
    searchChange(query) {
      this.updateCurrentReq({ query, page: 1 });
      if (query.length < 1) this.aList(); // 如果输入框字数为 0，默认请求一次
    },
    checkOnline(payload) {
      this.updateCurrentReq({ online: payload.online, page: 1 });
      this.aList();
      this.$refs.hubTable.reset()
    },
    backEdit (payload){
      this.editRoundly({showedit:"hidedit"})
    },
    editSave (payload) {
      console.log("saveedit")
    }
  }
};
</script>

<style lang="less" scoped>
.hub-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  @sColor: #0063ff;

  div {
    color: #333;
    font-size: 14px;
  }

  .title-container {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: white;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.24);
    border-radius: 2px;
    z-index: 2;

    .title {
      position: relative;
      display: flex;
      align-items: center;
      width: 1024px;
      height: 60px;

      .t-name {
        font-size: 20px;
        color: #0076ff;
        margin: 0 50px 0 20px;
      }

      .t-company {
        font-size: 14px;
        color: #333;
      }

      .t-hub {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70px;
        height: 32px;
        margin-left: 40px;
        font-size: 14px;
        // color: #20a0ff;
        // border: 1px solid #20a0ff;
        border-radius: 4px;
        // cursor: pointer;
      }
    }
  }

  .h-edit{
      width: 1024px;
      margin: 0 auto;
      .h-back {
        display: flex;
        height: 48px;
        line-height: 48px;
        .h-backleft{
            width: 25%;
            &>span{
              font-size: 16px;
              margin: 0 10px;
            }
            &>span:nth-child(1){
              margin-left: 20px;
              color: #4C67E7;
            }
            &>span:nth-child(2){
              margin: 0;
              color: #999999;
            }
            &>span:nth-child(3){
              color: #333333;
            }
        }
        .h-backright{
          &>button{
            width: 80px;
            border-radius: 4px;
            color: white;
            font-size: 14px;
            padding: 8px 10px;
          }

        }
      }
    }

  .h-content {
    background: white;

    .total-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 1024px;
      height: 50px;
      background: white;

      .info {
        display: flex;
        flex-direction: column;

        .user {
          margin-left: 10px;
          margin-bottom: 10px;

          span {
            margin-left: 8px;
          }
        }

        .total {
          margin-left: 20px;

          span {
            margin-right: 40px;
            text-decoration: underline;
            cursor: pointer;
          }

          .selected {
            color: @sColor;
          }

          .remind {
            margin: 0 10px;
            color: #9b9b9b;
          }
        }
      }

      .ctrl {
        margin-right: 10px;

        button {
          width: 80px;
          border-radius: 4px;
          color: white;
          font-size: 14px;
          padding: 8px 10px;
        }

        .save {
          background: @sColor;
          border-color: @sColor;
        }
      }
    }
  }
}
</style>
