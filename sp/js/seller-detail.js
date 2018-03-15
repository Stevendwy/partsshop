webpackJsonp([7],{

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_detail_vue__ = __webpack_require__(275);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0a1d69e9_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_detail_vue__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(16);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(451)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0a1d69e9"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_detail_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0a1d69e9_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_detail_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0a1d69e9_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_detail_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/component/seller/order/detail/detail.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0a1d69e9", Component.options)
  } else {
    hotAPI.reload("data-v-0a1d69e9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__express_vue__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__address_vue__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__list_list_vue__ = __webpack_require__(461);
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
    oExpress: __WEBPACK_IMPORTED_MODULE_0__express_vue__["a" /* default */],
    oAddress: __WEBPACK_IMPORTED_MODULE_1__address_vue__["a" /* default */],
    oList: __WEBPACK_IMPORTED_MODULE_2__list_list_vue__["a" /* default */]
  },
  computed: _extends({}, __WEBPACK_IMPORTED_MODULE_3_vuex__["a" /* default */].mapState('seller', ['detailOrdersData']), {
    carriage: function carriage() {
      return this.detailOrdersData.carriage_unit + this.detailOrdersData.carriage;
    }
  }),
  methods: {
    back: function back() {
      this.$router.history.go(-1);
    },
    goPrint: function goPrint() {
      window.open('/community/order/seller/printer?order_id=' + this.detailOrdersData.order_id);
    }
  }
});

/***/ }),

/***/ 276:
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
  data: function data() {
    return {
      expressObj: {} // 运单对象
    };
  },

  computed: _extends({}, __WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* default */].mapState('seller', ['detailOrdersData']), {
    list: function list() {
      return this.expressObj.tracing || [];
    },
    carriage: function carriage() {
      return this.expressObj.carriage_unit + this.expressObj.carriage;
    }
  }),
  mounted: function mounted() {
    this.aList();
  },

  methods: {
    aList: function aList() {
      var _this = this;

      u.get('/community/order/logistics/info', { order_id: this.detailOrdersData.order_id }).then(function (res) {
        return _this.expressObj = res;
      });
    }
  }
});

/***/ }),

/***/ 277:
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

/* harmony default export */ __webpack_exports__["a"] = ({
  props: ['addressInfo'],
  mounted: function mounted() {
    // this.aList()
  },

  methods: {
    changeAddress: function changeAddress() {},
    aList: function aList() {
      // u.get('/community/order/logistics/info')
    }
  }
});

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__table_vue__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(10);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    lTable: __WEBPACK_IMPORTED_MODULE_0__table_vue__["a" /* default */]
  },
  computed: _extends({}, __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].mapState('seller', ['detailOrdersData']))
});

/***/ }),

/***/ 279:
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
  props: ['ordersData'],
  data: function data() {
    return {
      headerTitles: ['', '零件名称', '零件号', '单价(元)', '数量', '金额(元)'], //, '运费(元)'],
      allSelected: false,
      isIndeterminate: false // 全选按钮标识
    };
  },

  computed: _extends({}, __WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* default */].mapState('cart', ['orders']), {
    carriage: function carriage() {
      return this.ordersData.carriage_unit + this.ordersData.carriage;
    }
  }),
  methods: {}
});

/***/ }),

