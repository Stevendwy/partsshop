<template>
    <div class="edit-input">
        <div class="inputlist" v-for="(item, index) in titlelist" :key="index">
            <el-input
                placeholder="请输入内容"
                v-model="modellist[index]"
                clearable>
                </el-input>
        </div>
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
    </div>
</template>

<script>
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
  data() {
    return {
        titlelist:['aaa', 'bbb', 'ccc', 'ddd'],
        modellist:['','b','c'],

        dialogVisible: true,
        cropImg: "", // 需要裁剪的图片链接
        imgChange: false, // 图片是否变化，决定显示那个图片处理工具

    };
  },
  components:{
      VueCropper
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
    },
  }
};
</script>

<style lang="less" scoped>
  @d8line: 1px solid #d8d8d8;
  @sColor: #0063ff;
  @warningColor: #ff001f;
    .edit-input{
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
        width: auto;
        height: 180px;
        // padding: 0 80px;
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
</style>
