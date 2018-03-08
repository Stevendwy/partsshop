<template>
  <div class="address-container">
    <span class="ac-title">收货地址:</span>
    <div class="address">
      <el-button type="text" class="a-change"
        @click="addAddress">新增收货地址</el-button>
      <div class="a-container">
        <div class="ac-item"
          v-for="(address, index) in list" :key="index">
          <el-radio class="aci-radio"
            v-model="addrId"
            :label="address.addr_id"
            @change="radioChange">{{""}}</el-radio>
          <div class="ac-content">
            <div class="el-icon-service"><i></i>{{" " + (address.receiver || '')}}</div>
            <div class="el-icon-location"><i></i>{{" " + (address.area_cn || '')}}</div>
            <div class="el-icon-location-outline"><i></i>{{" " + (address.address || '')}}</div>
            <div class="el-icon-message"><i></i>{{" " + (address.zip_code || '')}}</div>
            <div class="el-icon-phone-outline"><i></i>{{" " + ((address.contact_phone || address.contact_tel) || '')}}</div>
          </div>
          <div class="ac-handle">
            <span class="ach-default"
              v-if="address.is_default">默认收货地址</span>
            <el-button type="text" class="ach-button"
              v-else
              @click="setDefault(address)">设置为默认收货地址</el-button>
            <el-button type="text" class="ach-button"
              @click="changeAddress(address)">修改</el-button>
            <el-button type="text" class="ach-button"
              @click="deleteAddress(address)">删除</el-button>
          </div>
        </div>
      </div>
      <handle-address
        :show="handleAddressShow"
        :close="closeHandleAddress"
        :originAddress="needChangeAddress"
        @callback="handleAddressDone" />
    </div>
  </div>
</template>

<script>
import handleAddress from '../../../common/handle-address.vue'
import Vuex from 'vuex'

export default {
  components: {
    handleAddress
  },
  data() {
    return {
      addressRes: {},
      handleAddressShow: false,
      addrId: '',
      changeAdd: {},
      needChangeAddress: {
        receiver: '',
        address: '',
        zip_code: '',
        contact_tel: '',
        contact_phone: '',
        is_default: false,
        area: '',
        company: ''
      } // 需要修改的地址
    }
  },
  computed: {
    contact() {
      return this.addressRes.contact || {}
    },
    list() {
      return this.addressRes.data || []
    }
  },
  mounted() {
    this.aAddress();
  },
  methods: {
    ...Vuex.mapMutations('cart/order', ['updateAI']),
    addAddress() {
      this.showHandleAddress()
    },
    aAddress() {
      let obj = { type: "default" }; // 默认与 all
      u.get("/community/order/address", obj, {closeMum: true}).then(res => {
        this.addressRes = res || {}
        this.checkRadio()
      });
    },
    showHandleAddress() {
      this.handleAddressShow = true
    },
    closeHandleAddress() {
      this.handleAddressShow = false
      this.resetNeedChangeAddress()
    },
    resetNeedChangeAddress() {
      this.needChangeAddress = {
        receiver: '',
        address: '',
        zip_code: '',
        contact_tel: '',
        contact_phone: '',
        is_default: false,
        area: '',
        company: ''
      }
    },
    handleAddressDone(payload) {
      let loading = this.$loading()

      u.post('/community/order/address', payload.req)
        .then(res => {
          loading.close()

          this.aAddress()
          this.closeHandleAddress()
        })
    },
    checkRadio() {
      this.list.forEach(item => {
        if(item.is_default) {
          this.addrId = item.addr_id
          this.updateAI({addr_id: this.addrId})
        }
      })
    },
    setDefault(address) {
      let addr_id = address.addr_id
      let obj = { addr_id, is_default: true }

      let loading = this.$loading()

      u.post("/community/order/address", obj).then(res => {
        loading.close()

        if(!res) return

        this.addrId = addr_id
        this.aAddress()
        this.$message({
          message: '设置默认成功',
          type: 'success'
        })
      })
    },
    changeAddress(address) {
      this.needChangeAddress = address
      this.showHandleAddress()
    },
    deleteAddress(address) {
      this.$confirm('确认要删除这条地址信息吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let loading = this.$loading()

        u.delete('/community/order/address', {addr_id: address.addr_id || this.addrId})
          .then(() => loading.close())
          .then(() => this.aAddress())
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })  
      })
    },
    radioChange(value) {
      this.updateAI({addr_id: value})
    }
  }
};
</script>

<style scoped lang="less">
.address-container {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  padding-bottom: 12px;
  background-color: white;

  @eColor: #ec6337;
  @d8line: 1px solid #d8d8d8;

  .ac-title {
    position: absolute;
    top: 10px;
    left: 20px;
    color: #999;
    font-size: 14px;
  }

  .address {
    width: 800px;
    min-height: 60px;
    font-size: 18px;

    .a-container {
      width: 100%;
      border: @d8line;

      .ac-item {
        display: flex;
        align-items: center;
        height: 60px;

        .aci-radio {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 60px;
          height: 60px;
          padding-left: 10px;
        }

        .ac-content {
          display: flex;
          align-items: center;
          height: 60px;
          border-left: @d8line;

          .el-icon-service {
            width: 36px;
            margin-left: 10px;
          }

          .el-icon-location {
            margin-left: 10px;
          }

          .el-icon-location-outline {
            width: 144px;
            margin-left: 10px;
          }

          .el-icon-message {
            width: 54px;
            margin-left: 10px;
          }

          .el-icon-phone-outline {
            width: 90px;
            margin-left: 10px;
            margin-right: 10px;
          }

          span {
            margin-left: 10px;
          }
        }

        .ac-handle {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          width: 200px;
          text-align: right;

          .ach-default {
            margin-right: 10px;
          }

          .ach-button {
            font-size: 12px;
          }
        }

        &>div {
          color: #333;
          font-size: 12px;
          white-space: pre;
        }
      }
    }

    .a-change {
      font-size: 12px;
      color: @eColor;
      cursor: pointer;
    }
  }
}
</style>