/***/ 451:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(452);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(15).default
var update = add("1ffcde82", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-0a1d69e9\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./detail.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-0a1d69e9\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./detail.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 452:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.order[data-v-0a1d69e9] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: center;\n  height: calc(100% - 32px);\n}\n.order .o-title[data-v-0a1d69e9] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 60px;\n  background-color: white;\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.24);\n  font-size: 20px;\n  color: #0076ff;\n}\n.order .o-title .o-print-container[data-v-0a1d69e9] {\n  position: absolute;\n  right: calc(50% - 500px);\n  top: 8px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  cursor: pointer;\n}\n.order .o-title .o-print-container .o-print[data-v-0a1d69e9] {\n  width: 68px;\n  height: 32px;\n  background: #0076FF url(/sp/static/img/spirit.png) 14px -564px / 40px auto no-repeat;\n  border-radius: 4px;\n}\n.order .o-title .o-print-container > span[data-v-0a1d69e9] {\n  color: #333;\n  font-size: 12px;\n}\n.order .o-top[data-v-0a1d69e9] {\n  margin-top: 10px;\n}\n.order .pay-total-container .pay-total[data-v-0a1d69e9] {\n  display: flex;\n  align-items: center;\n  height: 112px;\n  width: 1024px;\n  padding: 0 10px;\n  margin-top: 10px;\n  font-size: 14px;\n  color: #666;\n  background-color: #eef6ff;\n  justify-content: space-between;\n}\n.order .pay-total-container .pay-total .pt-pay[data-v-0a1d69e9] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n}\n.order .pay-total-container .pay-total .pt-pay span[data-v-0a1d69e9] {\n  margin: 4px 0;\n}\n.order .pay-total-container .pay-total .pt-pay .money[data-v-0a1d69e9] {\n  color: #0076ff;\n  margin-left: 4px;\n}\n.order .o-top[data-v-0a1d69e9] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n  height: calc(100% - 120px);\n  overflow-y: scroll;\n}\n.order .o-top .o-list-container[data-v-0a1d69e9] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n}\n.order .o-footer-container[data-v-0a1d69e9] {\n  display: flex;\n  justify-content: center;\n  width: 100%;\n  margin-top: 10px;\n  background-color: white;\n}\n.order .o-footer-container .o-footer[data-v-0a1d69e9] {\n  display: flex;\n  justify-content: flex-end;\n  width: 1024px;\n}\n.order .o-footer-container .o-footer .back[data-v-0a1d69e9] {\n  width: 110px;\n  padding: 10px 20px;\n  background-color: #0076ff;\n  border: 1px solid #0076ff;\n}\n", ""]);

// exports


