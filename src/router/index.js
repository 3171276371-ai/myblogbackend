import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout' //布局页



Vue.use(VueRouter)
 
export const constRouter = [
  {
      path: '/login',
      component: () => import('@/views/login/Login'),
      hidden: true //导航菜单忽略选项
  },
  
  {
      path: '',
      component: Layout, //应用布局页
      redirect: '/index',
      hidden: true,
  },
  {
      path: '/index',
      component: Layout, //应用布局页
      name: 'index',
      meta:{
          title: "首页", //导航菜单项标题
          icon: 'el-icon-s-home' //导航菜单图标
      },
      children: [
        {
          path: '',
          component: () => import('@/views/index/index.vue'),
          name: 'indexs',
          meta: {
            title: "工作台",
            icon: 'el-icon-s-home',
            // roles: ['admin','jerry']
          }
        }
      ]
  }
]

// 动态路由 communication
export const asyncRoutes = [
  {
    path: '/analyze',
    component: Layout,
    redirect: '/goods/index',
    meta: {
      title: "数据分析",
      icon: 'el-icon-s-marketing',
      hidden: false
    },
    children: [
      {
        path: 'analyzeindex',
        component: () => import('@/views/analyze/Index.vue'),
        name: 'analyzeindex',
        meta: {
          title: "主控数据",
          icon: 'el-icon-tickets',
          hidden: false,
          roles: ['admin','jerry']
        }
      },
      {
        path: 'analyzemonitor',
        component: () => import('@/views/analyze/Monitor.vue'),
        name: 'analyzemonitor',
        meta: {
          title: "监控数据",
          icon: 'el-icon-tickets',
          hidden: false,
          roles: ['admin','jerry']
        }
      },
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    meta:{
      title: "用户管理",
      icon: 'el-icon-s-goods',
      hidden: false,
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/user/Index.vue'),
        name: 'goodsindex',
        meta: {
          title: "用户权限",
          icon: 'el-icon-tickets',
          hidden: false,
          // roles: ['admin','jerry']
        }
      },
       
    
      {
        path: 'userinfo',
        component: () => import('@/views/user/UserInfo.vue'),
        name: 'userinfo',
        meta: {
          title: "用户管理列表",
          icon: 'el-icon-tickets',
          hidden: false,
          // roles: ['admin','jerry']
        }
      },
      {
        path: 'sort',
        component: () => import('@/views/user/Sort.vue'),
        name: 'sort',
        meta: {
          title: "产品分类",
          icon: 'el-icon-tickets',
          hidden: false,
          roles: ['admin','jerry']
        }
      },
      {
        path: 'article',
        component: () => import('@/views/user/Article.vue'),
        name: 'article',
        meta: {
          title: "文章管理",
          icon: 'el-icon-tickets',
          hidden: false,
          // roles: ['admin','jerry']
        }
      },
    ]
  },
   
  

  {
    path: '/communication',
    component: Layout,
    redirect: '/communication/index',
    meta:{
      title: "通讯",
      icon: 'el-icon-s-help',
      hidden: false,
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/communication/Index.vue'),
        name: 'communicationindex',
        meta: {
          title: "邮件",
          icon: 'el-icon-message',
          hidden: false,
          roles: ['admin','jerry']
        }
      },
    ]
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    meta:{
      title: "个人中心",
      icon: 'el-icon-user-solid',
      hidden: false,
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/home/Index.vue'),
        name: 'homeindex',
        meta: {
          title: "个人设置",
          icon: 'el-icon-user-solid',
          hidden: false,
          roles: ['admin','jerry']
        }
      },
      {
        path: 'Informationall',
        component: () => import('@/views/home/Informationall.vue'),
        name: 'homeinformationall',
        meta: {
          title: "个人消息",
          icon: 'el-icon-message-solid',
          hidden: false,
          roles: ['admin','jerry']
        }
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: constRouter
})

export default router

