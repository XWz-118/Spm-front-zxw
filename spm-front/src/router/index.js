import { createRouter, createWebHashHistory } from 'vue-router'
import login from '../views/login.vue'
import signup from '../views/signup.vue'
//import home from '../views/home.vue'
import homenew from '../views/homenew.vue'
import Category1 from '@/views/Category/Category1.vue'
import Category2 from '@/views/Category/Category2.vue'
import Category3 from '@/views/Category/Category3.vue'
import Carts from '@/views/Carts.vue'
import Myorders from '@/views/Myorders.vue'
import UserMessage from '@/views/UserMessage.vue'
import Cartscontain from '@/views/Cartscontain.vue'
import product from '@/views/product.vue'
import checkout from '@/views/checkout.vue'
import Myorderscontain from '@/views/Myorderscontain.vue'
import paymentsuccess from '@/views/paymentsuccess.vue'
import SearchAndDisplay from '../views/SearchAndDisplay.vue' // 导入 SearchAndDisplay 组件


const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  },
  {
    path:'/homenew',
    name:'homenew',
    component:homenew
  },

  /*Catorgies的分类*/ 
  {
    path: '/category1',
    name: 'Category1',
    component: Category1
  },
  {
    path: '/category2',
    name: 'Category2',
    component: Category2
  },
  {
    path: '/category3',
    name: 'Category3',
    component: Category3
  }
  ,{
    path:'/Carts',
    name:'Carts',
    component:Carts
  },
  {
    path:'/Myorders',
    name:'Myorders',
    component:Myorders
  },
  {
    path:'/UserMessage',
    name:'UserMessage',
    component:UserMessage
  },
  {
    path:'/Cartscontain',
    name:'Cartscontain',
    component:Cartscontain
  },
  {
    path:'/product',
    name:'product',
    component:product
  },
  {
    path:'/checkout',
    name:'checkout',
    component:checkout
  },
  {
    path:'/Myorderscontain',
    name:'Myorderscontain',
    component:Myorderscontain
  },
  {
    path:'/paymentsuccess',
    name:'paymentsuccess',
    component:paymentsuccess
  },
  {
    path: '/searchanddisplay', // 定义 SearchAndDisplay 界面的路径
    name: 'SearchAndDisplay',
    component: SearchAndDisplay
  }
]

  

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
