import rDetail from './detail'

export default [
  {path: 'selector', component: () => import(/* webpackChunkName: "selector" */'../../component/part/selector.vue'), alias: ''},
  {path: 'detail', component: () => import(/* webpackChunkName: "detail" */'../../component/part/detail/detail.vue'), children: rDetail}
]