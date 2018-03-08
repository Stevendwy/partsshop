export default [
  {path: 'account', alias: '', component: () => import(/* webpackChunkName: "person-account" */'../../component/person/account/account.vue')},
  {path: 'record', component: () => import(/* webpackChunkName: "person-record" */'../../component/person/record/record.vue')},
  {path: 'withdraw', component: () => import(/* webpackChunkName: "person-withdraw" */'../../component/person/withdraw/withdraw.vue')},
]