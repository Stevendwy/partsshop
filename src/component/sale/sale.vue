<template lang="pug">
.salepage
  .salehome(v-if='showhome') 首页添加切换showhome 显示内容
  .sale(v-else)
    .title-container
      .title(:style="titleBackground") {{theme.store}}
      img.logo(:src="theme.app_logo")
    .list(ref='list')
      .filters(v-show='cities.length > 0')
        span 城市：
        div(:class='cityClass(city)', v-for='(city, index) in cities', :key='index', @click='cityClick(city)') {{city}}
      .items
        .item(v-for='(item, index) in contentList', :key='index')
          img.part-img(:src='item.img', alt='商品图片')
          span.part-id {{item.pid}}
          span.part-annotation {{item.label}}
          div
            span.part-company {{item.supplier}}
            span.part-address {{item.address}}
          div
            span.part-price {{item.prices_sale}}
            span.part-carriage {{item.carriage}}
          button.cart-handle(v-if='!item.in_spcarts', @click='cartClick(item)') 加入购物车
          button.cart-handle-cancle(v-else='', @click='cartClick(item)') 取消购物车
      .no-more(v-if='this.noMore') 已经到底了！
      .no-more(v-else='')
        img(src='/static/img/loading.gif', alt='loading')
</template>

<script>
import Vuex from "vuex";
import { Loading } from 'element-ui';

export default {
  data() {
    return {
      showhome: true, //是否展示首页内容
      contentList: [], // 特卖列表
      cities: [], // 城市列表
      page: 1, // 初始请求页码
      isLoading: false, // 是否请求中，避免滚动多次请求
      noMore: false, // 是否还有更多
      selectedCity: "全部" // 默认选中全部
    };
  },
  computed: {
    ...Vuex.mapState(["appScrollTop", "theme"]),
    reqCity() {
      let city = this.selectedCity;
      if (city === "全部") city = "";
      return city;
    },
    titleBackground() {
      let logoBackgroundImg = this.theme.logo_background_img
      let style = `background: url(${logoBackgroundImg}) 0 0/100% auto no-repeat;`
      if(logoBackgroundImg && logoBackgroundImg.length > 0) style += "color: white;"
      return style
    }
  },
  watch: {
    appScrollTop(value) {
      // console.log(value)
      // console.log(window.innerHeight)
      // console.log(this.$refs.list.offsetHeight)
      if (value !== 0) {
        if (value + window.innerHeight >= this.$refs.list.offsetHeight + 90) {
          // 70 是上方高度, 20 是 padding-bottom
          this.loadMore();
        }
      }
    }
  },
  mounted() {
    this.contentList = []; // 初始化清空数据
    this.aList().then(res => {
      if (res.total_page === this.page || !res.total_page) this.noMore = true;
      this.isLoading = false;
    });
  },
  methods: {
    ...Vuex.mapMutations("cart", ["updateOrders"]),
    ...Vuex.mapMutations(["updateBadgeCount"]),
    aList(payload) {
      return u.get("/community/sailling", payload).then(res => {

        if (!res) return;

        payload = payload || {}; // 安全处理

        if (payload.loadMore)
          this.contentList.push(...res.data); // loadMore 在后方追加
        else this.contentList = res.data; // 其他直接替换

        let cities = res.item_city;
        if(cities) cities.unshift("全部");
        else cities = []
        this.cities = cities;

        return res;
      });
    },
    cartClick(item) {
      this.handleCart({ item });
    },
    handleCart(payload) {
      let item = payload.item;
      let obj = {
        p_uid: item.p_uid
      };
      let loading = Loading.service();

      let in_spcarts = item.in_spcarts;
      let url = in_spcarts ? "/community/spcart/del" : "/community/spcart/add";
      let nextInSpcarts = !in_spcarts;
      let mode = in_spcarts ? "decrease" : "plus";
      let message = in_spcarts ? "取消加入购物车" : "加入购物车成功";

      return u.post(url, obj).then(res => {
        loading.close();

        if (!res) return;

        this.$set(item, "in_spcarts", nextInSpcarts);
        this.updateOrders({ item, mode });
        this.updateBadgeCount({ mode });
        this.$message.success(message);
      });
    },
    handleReq(loadMore) {
      this.aList({ page: this.page, address: this.reqCity, loadMore })
        .then(res => {
          if (res.total_page === this.page || !res.total_page)
            this.noMore = true;
          this.isLoading = false;
        })
        .catch(err => (this.isLoading = false));
    },
    loadMore() {
      if (this.isLoading || this.noMore) return;

      this.page++;
      this.isLoading = true;
      this.handleReq(true);
    },
    cityClass(city) {
      return city === this.selectedCity ? "city-selected" : "city";
    },
    cityClick(city) {
      this.init();
      this.selectedCity = city;
      this.handleReq();
    },
    /**@description 初始化一些数据 */
    init() {
      this.page = 1;
      this.noMore = false;
    }
  }
};
</script>

<style lang="less" scoped>
.sale {
  display: flex;
  flex-direction: column;
  align-items: center;

  @d8line: 1px solid #d8d8d8;

  div {
    color: #333;
    font-size: 14px;
  }

  .title-container {
    position: relative;
    display: flex;
    justify-content: center;
    width: 1024px;
    height: 88px;
    background-color: white;
    border-bottom: @d8line;

    .title {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1024px;
      height: 100%;
      color: #ed6337;
      font-size: 20px;
    }

    .logo {
      position: absolute;
      left: 10px;
      top: 10px;
      height: e('calc(100% - 20px)');
      width: auto;
    }
  }

  .list {
    width: 1024px;
    min-height: 400px;

    @d8line: 1px solid #d8d8d8;
    @priceColor: #ff5502;

    .filters {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width: 1024px;
      height: 60px;
      padding: 0 46px;
      background: white;

      .city {
        width: 44px;
        line-height: 20px;
        margin-left: 50px;
        text-align: center;
        cursor: pointer;
      }

      .city-selected {
        .city;
        color: white;
        background: @priceColor;
      }
    }

    .items {
      display: flex;
      flex-wrap: wrap;
      background: white;
      margin-top: 10px;
      padding-bottom: 20px;

      .item {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 220px;
        height: 370px;
        border: @d8line;
        margin-left: 30px;
        margin-top: 20px;
        padding: 0 8px;

        .part-img {
          width: 204px;
          height: 204px;
        }

        .part-id {
          font-size: 14px;
          color: #333;
          font-weight: 800;
        }

        .part-annotation {
          font-size: 12px;
          color: #666;
        }

        & > div {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .span {
            font-size: 12px;
            color: #999;
          }

          .part-company {
            .span;
          }

          .part-address {
            .span;
          }

          .part-price {
            font-size: 20px;
            color: @priceColor;
          }

          .part-carriage {
            .span;
          }
        }

        .cart {
          height: 35px;
          font-size: 14px;
          color: white;
          letter-spacing: 0;
        }

        .cart-handle {
          .cart;
          background-image: linear-gradient(90deg, #e9414e 0%, #f3a533 100%);
          border: 1px solid #e9414e;
        }

        .cart-handle-cancle {
          .cart;
          background: #999;
          border: 0;
        }
      }
    }

    .no-more {
      width: 1024px;
      height: 40px;
      padding-bottom: 20px;
      text-align: center;
      font-size: 14px;
      color: #999;
      background: white;
      letter-spacing: 0;

      img {
        height: 100%;
      }
    }
  }
}
</style>