<template>
    <div class="edit-input">
        <div class="inputlist">
            <div class="listleft">零件号</div>
            <div class="listright"><span> L4FD 941 004 A</span></div>
        </div>
        <div class="inputlist">
            <div class="listleft">零件名称</div>
            <div class="listright">
                 <el-input 
                    size="medium"
                    placeholder="大灯"
                    >
                    </el-input>
            </div>
        </div>
        <div class="inputlist">
            <div class="listleft">品牌状态</div>
            <div class="listright">
                <el-radio v-model="partstate" label="1" name="上线">上线</el-radio>
                <el-radio v-model="partstate" label="2" name="下线">下线</el-radio>
            </div>
        </div>
        <div class="inputlist">
            <div class="listleft">产地</div>
            <div class="listright">
                <el-radio v-model="partlocation" label="1" name="国产">国产</el-radio>
                <el-radio v-model="partlocation" label="2" name="进口">进口</el-radio>
            </div>
        </div>
        <div class="inputlist">
            <div class="listleft">品质</div>
            <div class="listright">
                <el-radio v-model="partquality" label="1" name="原厂件">原厂件</el-radio>
                <el-radio v-model="partquality" label="2" name="品牌件">品牌件</el-radio>
            </div>
        </div>

         <div class="inputlist">
            <div class="listleft">邮费</div>
            <div class="listright">
                <el-radio v-model="partpostage" label="1" name="包邮">包邮</el-radio>
                <el-radio v-model="partpostage" label="2" name="到付">到付</el-radio>
            </div>
        </div>

        <div class="inputlist">
            <div class="listleft">售卖数量</div>
            <div class="listright">
                 <el-input
                    size="medium" 
                    placeholder="10"
                    >
                    </el-input>
                <span>库存（10）</span>
            </div>
        </div>
        <div class="inputlist">
            <div class="listleft">零售价(¥)</div>
            <div class="listright">
                 <el-input
                    size="medium" 
                    placeholder="3329.00"
                    >
                    </el-input>
                <span>底价（¥3329.00）</span>
            </div>
        </div>
        <div class="inputlist inputlistspecial">
            <div class="listleft">商品图片</div>
            <div class="listright">

            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";
import VueCropper from "./cropper.vue";
// import VueUpimg from './upimg.vue';
import { Dialog,Radio, Upload, Input, InputNumber , Checkbox ,CheckboxGroup} from "element-ui";
Vue.use(Dialog);
Vue.use(Radio);
Vue.use(Upload);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);

export default {
  data() {
    return {
        partstate:'1',
        partlocation: '1',
        partquality: '1',
        partpostage: '1',

    };
  },
  components:{
      VueCropper,
  },
  computed: {
      
  },
  methods: {
    refresh() {
      
    },
    fileChange(file, fileList) {
      this.cropImg = file.url;
      this.imgChange = true;
    },
    cropperBack() {
      this.imgChange = false;
      this.cropImg = "";
    }
  }
};
</script>

<style lang="less" scoped>
  @d8line: 1px solid #d8d8d8;
  @sColor: #0063ff;
  @warningColor: #ff001f;
    .edit-input{
        padding-top: 10px;
        background: #FFFFFF;
        .inputlist{
            display: flex;
            flex-direction: row;
            min-height: 40px;
            align-items: center;

            .listleft{
                width: 10%;
                padding-left: 20px;
                font-size: 14px;
                color: #999999;
            }

            .listright{
                width: 90%;

                .el-input{
                    width: 20%;
                    input{
                        height: 32px;
                    }
                }

                &>label{
                    width: 80px;
                }
                
            }
        }
        .inputlistspecial{
            display: flex;
            flex-direction: row;
            min-height: 40px;
            align-items: flex-start;
        }
    }
</style>
