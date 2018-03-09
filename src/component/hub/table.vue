<template>
  <div class="hub-result-container">
    <div class="hub-filter">
      <div class="hub-filter-left">
          <el-checkbox  v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-button size="small" @click="handleTypeToDo('delete')" class="filter-btn">删除</el-button>
          <el-button size="small" @click="handleTypeToDo('online')" class="filter-btn">上线</el-button>
          <el-button size="small" @click="handleTypeToDo('leaveline')" class="filter-btn">下线</el-button>
      </div>
      <div class="hub-filter-right" v-if='lastupdatetime'>
        最近一次更新：{{lastupdatetime}}
      </div>
    </div>
    <div class="hub-result" v-if="resultList.length > 0">
      <div class="hr-header">
        <div class="hrh-item"
          v-for="title in headerTitles" :key="title">
          {{title}}
        </div>
      </div>
      <div class="hr-content">
        <div class="hrc-row"
          v-for="(item, index) in resultList" :key="index + 'item'">

          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">          
          <div class="hrcr-item">
            <el-checkbox  :label="item.pid" :key="item.pid"></el-checkbox>
            <!-- <span>{{item.pid}}</span> -->
          </div>
          </el-checkbox-group>

          <div class="hrcr-item">
            <t-select
              :item="item"
              type="label"
              @update="edit"/>
          </div>
          
          <div class="hrcr-item">
            <span>{{item.amount_original}}</span>
            <t-select
              :item="item"
              type="amount"
              :titles="bch.amounts || []"
              @update="edit"/>
          </div>

          <div class="hrcr-item">
            <!-- <span>{{item.channel}}</span> -->
            <t-select
              :item="item"
              type="mill"
              :titles="bch.brands"
              @update="edit"/>
          </div>

          <div class="hrcr-item">
            <span>{{item.amount_original}}</span>
            <t-select
              :item="item"
              type="amount"
              :titles="bch.amounts || []"
              @update="edit"/>
          </div>
          
          <div class="hrcr-item">
            <span>{{item.floor_price}}</span>
            <input class="price-input" type="text"
              :placeholder="item.prices"
              @keydown.13="updatePrice($event.target.value, item)"
              @blur="updatePrice($event.target.value, item)">
          </div>
          <!-- <div class="hrcr-item">
            <span>{{item.shelves}}</span>
          </div>
          <div class="hrcr-item">
            <span v-if="isOnline(item)">已上线</span>
            <span class="offline" v-else>未上线</span>
            <span v-if="isSailing(item)">特卖中</span>
            <span class="not-sailing" v-else-if="item.share_requesting">申请中</span>
            <span class="not-sailing" v-else></span>
          </div> -->
          <div class="hrcr-item">
            <div class="edit">
              <span @click="showEdit">编辑</span>
              <span v-if="isOnline(item)" @click="offline({online: 0, item})">下线</span>
              <span v-else @click="online({online: 1, item})">上线</span>
              <!-- <span v-if="isSailing(item) || item.share_requesting" @click='cancelSale(item)'>取消特卖</span> -->
              <!-- <span v-else @click='applySale(item)'>申请特卖</span> -->
            </div>
          </div>
        </div>
        <el-dialog
          class="dialog"
          title="申请特卖"
          :visible.sync="dialogVisible"
          width="496px">
          <div class="upload-container"
            v-if="!imgChange">
            <el-upload
              class="upload"
              ref='upload'
              drag
              :show-file-list="false"
              action="https://jsonplaceholder.typicode.com/posts/"
              :auto-upload="false"
              :on-change="fileChange">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
            <!-- <span class="no-img">缺少图片</span> -->
          </div>
          <div class="cropper-container"
            v-else>
            <vue-cropper
              ref="cropper"
              :img="cropImg"
              :outputSize="1"
              outputType="png"
              :autoCrop="true"
              :autoCropWidth="180"
              :autoCropHeight="180"
              :fixedBox="true" />
            <el-button class="cropper-back" @click="cropperBack">重新选择</el-button>
          </div>
          <div class="p-count-container">
            <span>特卖数量:</span>
            <el-input-number class="p-count" v-model="saleCount" @change="inputNumberChange($event)" :min="1" :max="999" label="描述文字"></el-input-number>
            <span class="suggest" v-if="suggestCount !== 0">（建议 > {{suggestCount}}个）</span>
            <!-- <span class="warning">低于数量要求</span> -->
          </div>
          <div class="p-price-container">
            <span>特卖价格: </span>
            <span class="money">¥</span>
            <el-input class="d-price" placeholder="输入价格" v-model="salePrice" type="info"/>
            <span class="suggest" v-if="suggestPrice !== 0">（建议 < {{suggestPrice}}）</span>
            <!-- <span class="warning">高于建议价格</span> -->
          </div>
          <div class="apply-container">
            <el-button class="apply" @click="apply">申请</el-button>
            <span><span class="warning">*</span>整点竞价上线</span>
          </div>
        </el-dialog>
      </div>
    </div>
    <div class="sale-null" v-else>
      <img :src="hubNullUrl" alt="没有库存" />
    </div>
    <span class="hr-remind">*品牌设置为空、或价格为空、或库存为0时，无法上线。</span>
    <pagination v-show="resultList.length > 0"
      :countTotal="total_page"
      :initialSelectedIndex='0'
      :countPage='5'
      :pageClick="paginationPageClick" />
  </div> 
