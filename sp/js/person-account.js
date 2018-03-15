webpackJsonp([20],{

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_account_vue__ = __webpack_require__(245);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7673b73c_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_account_vue__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(16);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(364)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7673b73c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_account_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7673b73c_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_account_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7673b73c_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_account_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/component/person/account/account.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7673b73c", Component.options)
  } else {
    hotAPI.reload("data-v-7673b73c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(10);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  props: ['title', 'action'],
  data: function data() {
    return {
      inputData: {
        sms_code: '',
        password: '',
        checkPassword: ''
      }, // 输入信息
      checkStr: '获取验证码', // 获取验证码按钮信息
      isLoop: false, // 是否获取验证码中
      loopTime: 60, // 获取验证码时长
      checkLoop: null // 获取验证码的 loop
    };
  },

  computed: _extends({}, __WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* default */].mapState(['userInfo']), {
    submitReq: function submitReq() {
      return {
        password: this.inputData.password,
        sms_code: this.inputData.sms_code
      };
    },
    placeholder: function placeholder() {
      var p = '新密码（6位以上数字或字母）';
      if (this.isPays) p = '设置提现密码（6位以上数字或字母）';
      return p;
    },
    checkPlaceholder: function checkPlaceholder() {
      var cp = '确认密码（6位以上数字或字母）';
      if (this.isPays) cp = '确认提现密码（6位以上数字或字母）';
      return cp;
    },
    isPays: function isPays() {
      // 是否为支付
      return this.action === 'pays';
    }
  }),
  mounted: function mounted() {},

  methods: {
    aCertificationCode: function aCertificationCode() {
      var _this = this;

      if (this.isLoop) return;else this.isLoop = true;

      axios.get('/community/base/sms_code', { params: { action: this.action } }).then(function (res) {
        _this.checkStr = _this.loopTime + 's';
        _this.checkLoop = setInterval(function () {
          _this.checkStr = --_this.loopTime + 's';
          if (_this.loopTime < 1) {
            _this.loopTime = 60;
            _this.checkStr = '获取验证码';
            _this.isLoop = false;
            clearInterval(_this.checkLoop);
          }
        }, 1000);
      });
    },
    submit: function submit() {
      var _this2 = this;

      var inputData = this.inputData;
      if (inputData.sms_code.length < 1) {
        alert('请输入验证码');
        this.$message({
          message: '请输入验证码',
          type: 'error'
        });
        return;
      } else if (inputData.password.length < 1) {
        this.$message({
          message: '请输入密码',
          type: 'error'
        });
        return;
      } else if (inputData.checkPassword !== inputData.password) {
        this.$message({
          message: '请输入相同的确认密码',
          type: 'error'
        });
        return;
      }

      var url = '/community/user/find_pwd';
      var successMessage = '修改密码成功';
      if (this.isPays) {
        url = '/account/payspwd/modify';
        successMessage = '设置提现密码成功';
      }

      axios.post(url, this.submitReq).then(function (res) {
        if (res.data.code === 1) {
          _this2.$message({
            message: successMessage,
            type: 'success'
          });
          _this2.close();
        } else alert(res.data.msg);
      });
    },
    close: function close() {
      this.$emit('close');
    }
  }
});

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_password_vue__ = __webpack_require__(151);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a8b37a44_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_password_vue__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(16);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(215)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-a8b37a44"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_password_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a8b37a44_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_password_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a8b37a44_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_password_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/component/person/account/password/password.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a8b37a44", Component.options)
  } else {
    hotAPI.reload("data-v-a8b37a44", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(216);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(15).default
var update = add("4aa8a184", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-a8b37a44\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./password.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-a8b37a44\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./password.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.password[data-v-a8b37a44] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 356px;\n  height: 360px;\n  background: white;\n  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.12), 0 24px 24px 0 rgba(0, 0, 0, 0.24);\n  border-radius: 4px;\n}\n.password > .title[data-v-a8b37a44] {\n  color: #ec6337;\n  margin-top: 40px;\n  margin-bottom: 10px;\n}\n.password > .phone[data-v-a8b37a44] {\n  color: #666;\n  font-size: 12px;\n}\n.password .back[data-v-a8b37a44] {\n  display: flex;\n  align-items: center;\n  width: 320px;\n  height: 40px;\n  font-size: 12px;\n  color: #666;\n  white-space: pre-wrap;\n}\n.password .back span[data-v-a8b37a44] {\n  cursor: pointer;\n}\n.password .input-container[data-v-a8b37a44] {\n  position: relative;\n  width: 320px;\n  margin-top: 12px;\n}\n.password .input-container .normalSize[data-v-a8b37a44] {\n  width: 320px;\n  height: 40px;\n  border: 1px solid #d8d8d8;\n  outline: none;\n  box-sizing: border-box;\n  border-radius: 4px;\n}\n.password .input-container input[data-v-a8b37a44] {\n  width: 320px;\n  height: 40px;\n  border: 1px solid #d8d8d8;\n  outline: none;\n  box-sizing: border-box;\n  border-radius: 4px;\n  font-size: 12px;\n  color: #333;\n  padding-left: 8px;\n}\n.password .input-container[data-v-a8b37a44] ::-moz-placeholder {\n  color: #999;\n}\n.password .input-container[data-v-a8b37a44] ::-webkit-input-placeholder {\n  color: #999;\n}\n.password .input-container .check-button[data-v-a8b37a44] {\n  width: 320px;\n  height: 40px;\n  border: 1px solid #d8d8d8;\n  outline: none;\n  box-sizing: border-box;\n  border-radius: 4px;\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 98px;\n  color: #ec6337;\n  border: 0;\n  background: transparent;\n}\n.password .input-container .mark[data-v-a8b37a44] {\n  position: absolute;\n  right: -14px;\n  top: 10px;\n  margin-left: 8px;\n  color: #ec6337;\n}\n.password .input-container > span[data-v-a8b37a44]:not(.el-cascader) {\n  position: absolute;\n  right: -14px;\n  top: 10px;\n  margin-left: 8px;\n  color: #ec6337;\n}\n.password > button[data-v-a8b37a44] {\n  width: 320px;\n  height: 40px;\n  border: 0;\n  margin-top: 40px;\n  outline: none;\n  background: #ec6337;\n  color: white;\n}\n.password .p-close[data-v-a8b37a44] {\n  position: absolute;\n  right: 10px;\n  top: 10px;\n  width: 30px;\n  height: 30px;\n  background: url(/static/img/icon_close.png) 0 0 / 30px 30px no-repeat;\n  border-radius: 15px;\n  cursor: pointer;\n}\n", ""]);

// exports


/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "password" }, [
    _c("span", { staticClass: "title" }, [_vm._v(_vm._s(_vm.title))]),
    _vm._v(" "),
    _c("span", { staticClass: "phone" }, [
      _vm._v("验证码发送至 " + _vm._s(_vm.userInfo.username))
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "input-container" }, [
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.inputData.sms_code,
            expression: "inputData.sms_code"
          }
        ],
        attrs: { placeholder: "验证码" },
        domProps: { value: _vm.inputData.sms_code },
        on: {
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.$set(_vm.inputData, "sms_code", $event.target.value)
          }
        }
      }),
      _vm._v(" "),
      _c("button", {
        staticClass: "check-button",
        domProps: { textContent: _vm._s(_vm.checkStr) },
        on: { click: _vm.aCertificationCode }
      })
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "input-container" }, [
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.inputData.password,
            expression: "inputData.password"
          }
        ],
        attrs: { placeholder: _vm.placeholder, type: "password" },
        domProps: { value: _vm.inputData.password },
        on: {
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.$set(_vm.inputData, "password", $event.target.value)
          }
        }
      })
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "input-container" }, [
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.inputData.checkPassword,
            expression: "inputData.checkPassword"
          }
        ],
        attrs: { placeholder: _vm.checkPlaceholder, type: "password" },
        domProps: { value: _vm.inputData.checkPassword },
        on: {
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.$set(_vm.inputData, "checkPassword", $event.target.value)
          }
        }
      })
    ]),
    _vm._v(" "),
    _c("button", { on: { click: _vm.submit } }, [_vm._v("确认")]),
    _vm._v(" "),
    _c("div", { staticClass: "p-close", on: { click: _vm.close } })
  ])
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-a8b37a44", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__password_password_vue__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(10);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    Password: __WEBPACK_IMPORTED_MODULE_0__password_password_vue__["a" /* default */]
  },
  data: function data() {
    return {
      isUploading: false, // 是否上传中
      passwordShow: false, // 显示修改密码
      pTitle: '手机验证修改密码', // 修改密码的 title
      pAction: 'changepwd' // 默认是修改密码
    };
  },

  computed: _extends({}, __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].mapState(['userInfo'])),
  mounted: function mounted() {},

  methods: _extends({}, __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].mapActions(['aUserInfo']), {
    showPassword: function showPassword() {
      this.passwordShow = true;
      this.pTitle = '手机验证修改密码';
      this.pAction = 'changepwd';
    },
    showPayPassword: function showPayPassword() {
      this.passwordShow = true;
      this.pTitle = '设置提现密码';
      this.pAction = 'pays';
    },
    closePassword: function closePassword() {
      this.passwordShow = false;
    },
    preLoad: function preLoad() {
      this.$refs.file.click();
    },
    changeFile: function changeFile(e) {
      var _this = this;

      if (this.isUploading) return;else this.isUploading = true;

      var formData = new FormData();
      formData.append('action', 'license');
      formData.append('file_name', 'file');
      formData.append('file', e.target.files[0]);

      var config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      axios.post('/community/file/uploads', formData, config).then(function (res) {
        _this.isUploading = false;
        _this.haveUploaded = true;
        _this.aUserInfo(); // 上传成功后刷新一下用户状态
      });
    }
  })
});

