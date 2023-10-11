import Vue from 'vue'
import VueRouter from 'vue-router'
import Films from '@/views/Films'
import Cinema from '@/views/Cinema'
import Center from '@/views/Center'
import City from '@/views/City'
import ShowingNow from '@/views/films/ShowingNow'
import ComingSoom from '@/views/films/ComingSoon'
import Detail from '@/views/MovieDetail'
import Search from '@/views/Search'

Vue.use(VueRouter)

const routes = [
  {
    path: '/films',
    component: Films,
    children: [
      {
        path: '/films/showingnow',
        component: ShowingNow
      }, 
      {
        path: '/films/comingsoon',
        component: ComingSoom
      },
      {
        path: '/films',
        redirect: '/films/showingnow'
      }
    ]
  },
  {
    path: '/detail/:myid', // 命名路由 {name: 'ddd', path: '/detail/myid', component: Detail}
    component: Detail
  },
  {
    path: '/cinema',
    // 懒加载 component: () => import(@/views/Cinema)
    component: Cinema
  },
  {
    path: '/cinema/search',
    component: Search
  },
  {
    path: '/city',
    component: City
  },
  {
    path: '/center',
    component: Center,
    meta: {
      // 可以定义是否需要登录等授权字段
      isneedlogin: true
    }
    // 独享路由
    // beforeEnter: (to, from, next) => {

    // }
  },
  {
    // 或者使用 * 通配符
    path: '/*',
    redirect: 'films' // 重定向
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
// 全局路由拦截
router.beforeEach((to, from, next) => {
  if (to.fullPath === '') {
    console.log('ddd')
    // 如果未授权跳到对应页面，并记录原先跳转的页面地址
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next()
  }
})

export default router
