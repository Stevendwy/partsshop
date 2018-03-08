<template>
  <div class="goods"
    v-if="goodsInfo">
    <div class="p-title">
      <span>{{currentSearchItem.pid}}</span>
      <span>{{currentSearchItem.label}}</span>
    </div>
    <div class="brands">
      <span class="title">品牌:</span>
      <span class="item"
        v-for="(brand, index) in brands" :key="index">{{`${brand.title}(${brand.count})`}}</span>
    </div>
    <div class="cities">
      <span class="title">城市:</span>
      <span class="item"
        v-for="(city, index) in cities" :key="index">{{`${city.title}(${city.count})`}}</span>
    </div>
    <a-table v-if="goodsInfo.length > 0"
      :headerTitles="headerTitles"
      :contentList="goodsInfo"
      @cartClick="addShoppingCart"></a-table>
  </div>
</template>

<script>
import aTable from "./table.vue";
import Vuex from 'vuex'

export default {
  components: {
    aTable
  },
  computed: {
    ...Vuex.mapState("part", ["goodsInfo", 'currentSearchItem']),
    brands() {
      let brands = [
        {
          title: '全部品牌',
          count: this.goodsInfo.length
        }
      ]

      return this.filter(brands, 'mill')
    },
    cities() {
      let cities = [
        {
          title: '全部城市',
          count: this.goodsInfo.length
        }
      ]
      return this.filter(cities, 'address')
    }
  },
  data() {
    return {
      headerTitles: ["零件号", "品牌", "库存", "销售价", "城市", "仓库", "服务商", "购物车"]
    };
  },
  methods: {
    ...Vuex.mapActions('part', ['addShoppingCart']),
    filter(list, key) {
      out:
      for(let i = 0, j = this.goodsInfo.length; i < j; i ++) {
        let goods = this.goodsInfo[i]

        for(let m = 0, n = list.length; m < n; m++) {
          let item = list[m]
          let title = item.title

          if(title === goods[key]) {
            item.count++
            continue out;
          }
        }

        let newOne = {
            title: goods[key],
            count: 1
          }
          list.push(newOne)
      }
      return list
    }
  }
}
</script>

<style scoped lang="less">
.goods {
  font-size: 16px;
  margin-top: 20px;

  .p-title {
    margin-bottom: 8px;

    span {
      margin-right: 20px;
    }
  }

  .remind {
    font-size: 14px;
    margin-top: 10px;

    .title {
      color: #9b9b9b;
    }

    .item {
      margin-left: 20px;
    }
  }
  
  .brands, .cities {
    .remind;
  }
}
</style>
