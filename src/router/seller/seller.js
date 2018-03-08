export default [
  {path: 'all', component: () => import(/* webpackChunkName: "seller-all" */'../../component/seller/order/all/all.vue'), alias: ''},
  {path: 'send', component: () => import(/* webpackChunkName: "seller-send" */'../../component/seller/order/send/send.vue')},
  {path: 'get', component: () => import(/* webpackChunkName: "seller-get" */'../../component/seller/order/get/get.vue')},
  {path: 'sign', component: () => import(/* webpackChunkName: "seller-sign" */'../../component/seller/order/sign/sign.vue')},
]