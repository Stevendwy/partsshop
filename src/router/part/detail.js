export default [
  {path: 'goods', component: () => import(/* webpackChunkName: "goods" */'../../component/part/detail/goods/goods.vue'), alias: ''},
  {path: 'content', component: () => import(/* webpackChunkName: "content" */'../../component/part/detail/content.vue')},
]