webpackJsonp([9],{

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pay_vue__ = __webpack_require__(280);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_80ba24b4_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_pay_vue__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(16);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(470)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-80ba24b4"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pay_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_80ba24b4_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_pay_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_80ba24b4_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_pay_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/component/pay/pay.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-80ba24b4", Component.options)
  } else {
    hotAPI.reload("data-v-80ba24b4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__type_type_vue__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wepay_wepay_vue__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alipay_alipay_vue__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex__ = __webpack_require__(10);
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
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["a"] = ({
  props: ['order'],
  components: {
    oType: __WEBPACK_IMPORTED_MODULE_0__type_type_vue__["a" /* default */],
    wepay: __WEBPACK_IMPORTED_MODULE_1__wepay_wepay_vue__["a" /* default */],
    alipay: __WEBPACK_IMPORTED_MODULE_2__alipay_alipay_vue__["a" /* default */]
  },
  data: function data() {
    return {
      payType: 'alipay'
    };
  },

  computed: _extends({}, __WEBPACK_IMPORTED_MODULE_3_vuex__["a" /* default */].mapState('pay', ['qrData']), {
    info: function info() {
      // 二维码数据
      return this.qrData.data || {};
    },
    items: function items() {
      // 订单信息
      return this.qrData.items || {};
    }
  }),
  mounted: function mounted() {
    var payType = this.payType;
    // 如果没有订单就前往买家中心
    if (!this.order) this.$router.push('buyer');
  },

  methods: {
    updatePayType: function updatePayType(payload) {
      var type = payload.type;
      this.payType = type;
    }
  }
});

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  props: ['od', 'payType'],
  methods: {
    changePayType: function changePayType(type) {
      if (type === 'alipay' || type === 'wepay') this.$emit('updatePayType', { type: type });else this.$message('功能暂未开通...');
    }
  }
});

/***/ }),

/***/ 282:
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



/* harmony default export */ __webpack_exports__["a"] = ({
  props: ['order'],
  data: function data() {
    return {
      loopInterval: null,
      destoryed: false // 是否销毁本组件，用来关闭 loop
    };
  },

  computed: _extends({}, __WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* default */].mapState('pay', ['qrData']), {
    info: function info() {
      // 二维码数据
      return this.qrData.data || {};
    },
    qrImgUrl: function qrImgUrl() {
      var url = '/static/img/img_loading.png';
      var img = this.info.img;
      if (img) {
        url = img;
        if (this.qrData.isLocal) url = 'http://yhcqp.youfan.pub/' + img; // 本地测试处理
      }
      return url;
    }
  }),
  mounted: function mounted() {
    if (this.order.order_id) this.aData();
  },
  beforeDestroy: function beforeDestroy() {
    this.destoryed = true;
    if (this.loopInterval) clearInterval(this.loopInterval);
  },

  methods: _extends({}, __WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* default */].mapMutations(['updateNSP']), __WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* default */].mapMutations('pay', ['updateQRData']), __WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* default */].mapActions('pay', ['aQRData']), {
    aData: function aData() {
      var _this = this;

      clearInterval(this.loopInterval); // 刷新导致 bug
      this.aQRData({ order: this.order, payType: 'wechatpay' }).then(function () {
        return _this.loopStart();
      });
    },
    loopStart: function loopStart() {
      var _this2 = this;

      if (this.destoryed) return;

      this.loopInterval = setInterval(function () {
        return u.get('/pays/check/wechatpay', { order_id: _this2.info.orderid }, { closeMum: true }).then(function (res) {
          var status = res.status;
          if (status === '408') ; // 继续轮询
          else if (status === '405') _this2.paySuccess(); // 成功
            else {
                clearInterval(_this2.loopInterval);

                if (status === '404') _this2.payFail(res.msg); // 没有订单
                else if (status === '406') _this2.payFail(res.msg); // 关闭了订单
                  else _this2.$message('未知问题，请重试'); // 其他
              }
        });
      }, 3000);
    },
    paySuccess: function paySuccess() {
      clearInterval(this.loopInterval);
      this.updateNSP({ path: '/buyer' });
      this.$router.push('/buyer/send');
      this.$message({
        message: '支付成功',
        type: 'success'
      });
    },
    payFail: function payFail(message) {
      var _this3 = this;

      clearInterval(this.loopInterval);
      this.$router.push('/buyer/pay');
      this.$confirm('付款遇到问题, 是否继续支付?', '提示', {
        confirmButtonText: '继续支付',
        cancelButtonText: '取消支付',
        type: 'warning'
      }).then(function () {
        _this3.info = {};
        _this3.aData();
      }).catch(function () {
        _this3.$router.push('/buyer/pay');
      });
    },
    refresh: function refresh() {
      this.aData();
    }
  })
});