/***/ }),

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_express_vue__ = __webpack_require__(276);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7e626af0_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_express_vue__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(16);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(454)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7e626af0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_express_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7e626af0_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_express_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7e626af0_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_express_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/component/seller/order/detail/express.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7e626af0", Component.options)
  } else {
    hotAPI.reload("data-v-7e626af0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 454:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(455);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(15).default
var update = add("2e79aa44", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-7e626af0\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./express.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-7e626af0\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./express.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 455:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.express-container[data-v-7e626af0] {\n  width: 1024px;\n}\n.express-container .title[data-v-7e626af0] {\n  display: flex;\n  align-items: center;\n  width: 1024px;\n  height: 40px;\n  background-color: #eef6ff;\n  font-size: 14px;\n  color: #333;\n}\n.express-container .title span[data-v-7e626af0] {\n  margin-left: 10px;\n}\n.express-container .express[data-v-7e626af0] {\n  width: 1024px;\n  font-size: 18px;\n}\n.express-container .express .e-container[data-v-7e626af0] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n  width: 100%;\n  margin-top: 10px;\n  background-color: white;\n}\n.express-container .express .e-container .ec-title[data-v-7e626af0] {\n  margin-top: 10px;\n  margin-left: 10px;\n  font-size: 12px;\n  color: #333;\n  white-space: pre;\n}\n.express-container .express .e-container .ec-title[data-v-7e626af0]:nth-child(4) {\n  margin-bottom: 10px;\n}\n.express-container .express .e-container .ec-after[data-v-7e626af0] {\n  display: flex;\n  margin-bottom: 10px;\n}\n.express-container .express .e-container .ec-after .eca-list[data-v-7e626af0] {\n  display: flex;\n  flex-direction: column;\n  width: 900px;\n  margin-top: 10px;\n}\n.express-container .express .e-container .ec-after .eca-list .eca-item[data-v-7e626af0] {\n  color: #333;\n  font-size: 12px;\n}\n.express-container .no-info[data-v-7e626af0] {\n  width: 100%;\n  line-height: 60px;\n  padding-left: 10px;\n  font-size: 14px;\n  background: #eef6ff;\n}\n", ""]);

// exports


/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "express-container" }, [
    _vm.expressObj.waybill_no
      ? _c("div", { staticClass: "has-info" }, [
          _vm._m(0),
          _vm._v(" "),
          _c("div", { staticClass: "express" }, [
            _c("div", { staticClass: "e-container" }, [
              _c("span", { staticClass: "ec-title" }, [
                _vm._v("物流公司: " + _vm._s(_vm.expressObj.logistics))
              ]),
              _vm._v(" "),
              _c("span", { staticClass: "ec-title" }, [
                _vm._v("运单号码: " + _vm._s(_vm.expressObj.waybill_no))
              ]),
              _vm._v(" "),
              _c("span", { staticClass: "ec-title" }, [
                _vm._v("备注: " + _vm._s(_vm.expressObj.remark))
              ]),
              _vm._v(" "),
              _c("span", { staticClass: "ec-title" }, [
                _vm._v("运费金额: " + _vm._s(_vm.carriage))
              ])
            ])
          ])
        ])
      : _c("div", { staticClass: "no-info" }, [
          _vm._v("\n    当前订单状态：待发货\n  ")
        ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "title" }, [
      _c("span", [_vm._v("物流信息")])
    ])
  }
]
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7e626af0", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_address_vue__ = __webpack_require__(277);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6449f50c_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_address_vue__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(16);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(458)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6449f50c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_address_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6449f50c_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_address_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6449f50c_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_address_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/component/seller/order/detail/address.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6449f50c", Component.options)
  } else {
    hotAPI.reload("data-v-6449f50c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 458:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(459);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(15).default
var update = add("4772cd2c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-6449f50c\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./address.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-6449f50c\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./address.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 459:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.address-container[data-v-6449f50c] {\n  width: 1024px;\n  margin-top: 10px;\n}\n.address-container .title[data-v-6449f50c] {\n  display: flex;\n  align-items: center;\n  width: 1024px;\n  height: 40px;\n  background-color: #eef6ff;\n  font-size: 14px;\n  color: #333;\n}\n.address-container .title span[data-v-6449f50c] {\n  margin-left: 10px;\n}\n.address-container .address[data-v-6449f50c] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n  width: 1024px;\n  height: 60px;\n  margin-top: 10px;\n  font-size: 18px;\n  background-color: white;\n}\n.address-container .address .a-container[data-v-6449f50c] {\n  width: 100%;\n}\n.address-container .address .a-container .ac-title[data-v-6449f50c] {\n  margin-left: 10px;\n  color: #999;\n}\n.address-container .address .a-container span[data-v-6449f50c] {\n  color: #333;\n  font-size: 12px;\n  margin-left: 64px;\n  white-space: pre;\n}\n", ""]);

// exports


/***/ }),

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "address-container" }, [
    _vm._m(0),
    _vm._v(" "),
    _c("div", { staticClass: "address" }, [
      _c("div", { staticClass: "a-container" }, [
        _c("span", { staticClass: "ac-title" }, [_vm._v("收货地址:")]),
        _vm._v(" "),
        _c("span", [
          _c("i", { staticClass: "el-icon-service" }),
          _vm._v(_vm._s(" " + (_vm.addressInfo.receiver || "")))
        ]),
        _vm._v(" "),
        _c("span", [
          _c("i", { staticClass: "el-icon-location" }),
          _vm._v(_vm._s(" " + (_vm.addressInfo.area_cn || "")))
        ]),
        _vm._v(" "),
        _c("span", [
          _c("i", { staticClass: "el-icon-location-outline" }),
          _vm._v(_vm._s(" " + (_vm.addressInfo.address || "")))
        ]),
        _vm._v(" "),
        _c("span", [
          _c("i", { staticClass: "el-icon-message" }),
          _vm._v(_vm._s(" " + (_vm.addressInfo.zip_code || "")))
        ]),
        _vm._v(" "),
        _c("span", [
          _c("i", { staticClass: "el-icon-phone-outline" }),
          _vm._v(
            _vm._s(
              " " +
                (_vm.addressInfo.contact_phone ||
                  _vm.expressRes.contact_tel ||
                  "")
            )
          )
        ])
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "title" }, [
      _c("span", [_vm._v("订单信息")])
    ])
  }
]
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6449f50c", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_list_vue__ = __webpack_require__(278);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6ebff1f2_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_list_vue__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(16);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(462)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6ebff1f2"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_list_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6ebff1f2_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_list_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6ebff1f2_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_list_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/component/seller/order/detail/list/list.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6ebff1f2", Component.options)
  } else {
    hotAPI.reload("data-v-6ebff1f2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 462:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(463);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(15).default
var update = add("073a683c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-6ebff1f2\",\"scoped\":true,\"sourceMap\":false}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./list.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-6ebff1f2\",\"scoped\":true,\"sourceMap\":false}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./list.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 463:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 464:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_vue__ = __webpack_require__(279);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_20708eb5_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_table_vue__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(16);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(465)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-20708eb5"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_20708eb5_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_table_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_20708eb5_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_table_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/component/seller/order/detail/list/table.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-20708eb5", Component.options)
  } else {
    hotAPI.reload("data-v-20708eb5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 465:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(466);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(15).default
var update = add("76a1b21f", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-20708eb5\",\"scoped\":true,\"sourceMap\":false}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./table.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-20708eb5\",\"scoped\":true,\"sourceMap\":false}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./table.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 466:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.table[data-v-20708eb5] {\n  width: 1024px;\n  display: flex;\n  flex-direction: column;\n}\n.table .t-server[data-v-20708eb5] {\n  display: flex;\n  align-items: center;\n  height: 40px;\n  padding-left: 10px;\n  font-size: 12px;\n  color: #666;\n  white-space: pre;\n}\n.table .order[data-v-20708eb5] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: #333;\n}\n.table .order[data-v-20708eb5]:nth-child(1) {\n  width: 40px;\n}\n.table .order[data-v-20708eb5]:nth-child(2) {\n  width: 140px;\n}\n.table .order[data-v-20708eb5]:nth-child(3) {\n  width: 214px;\n}\n.table .order[data-v-20708eb5]:nth-child(4) {\n  width: 230px;\n}\n.table .order[data-v-20708eb5]:nth-child(5) {\n  width: 80px;\n}\n.table .order[data-v-20708eb5]:nth-child(6) {\n  width: 320px;\n}\n.table .money[data-v-20708eb5] {\n  color: #0076ff !important;\n  margin-left: 4px;\n}\n.table .t-box[data-v-20708eb5] {\n  width: 1024px;\n  padding: 10px;\n  background-color: white;\n}\n.table .t-box .header[data-v-20708eb5] {\n  display: flex;\n  height: 32px;\n  border: 1px solid #d8d8d8;\n  background-color: #d8d8d8;\n}\n.table .t-box .header .h-order[data-v-20708eb5] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: #333;\n  font-size: 12px;\n}\n.table .t-box .header .h-order[data-v-20708eb5]:nth-child(1) {\n  width: 40px;\n}\n.table .t-box .header .h-order[data-v-20708eb5]:nth-child(2) {\n  width: 140px;\n}\n.table .t-box .header .h-order[data-v-20708eb5]:nth-child(3) {\n  width: 214px;\n}\n.table .t-box .header .h-order[data-v-20708eb5]:nth-child(4) {\n  width: 230px;\n}\n.table .t-box .header .h-order[data-v-20708eb5]:nth-child(5) {\n  width: 80px;\n}\n.table .t-box .header .h-order[data-v-20708eb5]:nth-child(6) {\n  width: 320px;\n}\n.table .t-box .content[data-v-20708eb5] {\n  display: flex;\n  flex-direction: column;\n  border: 1px solid #d8d8d8;\n  border-top: 0;\n}\n.table .t-box .content .c-order[data-v-20708eb5] {\n  display: flex;\n  width: 100%;\n  height: 40px;\n  background-color: white;\n}\n.table .t-box .content .c-order .c-order[data-v-20708eb5] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: #333;\n  font-size: 14px;\n}\n.table .t-box .content .c-order .c-order[data-v-20708eb5]:nth-child(1) {\n  width: 40px;\n}\n.table .t-box .content .c-order .c-order[data-v-20708eb5]:nth-child(2) {\n  width: 140px;\n}\n.table .t-box .content .c-order .c-order[data-v-20708eb5]:nth-child(3) {\n  width: 214px;\n}\n.table .t-box .content .c-order .c-order[data-v-20708eb5]:nth-child(4) {\n  width: 230px;\n}\n.table .t-box .content .c-order .c-order[data-v-20708eb5]:nth-child(5) {\n  width: 80px;\n}\n.table .t-box .content .c-order .c-order[data-v-20708eb5]:nth-child(6) {\n  width: 320px;\n}\n.table .t-box .content .c-order .c-delete[data-v-20708eb5] {\n  color: #0076ff;\n  cursor: pointer;\n}\n.table .l-requirement[data-v-20708eb5] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 1024px;\n  padding: 8px 0;\n  background-color: white;\n}\n.table .l-requirement .lr-remind[data-v-20708eb5] {\n  margin-left: 10px;\n  font-size: 14px;\n  color: #333;\n  white-space: pre;\n}\n.table .l-requirement .lr-total[data-v-20708eb5] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  margin-left: 120px;\n  font-size: 12px;\n  color: #333;\n}\n.table .l-requirement .lr-total > span[data-v-20708eb5] {\n  margin: 4px 10px;\n}\n", ""]);

// exports


/***/ }),

/***/ 467:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "table" }, [
    _c("div", { staticClass: "t-server" }, [
      _vm._v(
        "订单号: " +
          _vm._s(_vm.ordersData.order_id) +
          "  " +
          _vm._s(_vm.ordersData.order_dt) +
          "  " +
          _vm._s(_vm.ordersData.seller_name)
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "t-box" }, [
      _c(
        "div",
        { staticClass: "header" },
        _vm._l(_vm.headerTitles, function(title, index) {
          return _c("div", { key: index, staticClass: "h-order" }, [
            _c("span", [_vm._v(_vm._s(title))])
          ])
        })
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "content" },
        _vm._l(_vm.ordersData.data, function(order, gIndex) {
          return _c("div", { key: gIndex, staticClass: "c-order" }, [
            _c("div", { staticClass: "c-order" }),
            _vm._v(" "),
            _c("div", { staticClass: "c-order" }, [
              _vm._v(_vm._s(order.label))
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "c-order" }, [_vm._v(_vm._s(order.pid))]),
            _vm._v(" "),
            _c("div", { staticClass: "c-order money" }, [
              _vm._v("¥" + _vm._s(order.price))
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "c-order" }, [
              _vm._v(_vm._s(order.quantity))
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "c-order money" }, [
              _vm._v("¥" + _vm._s(order.money))
            ])
          ])
        })
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "l-requirement" }, [
      _c("div", { staticClass: "lr-remind" }, [
        _vm._v("备注: " + _vm._s(_vm.ordersData.remark) + "\n    ")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "lr-total" })
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-20708eb5", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),

/***/ 468:
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
    { staticClass: "list" },
    [_c("l-table", { attrs: { ordersData: _vm.detailOrdersData } })],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6ebff1f2", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),

/***/ 469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "order" }, [
    _c("div", { staticClass: "o-title" }, [
      _vm._v("\n    订单详情\n    "),
      _c(
        "div",
        { staticClass: "o-print-container", on: { click: _vm.goPrint } },
        [
          _c("div", { staticClass: "o-print" }),
          _vm._v(" "),
          _c("span", [_vm._v("打印")])
        ]
      )
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "o-top" },
      [
        _c("o-express"),
        _vm._v(" "),
        _c("o-address", {
          attrs: { addressInfo: _vm.detailOrdersData.contact }
        }),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "o-list-container" },
          [
            _c("o-list"),
            _vm._v(" "),
            _c("div", { staticClass: "pay-total-container" }, [
              _c("div", { staticClass: "pay-total" }, [
                _c("div", { staticClass: "pt-count" }, [
                  _vm._v("\n            总计:\n            "),
                  _c("span", [
                    _vm._v(
                      "货品种类: " +
                        _vm._s(_vm.detailOrdersData.total_quantity) +
                        "类"
                    )
                  ]),
                  _vm._v(" "),
                  _c("span", [
                    _vm._v(
                      "数量总计: " +
                        _vm._s(_vm.detailOrdersData.total_quantity) +
                        "件"
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "pt-pay" }, [
                  _c("span", [
                    _vm._v("货品总金额: "),
                    _c("span", { staticClass: "money" }, [
                      _vm._v("¥" + _vm._s(_vm.detailOrdersData.total_money))
                    ])
                  ]),
                  _vm._v(" "),
                  _c("span", [
                    _vm._v("运费到付: "),
                    _c("span", { staticClass: "money" }, [
                      _vm._v(_vm._s(_vm.carriage))
                    ])
                  ])
                ])
              ])
            ])
          ],
          1
        )
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "o-footer-container" }, [
      _c("div", { staticClass: "o-footer" }, [_vm._m(0)], 1)
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "el-button",
      {
        staticClass: "back",
        attrs: { type: "primary" },
        on: { click: _vm.back }
      },
      [_vm._v("返回")]
    )
  }
]
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0a1d69e9", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ })

});