</template>

<script>
import pagination from "../common/pagination.vue";
import tSelect from "./select.vue";
import Vue from "vue";
import Vuex from "vuex";
import VueCropper from "./cropper.vue";
import { Dialog, Upload, Input, InputNumber , Checkbox ,CheckboxGroup} from "element-ui";
Vue.use(Dialog);
Vue.use(Upload);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);

export default {
  components: {
    pagination,
    tSelect,
    VueCropper
  },
  data() {
    return {
      headerTitles: [
        "零件号",
        "名称",
        "品质",
        "品牌设置",
        "库存、售卖数量",
        "底价、销售价",
        // "货架",
        // "状态",
        "操作"
      ],
      dialogVisible: false,
      saleCount: 3, // 默认建议上传 3 个以上
      salePrice: 0, // 出售价格
      cropImg: "", // 需要裁剪的图片链接
      imgChange: false, // 图片是否变化，决定显示那个图片处理工具
      suggestCount: 0, // 建议多少个
      suggestPrice: 0, // 建议多少元
      currentItem: null, // 当前操作的 item
      checkAll: false,    //全选标志
      checkedCities: [],  //选中数据
      pidList:[],         //选中的pid
    };
  },
  computed: {
    ...Vuex.mapGetters(['hubNullUrl']),
    ...Vuex.mapState("hub", ["resultList", "total_page", "bch" ,"lastupdatetime"]),
    ...Vuex.mapGetters("hub", ["getEventList"])
  },
  methods: {
    ...Vuex.mapMutations("hub", ["updateCurrentReq", "editRoundly"]),
    ...Vuex.mapActions("hub", [
      "aList",
      "online",
      "offline",
      "setSale",
      "edit",
      "batch"
    ]),
    paginationPageClick(index) {
      this.updateCurrentReq({ page: index + 1 });
      this.aList();
      this.reset();
      // this.checkedCities = []
      // this.checkAll = false
    },
    updatePrice(price, item) {
      this.edit({ price, item });
    },
    isOnline(item) {
      return item.online === 1;
    },
    online(payload) {
      if (payload.item.online === 1) {
        this.$message.error("该零件已上线");
      } else {
        this.edit(payload);
      }
    },
    offline(payload) {
      if (payload.item.online === 0) {
        this.$message.error("该零件已下线");
      } else {
        this.edit(payload);
      }
    },
    isSailing(item) {
      return item.sailing === 1;
    },
    showEdit(payload) {
      this.editRoundly({showedit:"showedit"})
    },
    applySale(item) {
      if(item.amount < 1 || item.label.length < 1 || item.prices < 1) {
        alert("库存数量或销售价格为0，或品牌名为空")
        return
      }
      this.currentItem = item;
      this.saleCount = item.amount_sale || 0;
      this.salePrice = item.prices_sale || 0;
      this.cropImg = item.img || "";
      // 申请特卖
      this.dialogVisible = true;
      this.imgChange = this.cropImg.length > 0; // 重新打开时候清空图片
      // this.edit({sailing: 1, item})
      u.get("/community/supersale/info", { p_uid: item.p_uid }).then(res => {
        this.suggestCount = res.amount_suggest || 0;
        this.suggestPrice = res.price_suggest || 0;
      });
    },
    cancelSale(item) {
      this.edit({sailing: 0, item})
        .then(() => this.aList())
    },
    fileChange(file, fileList) {
      this.cropImg = file.url;
      this.imgChange = true;
    },
    inputNumberChange(number) {
      // console.log(number);
    },
    // 申请特卖会填写完毕的申请按钮
    apply() {
      let p_uid = this.currentItem.p_uid;
      let req = {
        p_uid,
        amount_sale: this.saleCount,
        prices_sale: this.salePrice
      };

      if (this.cropImg.length > 0) {
        this.$refs.cropper.startCrop();
        this.$refs.cropper.getCropBlob(data => {
          // do something
          let formData = new FormData();
          formData.append("action", "super_sale_img");
          formData.append("code", p_uid);
          formData.append("file_name", "file");
          formData.append("file", data);
          let config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          };

          u.post("/community/file/uploads", formData, config)
            .then(res => {
              if (res) return u.post("/community/supersale/info", req);
            })
            .then(res => {
              if (!res) return;
              this.aList();
              this.$message({
                type: "success",
                message: "申请队列中..."
              });
              this.dialogVisible = false;
            });
        });
      } else {
        u.post("/community/supersale/info", req)
          .then(res => {
            if (!res) return;
            this.aList();
            this.$message({
              type: "success",
              message: "申请队列中..."
            });
            this.dialogVisible = false;
          });
        // this.$message({
        //   message: "请完善上架资料",
        //   type: "error"
        // });
      }
    },
    cropperBack() {
      this.imgChange = false;
      this.cropImg = "";
    },
    handleCheckAllChange(val) {
      let self = this
      let _data = self.getEventList
      let _datapid = []
      for (let index = 0; index < _data.length; index++) {
        _datapid.push(_data[index].pid)
      }
      self.checkedCities = val ? _datapid : [];
      self.pidList = self.checkedCities
    },
    handleCheckedCitiesChange(value) {
      let self = this
      let checkedCount = value.length;
      self.pidList = value
      self.checkAll = checkedCount === self.getEventList.length;
    },
    handleTypeToDo(type){
      let self = this
      let data = self.getEventList
      let p_uid = []
      let gonext = true

      for (let index = 0; index < data.length; index++) {
        if (self.pidList.indexOf(data[index].pid) !== -1) {
            if (type === "online") {
              if(data[index].amount <= 0 || data[index].mill.length < 1 || data[index].prices <= 0) {
                // 上线条件
                // 品牌 factory  不为空
                // 库存 location  大于0
                // 数量 amount 大于0
                // 价格 prices 大于0
                alert("库存数量或销售价格为0，或品牌名为空")
                gonext = false
                return;
              }else{
                p_uid.push(data[index].p_uid)
              }
            }else {
              p_uid.push(data[index].p_uid)
            } 
          }
      }

      // 拼接发送的数据
      let setdata = p_uid.join()
      let obj = {
        pid:setdata
      }
      if (type === "delete") {
        obj.action = "delete"
      }else {
        obj.action = "online"
        obj.code = type === "online" ? "1" : "0"
      }

      if(p_uid.length < 1){
        self.$message({
          message: "请选择零件",
          type: "error"
        });
      }
      if (gonext && p_uid.length > 0) {
        self.batchs(obj)
      }      
    },
    batchs(obj){
      let self = this
      self.batch(obj).then(
        () => {
          this.aList()
          this.reset()
        }
      );
    },
    reset(){
      let that = this
      that.checkedCities = []
      that.checkAll = false
    }
  }
};
</script>

