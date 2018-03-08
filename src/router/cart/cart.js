export default [
  {path: 'count', component: () => import(/* webpackChunkName: "count" */'../../component/cart/count/count.vue'), alias: ''},
  {path: 'order', component: () => import(/* webpackChunkName: "order" */'../../component/cart/order/order.vue')},
  
]