<template>
  <div class="detail-container">
    <div class="base">
      <div class="b-title">基础信息</div>
      <div class="b-info"
        v-for="(baseInfo, index) in baseInfoList" :key="index + baseInfo">
        <div class="bi-title" v-html="baseInfo.key + ':'" />
        {{baseInfo.value}}
      </div>
    </div>
    <div class="cars" v-if="carsInfo.length"> 
      <div class="c-title">适用车型</div>
      <div>
        <div class="ct-title">
          <div class="ctt-item" v-for="(titleList,index) in carHeaderTitles" :key="index">
            {{titleList}}
          </div>
        </div>
        <div class="ct-body">
          <div class="ctb-group" v-for="(rowGroup,index) in carsInfo" :key="index + '1'">
            <div class="ctb-one" v-for="(oneRow,ins) in rowGroup" :key="ins + '2'">
              <div class="ctb-cell"></div>
              <div class="ctb-cell">{{oneRow.cars_model}}</div>
              <div class="ctb-cell">{{oneRow.market}}</div>
              <div class="ctb-cell">{{oneRow.year}}</div>
              <div class="ctb-cell">{{oneRow.group_name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  data() {
    return {
      carHeaderTitles: ["", "车型", "市场", "年份", "零件组"],
      priceHeaderTitles: ["零件号", "产地", "库存", "销售价", "城市", "仓库", "服务商", "购物车"]
    };
  },
  computed: {
    ...Vuex.mapState("part", ["baseInfoList", "pricesInfo", "carsInfo"])
  },
  methods: {
    ...Vuex.mapActions("part", ["addShoppingCart"]),
  }
};
</script>

<style scoped lang="less">
.detail-container {
  .base {
    margin-top: 20px;

    .b-title {
      font-size: 16px;
    }

    .b-info {
      display: flex;
      align-items: center;
      width: 100%;
      height: 40px;
      border-bottom: 1px dashed #d8d8d8;

      .bi-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100px;
        height: 100%;
        padding: 8px;
        margin-right: 12px;
        color: #999;
      }
    }
  }

  .cars {
    margin-top: 20px;

    .c-title {
      font-size: 16px;
      margin-bottom: 8px;
    }

    .ct-title {
      width: 100%;
      height: 40px;
      background: #f2f2f2;
      line-height: 40px;
      border: 1px solid #d8d8d8;
      border-bottom: none;
      display: flex;
      .ctt-item {
        display: inline-block;
        font-size: 14px;
        color: #333333;
        text-align: center;
        &:nth-child(1) {
          width: 5%;
        }
        &:nth-child(2) {
          width: 35%;
        }
        &:nth-child(3) {
          width: 11%;
        }
        &:nth-child(4) {
          width: 19%;
        }
        &:nth-child(5) {
          width: 30%;
        }
      }
    }
    .ct-body {
      border: 1px solid #d8d8d8;
      border-top: none;
      width: 100%;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
    }
    .ctb-group {
      display: block;
      transition: 0.2s all linear;
      width: 100%;
      .ctb-one {
        width: 100%;
        align-items: center;
        display: flex;
        padding: 10px 0;
        &:hover {
          margin-bottom: 2px;
          margin-left: 4px;
          width: 99%;
          box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
        }
        .ctb-cell {
          box-shadow: none;
          font-size: 14px;
          min-height: 20px;
          color: #333333;
          text-align: center;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          &:nth-child(1) {
            width: 5%;
          }
          &:nth-child(2) {
            width: 35%;
          }
          &:nth-child(3) {
            width: 11%;
          }
          &:nth-child(4) {
            width: 19%;
          }
          &:nth-child(5) {
            width: 30%;
          }
        }
      }
    }
  }
}
</style>