<style scoped lang="less">
.hub-result-container {
  font-size: 16px;

  @d8line: 1px solid #d8d8d8;
  @sColor: #0063ff;
  @warningColor: #ff001f;

  .hub-result {
    width: 1024px;
    min-height: 394px;
    margin-bottom: 10px;

    .row {
      display: flex;
      width: 100%;
      min-height: 90px;
      border-bottom: @d8line;
    }

    .item {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100%;

      span {
        white-space: pre-wrap;
      }

      .price-input {
        position: relative;
        width: 72px;
        height: 32px;
        padding-left: 8px;
        border: 1px solid @sColor;
        color: #666;
        border-radius: 4px;
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.4);
      }

      .offline,
      .not-sailing {
        color: #999;
      }

      .edit {
        // display: flex;
        // flex-direction: column;
        // text-align: center;
        // justify-content: space-around;
        // height: 100%;
        display: flex;
        flex-direction: row;
        height: 100%;
        align-items: center;

        span{
          color: #0076ff;
        }
        // button {
        //   display: block;
        //   width: 60px;
        //   height: 24px;
        //   padding: 0;
        //   border: 0;
        //   margin: 5px 0;
        //   border-radius: 4px;
        //   background: #0076ff;
        //   color: white;
        //   font-size: 14px;
        //   outline: none;
        // }
      }

      &:nth-child(1) {
        width: 200px;
      }
      &:nth-child(2) {
        width: 148px;
      }
      &:nth-child(3) {
        width: 102px;
      }
      &:nth-child(4) {
        width: 110px;
      }
      &:nth-child(5) {
        width: 150px;
      }
      &:nth-child(6) {
        width: 204px;
      }
      &:nth-child(7) {
        width: 110px;
      }
      &:nth-child(8) {
        width: 84px;
      }
      &:nth-child(9) {
        width: 140px;
      }
      &:nth-child(10) {
        width: 142px;

        .hasTax {
          cursor: pointer;
          color: #4990e2;
        }

        .noTax {
          cursor: pointer;
          color: #ec6337;
        }
      }

      & > span {
        display: inline-block;
        width: 100%;
        height: 32px;
        word-wrap: break-word;
        text-align: center;
        padding: 2px 0;
        line-height: 32px;
      }
    }

    .hr-header {
      .row;
      min-height: 32px;
      font-size: 12px;
      color: #999;
      background-color: #f5f5f5;

      .hrh-item {
        .item;
      }
    }

    .hr-content {
      .hrc-row {
        .row;
        border-bottom: @d8line;

        .hrcr-item {
          .item;
          border-right: @d8line;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          &:nth-child(1) {
            border-left: @d8line;
          }

          .editting-input {
            position: absolute;
            top: 5%;
            left: 5%;
            width: 90%;
            height: 90%;
            padding: 0 8px;
            box-sizing: border-box;
            border: @d8line;
            border-radius: 4px;
          }

          .sale-shopping-car {
            width: 40px;
            height: 40px;
            background: url(/static/img/spirit.png) 0 -40px ~"/" 40px auto
              no-repeat;
            cursor: pointer;
          }

          .sale-shopping-car-selected {
            .sale-shopping-car;
          }
        }
      }

      .dialog {
        .upload-container {
          position: relative;
          height: 180px;
          margin-bottom: 60px;

          .upload {
            height: 180px;
            padding: 0 80px;
          }

          .no-img {
            position: absolute;
            right: 20px;
            bottom: 0;
            color: @warningColor;
          }
        }

        .cropper-container {
          position: relative;
          width: 100%;
          height: 180px;
          padding: 0 80px;
          margin-bottom: 60px;

          .cropper-back {
            position: absolute;
            right: 88px;
            bottom: -40px;
            padding: 6px 20px;
            color: @sColor;
            border: 1px solid @sColor;
          }
        }

        .p-cp {
          width: 160px;
          margin-left: 20px;
        }

        .p-count-container {
          margin-top: 10px;

          .p-count {
            .p-cp;
          }
        }

        .p-price-container {
          position: relative;
          margin-top: 10px;

          .money {
            position: absolute;
            top: 10px;
            left: 70px;
          }

          .d-price {
            .p-cp;
          }
        }

        .suggest {
          color: #999;
        }

        .warning {
          color: @warningColor;
        }

        .apply-container {
          width: 100%;
          text-align: center;

          .apply {
            width: 194px;
            padding: 12px 12px;
            margin-top: 10px;
            background: @sColor;
            color: white;

            &:active,
            &:hover {
              border: 1px solid @sColor;
            }
          }
        }
      }
    }
  }

  .hr-remind {
    color: #999;
    margin-left: 30px;
  }

  .pagination {
    margin-left: 30px;
  }

  .sale-null {
    display: flex;
    min-height: 400px;
    align-items: center;
    justify-content: center;

    img {
      width: 160px;
    }
  }
}
</style>