/***/ }),

/***/ 283:
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



/* harmony default export */ __webpack_exports__["a"] = ({
  props: ['order'],
  data: function data() {
    return {
      loopInterval: null,
      destoryed: false // 是否销毁本组件，用来关闭 loop
    };
  },

  computed: _extends({}, __WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* default */].mapState('pay', ['qrData']), {
    info: function info() {
      // 二维码数据
      return this.qrData.data || {};
    },
    qrImgUrl: function qrImgUrl() {
      var url = '/static/img/img_loading.png';
      var img = this.info.img;
      if (img) {
        url = img;
        if (this.qrData.isLocal) url = 'http://yhcqp.youfan.pub/' + img; // 本地测试处理
      }
      return url;
    }
  }),
  mounted: function mounted() {
    if (this.order.order_id) this.aData();
  },
  beforeDestroy: function beforeDestroy() {
    this.destoryed = true;
    if (this.loopInterval) clearInterval(this.loopInterval);
  },

  methods: _extends({}, __WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* default */].mapMutations(['updateNSP']), __WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* default */].mapMutations('pay', ['updateQRData']), __WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* default */].mapActions('pay', ['aQRData']), {
    aData: function aData() {
      var _this = this;

      clearInterval(this.loopInterval); // 刷新导致 bug
      this.aQRData({ order: this.order, payType: 'alipay' }).then(function () {
        return _this.loopStart();
      });
    },
    loopStart: function loopStart() {
      var _this2 = this;

      if (this.destoryed) return;

      this.loopInterval = setInterval(function () {
        u.get('/pays/check/alipay', { order_id: _this2.info.orderid }, { closeMum: true }).then(function (res) {
          var status = res.status;
          if (status === '408') ; // 继续轮询
          else if (status === '405') _this2.paySuccess(); // 成功
            else {
                clearInterval(_this2.loopInterval);

                if (status === '404') _this2.payFail(res.msg); // 没有订单
                else if (status === '406') _this2.payFail(res.msg); // 关闭了订单
                  else _this2.$message('未知问题，请重试'); // 其他
              }
        });
      }, 3000);
    },
    paySuccess: function paySuccess() {
      clearInterval(this.loopInterval);
      this.updateNSP({ path: '/buyer' });
      this.$router.push('/buyer/send');
      this.$message({
        message: '支付成功',
        type: 'success'
      });
    },
    payFail: function payFail(message) {
      var _this3 = this;

      clearInterval(this.loopInterval);
      this.$router.push('/buyer/pay');
      this.$confirm('付款遇到问题, 是否继续支付?', '提示', {
        confirmButtonText: '继续',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        _this3.info = {};
        _this3.aData();
      }).catch(function () {
        _this3.$router.push('/buyer/pay');
      });
    },
    refresh: function refresh() {
      this.aData();
    }
  })
});

/***/ }),

