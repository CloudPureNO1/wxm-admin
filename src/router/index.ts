
//import i18n ,{transToLocale} from '../i18n'
import { createRouter, createWebHistory } from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'

import{useInitSetPermission} from '../composable/sessionStorePermission'

import Index from '../views/Index.vue'
import RbacRouter from './rbac.route'
import QuartzRouter from './quartz.route'
import DemoRouter from './demo.route'


 
let ContentRouter: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "404" */ '../views/home/Home.vue'),
    // meta: { title: i18n.global.t('index.name') },
    // meta: { title: transToLocale('index.name') },
    meta: { title: 'Home.name' },// 在界面中$t('Home.name')
  },
  {
    path:'/briefIntroduction',
    name:'BriefIntroduction',
    meta:{title:'Menu.BriefIntroduction.title'},
    component:()=>import('../views/home/BriefIntroduction.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue'),
    meta: { title: 'Menu.NotFound.title' },
  },
]

ContentRouter=ContentRouter.concat(RbacRouter).concat(QuartzRouter).concat(DemoRouter)

const BaseRouter: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: { title: 'Home.name', keepAlive: true },
    children: ContentRouter,
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/**webpackChunkName: "404"  */ '../views/Login.vue'),
    meta: { title: 'Login.title' },
  },
]//.concat(BigScreenRouter)

const NotFoundRouter:RouteRecordRaw[]= [
  {path: '/:pathMatch(.*)', redirect: '/404'}
]

const routes:RouteRecordRaw[] = BaseRouter.concat(NotFoundRouter)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:routes
})



router.beforeEach(async(to, from) => {
  console.log('>>>>from：', from)
  const accessToken = sessionStorage.getItem("accessToken");
  let isAuthenticated=false
  if(accessToken) isAuthenticated=true
  if (
    // 检查用户是否已登录
    !isAuthenticated &&
    // ❗️ 避免无限重定向
    to.name !== 'Login'
  ) {
    // 将用户重定向到登录页面
    return { name: 'Login' }
  }

  // 已经登录的情况下获取用户权限,没有用户权限，则获取用户权限
  // 登录后，跳转的地址为：'/',这时候如果没有权限属性，则获取权限列表
  // {
  //   path: '/',
  //   redirect: '/home',
  // },
  // 因为 path '/' 转发到 '/home'
  if(to.path==='/home'&&!Object.prototype.hasOwnProperty.call(sessionStorage,"permission")){
    // const{res,err} = await usePostTo('/gateway/rbac/51004',{transCode:'51004'}) as ResultType;
    // if(err){
    //   // throw new Error(err||res.message)
    //   wxmAlert(err.message||err,'error')
    //   // return false
    //   return { name: 'Login' }
    // }
    // if(res.code!=='0'){
    //   wxmAlert(res.message,'error')
    //   // return false
    //   return { name: 'Login' }
    // }
    // sessionStorage.setItem('permission',JSON.stringify(res.data.list))
    return useInitSetPermission()
  }
    
})


export default router


