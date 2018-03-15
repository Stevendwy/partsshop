webpackJsonp([21],{

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__table_vue__ = __webpack_require__(288);
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




/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    aTable: __WEBPACK_IMPORTED_MODULE_0__table_vue__["a" /* default */]
  },
  computed: _extends({}, __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].mapState("part", ["goodsInfo", 'currentSearchItem']), {
    brands: function brands() {
      var brands = [{
        title: '全部品牌',
        count: this.goodsInfo.length
      }];

      return this.filter(brands, 'mill');
    },
    cities: function cities() {
      var cities = [{
        title: '全部城市',
        count: this.goodsInfo.length
      }];
      return this.filter(cities, 'address');
    }
  }),
  data: function data() {
    return {
      headerTitles: ["零件号", "品牌", "库存", "销售价", "城市", "仓库", "服务商", "购物车"]
    };
  },

  methods: _extends({}, __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].mapActions('part', ['addShoppingCart']), {
    filter: function filter(list, key) {
      out: for (var i = 0, j = this.goodsInfo.length; i < j; i++) {
        var goods = this.goodsInfo[i];

        for (var m = 0, n = list.length; m < n; m++) {
          var item = list[m];
          var title = item.title;

          if (title === goods[key]) {
            item.count++;
            continue out;
          }
        }

        var newOne = {
          title: goods[key],
          count: 1
        };
        list.push(newOne);
      }
      return list;
    }
  })
});

/***/ }),

/***/ 224:
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
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  props: ['headerTitles', 'contentList'],
  methods: _extends({}, __WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* default */].mapActions('part', ['cartAdd', 'cartDel']), __WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* default */].mapMutations('cart', ['updateOrders']), __WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* default */].mapMutations(['updateBadgeCount']), {
    cartClick: function cartClick(item) {
      var _this = this;

      if (item.in_spcarts) {
        this.cartDel({ item: item }).then(function () {
          _this.updateOrders({ item: item, mode: "decrease" });
          _this.updateBadgeCount({ mode: "decrease" });
        }).then(function () {
          return _this.$message.success('取消加入购物车');
        });
      } else {
        this.cartAdd({ item: item }).then(function () {
          _this.updateOrders({ item: item, mode: "plus" });
          _this.updateBadgeCount({ mode: "plus" });
        }).then(function () {
          return _this.$message.success('加入购物车成功');
        });
      }
    }
  })
});

/***/ }),

