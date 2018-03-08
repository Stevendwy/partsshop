<template>
  <div class="address-container">
    <div class="title">
      <span>订单信息</span>
    </div>
    <div class="address">
      <div class="a-container">
        <span><i class="el-icon-service"></i>{{" " + (addressInfo.receiver || '')}}</span>
        <span><i class="el-icon-location"></i>{{" " + (addressInfo.area_cn || '')}}</span>
        <span><i class="el-icon-location-outline"></i>{{" " + (addressInfo.address || '')}}</span>
        <span><i class="el-icon-message"></i>{{" " + (addressInfo.zip_code || '')}}</span>
        <span><i class="el-icon-phone-outline"></i>{{" " + ((addressInfo.contact_phone || expressRes.contact_tel) || '')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['addressInfo'],
  mounted() {
    // this.aList()
  },
  methods: {
    changeAddress() {
      
    },
    aList() {
      // u.get('/community/order/logistics/info')
    }
  }
}
</script>

<style scoped lang="less">
.address-container {
  margin-top: 10px;
  width: 1024px;

  .title {
    display: flex;
    align-items: center;
    width: 1024px;
    height: 40px;
    background-color: #fdefeb;
    font-size: 14px;
    color: #333;

    span {
      margin-left: 10px;
    }
  }

  .address {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 1024px;
    height: 60px;
    margin-top: 10px;
    font-size: 18px;
    background-color: white;

    .a-container {
      width: 100%;

      .ac-title {
        margin-left: 10px;
        color: #999;
      }

      span {
        color: #333;
        font-size: 12px;
        margin-left: 64px;
        white-space: pre;
      }
    }
  }
}
</style>