/***/ 470:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(471);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(15).default
var update = add("1bbfdf00", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-80ba24b4\",\"scoped\":true,\"sourceMap\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./pay.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-80ba24b4\",\"scoped\":true,\"sourceMap\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./pay.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 471:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.pay[data-v-80ba24b4] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.pay .order-info[data-v-80ba24b4] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 1024px;\n  min-height: 70px;\n  margin-bottom: 20px;\n  background: white;\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.24);\n  border-radius: 2px;\n}\n.pay .order-info .oi-items-container[data-v-80ba24b4] {\n  padding: 10px 0;\n}\n.pay .order-info .oi-items-container .oi-items[data-v-80ba24b4] {\n  display: flex;\n  margin-left: 40px;\n  color: #333;\n  font-size: 14px;\n}\n.pay .order-info .oi-items-container .oi-items .oi-title[data-v-80ba24b4] {\n  width: 80px;\n  font-weight: 800;\n}\n.pay .order-info .oi-items-container .oi-items .oi-item-container .oi-item[data-v-80ba24b4] {\n  width: 600px;\n}\n.pay .order-info .money[data-v-80ba24b4] {\n  margin-right: 96px;\n  font-size: 14px;\n  color: #ec6337;\n}\n.pay .remind[data-v-80ba24b4] {\n  display: flex;\n  flex-direction: column;\n  width: 1024px;\n  min-height: 60px;\n  padding: 20px 0;\n  border-top: 1px solid #f2f2f2;\n  background: white;\n  padding-left: 40px;\n}\n.pay .remind > div[data-v-80ba24b4] {\n  font-size: 12px;\n  color: #666;\n}\n.pay .remind > div[data-v-80ba24b4]:nth-child(1) {\n  width: 60px;\n}\n.pay .remind > div[data-v-80ba24b4]:nth-child(2) {\n  width: 830px;\n}\n", ""]);

// exports


