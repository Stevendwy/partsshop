import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import rPart from './part/part'
import rCart from './cart/cart'
import rBuyer from './buyer/buyer'
import rSeller from './seller/seller'
import rPerson from './person/person'

export default new VueRouter({
  routes: [
    {path: '/', component: () => import(/* webpackChunkName: "sale" */'../component/sale/sale.vue'), alias: '/sale'},
    {path: '/part', component: () => import(/* webpackChunkName: "part" */'../component/part/part.vue'), children: rPart},
    {path: '/cart', component: () => import(/* webpackChunkName: "cart" */'../component/cart/cart.vue'), children: rCart},
    {path: '/history', component: () => import(/* webpackChunkName: "history" */'../component/history/history.vue')},
    {path: '/hub', component: () => import(/* webpackChunkName: "hub" */'../component/hub/hub.vue')},
    {path: '/buyer', component: () => import(/* webpackChunkName: "buyer" */'../component/buyer/buyer.vue'), children: rBuyer},
    {path: '/buyer/detail', component: () => import(/* webpackChunkName: "buyer-detail" */'../component/buyer/order/detail/detail.vue')},
    {path: '/seller', component: () => import(/* webpackChunkName: "buyer" */'../component/seller/seller.vue'), children: rSeller},
    {path: '/seller/detail', component: () => import(/* webpackChunkName: "seller-detail" */'../component/seller/order/detail/detail.vue')},
    {path: '/pay', name: 'pay', component: () => import(/* webpackChunkName: "pay" */'../component/pay/pay.vue'), props: true},
    {path: '/person', component: () => import(/* webpackChunkName: "person" */'../component/person/person.vue'), children: rPerson},
  ]
})