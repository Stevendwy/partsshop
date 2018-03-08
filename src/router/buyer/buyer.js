export default [
  {path: 'all', component: () => import(/* webpackChunkName: "buyer-all" */'../../component/buyer/order/all/all.vue'), alias: ''},
  {path: 'pay', component: () => import(/* webpackChunkName: "buyer-pay" */'../../component/buyer/order/pay/pay.vue')},
  {path: 'send', component: () => import(/* webpackChunkName: "buyer-send" */'../../component/buyer/order/send/send.vue')},
  {path: 'get', component: () => import(/* webpackChunkName: "buyer-get" */'../../component/buyer/order/get/get.vue')},
  {path: 'sign', component: () => import(/* webpackChunkName: "buyer-sign" */'../../component/buyer/order/sign/sign.vue')},
  {path: 'close', component: () => import(/* webpackChunkName: "buyer-close" */'../../component/buyer/order/close/close.vue')},
]