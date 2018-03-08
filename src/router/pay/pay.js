export default [
  {path: 'alipay', name: 'alipay', component: () => import(/* webpackChunkName: "alipay" */'../../component/pay/alipay/alipay.vue'), props: true},
  {path: 'wepay', name: 'wepay', component: () => import(/* webpackChunkName: "wepay" */'../../component/pay/wepay/wepay.vue'), props: true},
]