/***/ }),

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_type_vue__ = __webpack_require__(281);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_fac4bc26_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_type_vue__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(16);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(473)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-fac4bc26"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_type_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_fac4bc26_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_type_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_fac4bc26_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_type_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/component/pay/type/type.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fac4bc26", Component.options)
  } else {
    hotAPI.reload("data-v-fac4bc26", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 473:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(474);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(15).default
var update = add("ccad8946", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-fac4bc26\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/less-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./type.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-fac4bc26\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/less-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./type.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 474:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.pay[data-v-fac4bc26] {\n  width: 1024px;\n}\n.pay .p-box[data-v-fac4bc26] {\n  display: flex;\n  align-items: center;\n  height: 112px;\n  width: 1024px;\n  padding: 0 10px;\n  margin-bottom: 10px;\n  font-size: 14px;\n  color: #666;\n  background-color: white;\n}\n.pay .pay-type[data-v-fac4bc26] {\n  display: flex;\n  height: 112px;\n  width: 1024px;\n  padding: 0 10px;\n  margin-bottom: 10px;\n  font-size: 14px;\n  color: #666;\n  background-color: white;\n  align-items: center;\n}\n.pay .pay-type div[data-v-fac4bc26] {\n  margin-left: 10px;\n  width: 140px;\n  height: 40px;\n  box-sizing: border-box;\n  cursor: pointer;\n  border-radius: 4px;\n}\n.pay .pay-type .union[data-v-fac4bc26] {\n  background: url(/static/img/p_union.png) 0 0 / 140px auto no-repeat;\n  cursor: not-allowed;\n}\n.pay .pay-type .unionSelected[data-v-fac4bc26] {\n  border: 1px solid #ec6337;\n  background: url(/static/img/p_union_selected.png) 0 0 / 140px auto no-repeat;\n}\n.pay .pay-type .deposit[data-v-fac4bc26] {\n  background: url(/static/img/p_deposit.png) 0 0 / 140px auto no-repeat;\n  cursor: not-allowed;\n}\n.pay .pay-type .depositSelected[data-v-fac4bc26] {\n  border: 1px solid #ec6337;\n  background: url(/static/img/p_deposit_selected.png) 0 0 / 140px auto no-repeat;\n}\n.pay .pay-type .alipay[data-v-fac4bc26] {\n  border: 1px solid #d8d8d8;\n  background: url(/static/img/p_alipay_selected.png) 0 0 / 140px auto no-repeat;\n}\n.pay .pay-type .alipaySelected[data-v-fac4bc26] {\n  border: 1px solid #ec6337;\n  background: url(/static/img/p_alipay_selected.png) 0 0 / 140px auto no-repeat;\n}\n.pay .pay-type .wepay[data-v-fac4bc26] {\n  border: 1px solid #d8d8d8;\n  background: url(/static/img/p_wepay_selected.png) 0 0 / 140px auto no-repeat;\n}\n.pay .pay-type .wepaySelected[data-v-fac4bc26] {\n  border: 1px solid #ec6337;\n  background: url(/static/img/p_wepay_selected.png) 0 0 / 140px auto no-repeat;\n}\n", ""]);

// exports


/***/ }),

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "pay" }, [
    _c("div", { staticClass: "pay-type" }, [
      _c("span", [_vm._v("交易方式:")]),
      _vm._v(" "),
      _c("div", {
        class: _vm.payType === "union" ? "unionSelected" : "union",
        on: {
          click: function($event) {
            _vm.changePayType("union")
          }
        }
      }),
      _vm._v(" "),
      _c("div", {
        class: _vm.payType === "deposit" ? "depositSelected" : "deposit",
        on: {
          click: function($event) {
            _vm.changePayType("deposit")
          }
        }
      }),
      _vm._v(" "),
      _c("div", {
        class: _vm.payType === "alipay" ? "alipaySelected" : "alipay",
        on: {
          click: function($event) {
            _vm.changePayType("alipay")
          }
        }
      }),
      _vm._v(" "),
      _c("div", {
        class: _vm.payType === "wepay" ? "wepaySelected" : "wepay",
        on: {
          click: function($event) {
            _vm.changePayType("wepay")
          }
        }
      })
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-fac4bc26", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),

/***/ 476:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wepay_vue__ = __webpack_require__(282);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6975af3a_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_wepay_vue__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(16);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(477)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6975af3a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_wepay_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6975af3a_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_wepay_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6975af3a_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_wepay_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/component/pay/wepay/wepay.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6975af3a", Component.options)
  } else {
    hotAPI.reload("data-v-6975af3a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 477:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(478);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(15).default
var update = add("362a8802", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-6975af3a\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/less-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wepay.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-6975af3a\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/less-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wepay.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 478:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.alipay[data-v-6975af3a] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n}\n.alipay .content[data-v-6975af3a] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 1024px;\n  min-height: 390px;\n  margin-top: 10px;\n  background-color: white;\n}\n.alipay .content .code-info[data-v-6975af3a] {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: flex-end;\n  width: 140px;\n  margin-top: 60px;\n}\n.alipay .content .code-info .money[data-v-6975af3a] {\n  color: #ec6337;\n}\n.alipay .content .code-info .qrc-img[data-v-6975af3a] {\n  width: 140px;\n  height: 140px;\n  box-shadow: 0 4px 12px #d8d8d8;\n}\n.alipay .content .code-info .qrc-refresh[data-v-6975af3a] {\n  font-size: 12px;\n  color: #666;\n  margin-top: 4px;\n  text-decoration: underline;\n  cursor: pointer;\n}\n.alipay .content .order-info[data-v-6975af3a] {\n  display: flex;\n  flex-direction: column;\n  width: 980px;\n  min-height: 60px;\n  margin-top: 70px;\n  margin-bottom: 20px;\n}\n.alipay .content .order-info .oi-items[data-v-6975af3a] {\n  display: flex;\n  margin-top: 10px;\n  color: #333;\n  font-size: 14px;\n}\n.alipay .content .order-info .oi-items .oi-title[data-v-6975af3a] {\n  width: 80px;\n  font-weight: 800;\n}\n.alipay .content .order-info .oi-items .oi-item[data-v-6975af3a] {\n  width: 900px;\n}\n.alipay .content .remind[data-v-6975af3a] {\n  display: flex;\n  flex-direction: column;\n  width: 980px;\n  min-height: 60px;\n  padding: 20px 0;\n  border-top: 1px solid #f2f2f2;\n}\n.alipay .content .remind > div[data-v-6975af3a] {\n  font-size: 12px;\n  color: #666;\n}\n.alipay .content .remind > div[data-v-6975af3a]:nth-child(1) {\n  width: 60px;\n}\n.alipay .content .remind > div[data-v-6975af3a]:nth-child(2) {\n  width: 830px;\n}\n", ""]);

// exports


/***/ }),

/***/ 479:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "alipay" }, [
    _c("div", { staticClass: "content" }, [
      _c("div", { staticClass: "code-info" }, [
        _c("div", [
          _vm._v("扫一扫付款: "),
          _vm.info.money
            ? _c("span", { staticClass: "money" }, [
                _vm._v("¥" + _vm._s(_vm.info.money))
              ])
            : _vm._e()
        ]),
        _vm._v(" "),
        _c("img", {
          staticClass: "qrc-img",
          attrs: { src: _vm.qrImgUrl, alt: "二维码" }
        }),
        _vm._v(" "),
        _c("span", { staticClass: "qrc-refresh", on: { click: _vm.refresh } }, [
          _vm._v("刷新二维码")
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6975af3a", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_alipay_vue__ = __webpack_require__(283);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b2ec98a6_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_alipay_vue__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(16);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(481)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-b2ec98a6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_alipay_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b2ec98a6_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_alipay_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b2ec98a6_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_alipay_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/component/pay/alipay/alipay.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b2ec98a6", Component.options)
  } else {
    hotAPI.reload("data-v-b2ec98a6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 481:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(482);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(15).default
var update = add("2f0217fc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-b2ec98a6\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/less-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./alipay.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-b2ec98a6\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/less-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./alipay.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 482:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.alipay[data-v-b2ec98a6] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n}\n.alipay .content[data-v-b2ec98a6] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 1024px;\n  min-height: 390px;\n  margin-top: 10px;\n  background-color: white;\n}\n.alipay .content .code-info[data-v-b2ec98a6] {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: flex-end;\n  width: 140px;\n  margin-top: 60px;\n}\n.alipay .content .code-info .money[data-v-b2ec98a6] {\n  color: #ec6337;\n}\n.alipay .content .code-info .qrc-img[data-v-b2ec98a6] {\n  width: 140px;\n  height: 140px;\n  box-shadow: 0 4px 12px #d8d8d8;\n}\n.alipay .content .code-info .qrc-refresh[data-v-b2ec98a6] {\n  font-size: 12px;\n  color: #666;\n  margin-top: 4px;\n  text-decoration: underline;\n  cursor: pointer;\n}\n", ""]);

// exports


/***/ }),

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "alipay" }, [
    _c("div", { staticClass: "content" }, [
      _c("div", { staticClass: "code-info" }, [
        _c("div", [
          _vm._v("扫一扫付款: "),
          _vm.info.money
            ? _c("span", { staticClass: "money" }, [
                _vm._v("¥" + _vm._s(_vm.info.money))
              ])
            : _vm._e()
        ]),
        _vm._v(" "),
        _c("img", {
          staticClass: "qrc-img",
          attrs: {
            src: _vm.qrImgUrl || "/static/img/img_loading.png",
            alt: "二维码"
          }
        }),
        _vm._v(" "),
        _c("span", { staticClass: "qrc-refresh", on: { click: _vm.refresh } }, [
          _vm._v("刷新二维码")
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-b2ec98a6", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),

/***/ 484:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "pay" },
    [
      _c("div", { staticClass: "order-info" }, [
        _c(
          "div",
          { staticClass: "oi-items-container" },
          _vm._l(_vm.items, function(item, index) {
            return _c("div", { key: index, staticClass: "oi-items" }, [
              _c("div", { staticClass: "oi-title" }, [
                _vm._v("订单信息" + _vm._s(index + 1) + ":")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "oi-item-container" }, [
                _c("div", { staticClass: "oi-item" }, [_vm._v(_vm._s(item))])
              ])
            ])
          })
        ),
        _vm._v(" "),
        _vm.info.money
          ? _c("span", { staticClass: "money" }, [
              _vm._v("¥" + _vm._s(_vm.info.money))
            ])
          : _vm._e()
      ]),
      _vm._v(" "),
      _vm.order
        ? _c("o-type", {
            attrs: { od: _vm.order, payType: _vm.payType },
            on: { updatePayType: _vm.updatePayType }
          })
        : _vm._e(),
      _vm._v(" "),
      _c(_vm.payType, { tag: "component", attrs: { order: _vm.order || {} } }),
      _vm._v(" "),
      _vm._m(0)
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "remind" }, [
      _c("div", [_vm._v("交易须知：")]),
      _vm._v(" "),
      _c("div", [_vm._v("1.以上货款不含运费；")]),
      _vm._v(" "),
      _c("div", [
        _vm._v(
          "2.货款支付后，会有第三方平台存管，只有等订单显示“交易成功”后，卖家方可收到货款。"
        )
      ])
    ])
  }
]
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-80ba24b4", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ })

});