/***/ }),

/***/ 364:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(365);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(15).default
var update = add("83e9d304", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-7673b73c\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/less-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./account.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-7673b73c\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/less-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./account.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 365:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.account[data-v-7673b73c] {\n  width: 100%;\n  height: 100%;\n  padding: 0 40px;\n}\n.account > div[data-v-7673b73c]:not(.password-container) {\n  display: flex;\n  align-items: center;\n  height: 20px;\n  margin-top: 20px;\n  font-size: 14px;\n  color: #666;\n}\n.account > div:not(.password-container) > span[data-v-7673b73c]:nth-child(1) {\n  margin-left: 15px;\n  padding-right: 4px;\n}\n.account > div:not(.password-container) > span[data-v-7673b73c]:nth-child(2) {\n  padding-left: 4px;\n  border-left: 1px solid #d8d8d8;\n}\n.account .title[data-v-7673b73c] {\n  color: #333;\n  font-weight: 800;\n}\n.account .util[data-v-7673b73c] {\n  color: #ec6337;\n  cursor: pointer;\n}\n.account .uploaded[data-v-7673b73c] {\n  display: inline-block;\n  width: 40px;\n  height: 40px;\n  background: url(/sp/static/img/spirit.png) 0 -520px / 40px auto no-repeat;\n  cursor: default;\n}\n.account .uploading[data-v-7673b73c] {\n  cursor: default;\n}\n.account .file[data-v-7673b73c] {\n  visibility: hidden;\n}\n.account .password-container[data-v-7673b73c] {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: transparent;\n}\n", ""]);

// exports


/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "account" }, [
    _c("div", { staticClass: "title" }, [_vm._v("账户管理")]),
    _vm._v(" "),
    _c("div", [
      _vm._v("登录账号："),
      _c("span", [_vm._v(_vm._s(_vm.userInfo.username))])
    ]),
    _vm._v(" "),
    _c("div", [
      _vm._v("登录密码："),
      _c("span", [_vm._v(_vm._s(_vm.userInfo.pwd))]),
      _c("span", { staticClass: "util", on: { click: _vm.showPassword } }, [
        _vm._v("修改登录密码")
      ])
    ]),
    _vm._v(" "),
    _c("div", [
      _vm._v("提现密码："),
      _c("span", [_vm._v(_vm._s(_vm.userInfo.pays_pwd))]),
      _c("span", { staticClass: "util", on: { click: _vm.showPayPassword } }, [
        _vm._v("设置提现密码")
      ])
    ]),
    _vm._v(" "),
    _c("div", [
      _vm._v("用户姓名："),
      _c("span", [_vm._v(_vm._s(_vm.userInfo.full_name))])
    ]),
    _vm._v(" "),
    _c("div", [
      _vm._v("公司名称："),
      _c("span", [_vm._v(_vm._s(_vm.userInfo.company))])
    ]),
    _vm._v(" "),
    _c("div", [
      _vm._v("所在城市："),
      _c("span", [_vm._v(_vm._s(_vm.userInfo.area_cn))])
    ]),
    _vm._v(" "),
    _c("div", [
      _vm._v("公司类型："),
      _c("span", [_vm._v(_vm._s(_vm.userInfo.company_type))])
    ]),
    _vm._v(" "),
    _c("div", [
      _vm._v("\n    营业执照："),
      _vm.userInfo.has_license
        ? _c("div", { staticClass: "util uploaded" })
        : _vm._e(),
      _vm.isUploading
        ? _c("span", { staticClass: "util uploading" }, [_vm._v("正在上传...")])
        : _vm._e(),
      !_vm.userInfo.has_license && !_vm.isUploading
        ? _c("span", { staticClass: "util", on: { click: _vm.preLoad } }, [
            _vm._v("立即上传")
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("input", {
        ref: "file",
        staticClass: "file",
        attrs: { type: "file", name: "business-license", value: "立即上传" },
        on: { change: _vm.changeFile }
      })
    ]),
    _vm._v(" "),
    _vm.passwordShow
      ? _c(
          "div",
          { staticClass: "password-container" },
          [
            _c("Password", {
              attrs: { title: _vm.pTitle, action: _vm.pAction },
              on: { close: _vm.closePassword }
            })
          ],
          1
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7673b73c", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ })

});