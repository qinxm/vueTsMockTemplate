import Vue from 'vue'
import Router, { RouteConfig, Route } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { UserModule } from '@/store/modules/user'
import { PermissionModule } from '@/store/modules/permission'
import { TagsViewModule } from '@/store/modules/tags-view'
import system from './system'

const Main = () => import(/* webpackChunkName: "Main" */ '@/views/Main.vue')
const Home = () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue')
const Login = () => import(/* webpackChunkName: "Login" */ '@/views/Login.vue')
const Register = () =>
  import(/* webpackChunkName: "Login" */ '@/views/Register.vue')
const FindPwd = () =>
  import(/* webpackChunkName: "Login" */ '@/views/FindPwd.vue')
const Error = () => import(/* webpackChunkName: "Error" */ '@/views/Error.vue')

Vue.use(Router)

let viewRoutes: RouteConfig[] = []
//noVisitedView: true 不需要缓存
//noAuth: true 不需要校验权限，谁都可以访问
const commonRoute = [
  {
    path: '/',
    component: Main,
    redirect: '/home',
    meta: {
      noVisitedView: true,
      noAuth: true
    },
    children: [
      {
        path: 'home',
        component: Home,
        name: 'Home',
        meta: {
          noVisitedView: true,
          noAuth: true
        }
      },
      {
        path: '/error',
        name: 'Error',
        component: Error,
        meta: {
          noVisitedView: true,
          noAuth: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      noVisitedView: true,
      noAuth: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      noVisitedView: false,
      noAuth: true
    }
  },
  {
    path: '/findpwd',
    name: 'FindPwd',
    component: FindPwd,
    meta: {
      noVisitedView: false,
      noAuth: true
    }
  }
]
viewRoutes = viewRoutes.concat(system, commonRoute)

const router = new Router({
  routes: viewRoutes
})
const routerChangeAddTags = (to: Route) => {
  const { name, meta } = to
  if (name) {
    TagsViewModule.addView(to)
  }
  return
}
const whiteList = ['/login', '/register', '/findpwd']

router.beforeEach(async (to: Route, from: Route, next: any) => {
  NProgress.start()
  if (UserModule && UserModule.token) {
    // 动态读取可访问菜单权限
    let accessMenuMap: any = await PermissionModule.getMenusPromise()
    // 如果是登录，则跳转到home页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 如果是无需校验的页面，直接访问
      if (to.meta && to.meta.noAuth) {
        next()
        NProgress.done()
      } else {
        // 路由权限校验
        if (accessMenuMap && accessMenuMap[to.path]) {
          routerChangeAddTags(to)
          next()
          NProgress.done()
        } else {
          // 若无权限，则跳转到Error页面
          next({ name: 'Error' })
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
      NProgress.done()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

export default router