/***/ 286:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(287);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(15).default
var update = add("d1db02a4", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-4d388620\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./goods.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-4d388620\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./goods.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 287:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.goods[data-v-4d388620] {\n  font-size: 16px;\n  margin-top: 20px;\n}\n.goods .p-title[data-v-4d388620] {\n  margin-bottom: 8px;\n}\n.goods .p-title span[data-v-4d388620] {\n  margin-right: 20px;\n}\n.goods .remind[data-v-4d388620] {\n  font-size: 14px;\n  margin-top: 10px;\n}\n.goods .remind .title[data-v-4d388620] {\n  color: #9b9b9b;\n}\n.goods .remind .item[data-v-4d388620] {\n  margin-left: 20px;\n}\n.goods .brands[data-v-4d388620],\n.goods .cities[data-v-4d388620] {\n  font-size: 14px;\n  margin-top: 10px;\n}\n.goods .brands .title[data-v-4d388620],\n.goods .cities .title[data-v-4d388620] {\n  color: #9b9b9b;\n}\n.goods .brands .item[data-v-4d388620],\n.goods .cities .item[data-v-4d388620] {\n  margin-left: 20px;\n}\n", ""]);

// exports


/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_vue__ = __webpack_require__(224);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f8dba2d0_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_table_vue__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(16);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(289)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-f8dba2d0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f8dba2d0_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_table_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f8dba2d0_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_table_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/component/part/detail/goods/table.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f8dba2d0", Component.options)
  } else {
    hotAPI.reload("data-v-f8dba2d0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 289:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(290);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(15).default
var update = add("50185e4c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-f8dba2d0\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./table.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-f8dba2d0\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./table.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 290:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.table[data-v-f8dba2d0] {\n  width: 1024px;\n  font-size: 14px;\n  margin-top: 10px;\n}\n.table .row[data-v-f8dba2d0] {\n  display: flex;\n  width: 100%;\n  min-height: 40px;\n  border-bottom: 1px solid #d8d8d8;\n}\n.table .item[data-v-f8dba2d0] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.table .item[data-v-f8dba2d0]:nth-child(1) {\n  width: 20%;\n}\n.table .item[data-v-f8dba2d0]:nth-child(2) {\n  width: 15%;\n}\n.table .item[data-v-f8dba2d0]:nth-child(3) {\n  width: 10%;\n}\n.table .item[data-v-f8dba2d0]:nth-child(4) {\n  width: 15%;\n}\n.table .item[data-v-f8dba2d0]:nth-child(5) {\n  width: 10%;\n}\n.table .item[data-v-f8dba2d0]:nth-child(6) {\n  width: 10%;\n}\n.table .item[data-v-f8dba2d0]:nth-child(7) {\n  width: 10%;\n}\n.table .item[data-v-f8dba2d0]:nth-child(8) {\n  width: 10%;\n}\n.table .item > span[data-v-f8dba2d0] {\n  display: inline-block;\n  width: 100%;\n  word-wrap: break-word;\n  text-align: center;\n  padding: 2px 0;\n}\n.table .t-header[data-v-f8dba2d0] {\n  display: flex;\n  width: 100%;\n  min-height: 40px;\n  border-bottom: 1px solid #d8d8d8;\n  background-color: #f5f5f5;\n}\n.table .t-header .th-item[data-v-f8dba2d0] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.table .t-header .th-item[data-v-f8dba2d0]:nth-child(1) {\n  width: 20%;\n}\n.table .t-header .th-item[data-v-f8dba2d0]:nth-child(2) {\n  width: 15%;\n}\n.table .t-header .th-item[data-v-f8dba2d0]:nth-child(3) {\n  width: 10%;\n}\n.table .t-header .th-item[data-v-f8dba2d0]:nth-child(4) {\n  width: 15%;\n}\n.table .t-header .th-item[data-v-f8dba2d0]:nth-child(5) {\n  width: 10%;\n}\n.table .t-header .th-item[data-v-f8dba2d0]:nth-child(6) {\n  width: 10%;\n}\n.table .t-header .th-item[data-v-f8dba2d0]:nth-child(7) {\n  width: 10%;\n}\n.table .t-header .th-item[data-v-f8dba2d0]:nth-child(8) {\n  width: 10%;\n}\n.table .t-header .th-item > span[data-v-f8dba2d0] {\n  display: inline-block;\n  width: 100%;\n  word-wrap: break-word;\n  text-align: center;\n  padding: 2px 0;\n}\n.table .t-content[data-v-f8dba2d0] {\n  width: 100%;\n}\n.table .t-content .tc-row[data-v-f8dba2d0] {\n  display: flex;\n  width: 100%;\n  min-height: 40px;\n  border-bottom: 1px solid #d8d8d8;\n}\n.table .t-content .tc-row .tcr-item[data-v-f8dba2d0] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border-right: 1px solid #d8d8d8;\n}\n.table .t-content .tc-row .tcr-item[data-v-f8dba2d0]:nth-child(1) {\n  width: 20%;\n}\n.table .t-content .tc-row .tcr-item[data-v-f8dba2d0]:nth-child(2) {\n  width: 15%;\n}\n.table .t-content .tc-row .tcr-item[data-v-f8dba2d0]:nth-child(3) {\n  width: 10%;\n}\n.table .t-content .tc-row .tcr-item[data-v-f8dba2d0]:nth-child(4) {\n  width: 15%;\n}\n.table .t-content .tc-row .tcr-item[data-v-f8dba2d0]:nth-child(5) {\n  width: 10%;\n}\n.table .t-content .tc-row .tcr-item[data-v-f8dba2d0]:nth-child(6) {\n  width: 10%;\n}\n.table .t-content .tc-row .tcr-item[data-v-f8dba2d0]:nth-child(7) {\n  width: 10%;\n}\n.table .t-content .tc-row .tcr-item[data-v-f8dba2d0]:nth-child(8) {\n  width: 10%;\n}\n.table .t-content .tc-row .tcr-item > span[data-v-f8dba2d0] {\n  display: inline-block;\n  width: 100%;\n  word-wrap: break-word;\n  text-align: center;\n  padding: 2px 0;\n}\n.table .t-content .tc-row .tcr-item[data-v-f8dba2d0]:nth-child(1) {\n  border-left: 1px solid #d8d8d8;\n}\n.table .t-content .tc-row .tcr-item .sale-shopping-cart[data-v-f8dba2d0] {\n  width: 40px;\n  height: 40px;\n  background: url(/sp/static/img/spirit.png) 0 -40px / 40px auto no-repeat;\n  cursor: pointer;\n}\n.table .t-content .tc-row .tcr-item .sale-shopping-cart-selected[data-v-f8dba2d0] {\n  width: 40px;\n  height: 40px;\n  background: url(/sp/static/img/spirit.png) 0 -40px / 40px auto no-repeat;\n  cursor: pointer;\n  background: url(/sp/static/img/spirit.png) 0 -320px / 40px auto no-repeat;\n}\n", ""]);

// exports


/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "table" }, [
    _c(
      "div",
      { staticClass: "t-header" },
      _vm._l(_vm.headerTitles, function(title) {
        return _c("div", { key: title, staticClass: "th-item" }, [
          _vm._v(_vm._s(title))
        ])
      })
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "t-content" },
      _vm._l(_vm.contentList, function(item, index) {
        return _c("div", { key: index + "item", staticClass: "tc-row" }, [
          _c("div", { staticClass: "tcr-item" }, [
            _c("span", [_vm._v(_vm._s(item.pid))])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "tcr-item" }, [
            _c("span", [_vm._v(_vm._s(item.mill))])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "tcr-item" }, [
            _c("span", [_vm._v(_vm._s(item.amount))])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "tcr-item" }, [
            _c("span", [_vm._v(_vm._s(item.prices))])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "tcr-item" }, [
            _c("span", [_vm._v(_vm._s(item.address))])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "tcr-item" }, [
            _c("span", [_vm._v(_vm._s(item.location))])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "tcr-item" }, [
            _c("span", [_vm._v(_vm._s(item.supplier))])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "tcr-item" }, [
            _c("div", {
              class: item.in_spcarts
                ? "sale-shopping-cart-selected"
                : "sale-shopping-cart",
              on: {
                click: function($event) {
                  _vm.cartClick(item)
                }
              }
            })
          ])
        ])
      })
    )
  ])
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-f8dba2d0", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.goodsInfo
    ? _c(
        "div",
        { staticClass: "goods" },
        [
          _c("div", { staticClass: "p-title" }, [
            _c("span", [_vm._v(_vm._s(_vm.currentSearchItem.pid))]),
            _vm._v(" "),
            _c("span", [_vm._v(_vm._s(_vm.currentSearchItem.label))])
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "brands" },
            [
              _c("span", { staticClass: "title" }, [_vm._v("品牌:")]),
              _vm._v(" "),
              _vm._l(_vm.brands, function(brand, index) {
                return _c("span", { key: index, staticClass: "item" }, [
                  _vm._v(_vm._s(brand.title + "(" + brand.count + ")"))
                ])
              })
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "cities" },
            [
              _c("span", { staticClass: "title" }, [_vm._v("城市:")]),
              _vm._v(" "),
              _vm._l(_vm.cities, function(city, index) {
                return _c("span", { key: index, staticClass: "item" }, [
                  _vm._v(_vm._s(city.title + "(" + city.count + ")"))
                ])
              })
            ],
            2
          ),
          _vm._v(" "),
          _vm.goodsInfo.length > 0
            ? _c("a-table", {
                attrs: {
                  headerTitles: _vm.headerTitles,
                  contentList: _vm.goodsInfo
                },
                on: { cartClick: _vm.addShoppingCart }
              })
            : _vm._e()
        ],
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4d388620", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_goods_vue__ = __webpack_require__(223);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4d388620_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_goods_vue__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(16);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(286)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4d388620"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_goods_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4d388620_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_goods_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4d388620_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_goods_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/component/part/detail/goods/goods.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4d388620", Component.options)
  } else {
    hotAPI.reload("data-v-4d388620", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ })

});