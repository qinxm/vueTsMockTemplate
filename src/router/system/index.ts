const Main = () => import(/* webpackChunkName: "Main" */ '@/views/Main.vue')
const UserList = () =>
  import(/* webpackChunkName: "User" */ '@/views/system/user/index.vue')
const UserDetail = () =>
  import(/* webpackChunkName: "User" */ '@/views/system/user/detail.vue')
const RoleList = () =>
  import(/* webpackChunkName: "Role" */ '@/views/system/role/index.vue')
const MenuList = () =>
  import(/* webpackChunkName: "Menu" */ '@/views/system/menu/index.vue')
const DictList = () =>
  import(/* webpackChunkName: "Dict" */ '@/views/system/dict/index.vue')
const Log = () =>
  import(/* webpackChunkName: "Log" */ '@/views/system/log/index.vue')

export default [
  {
    path: '/srm/system',
    component: Main,
    children: [
      {
        path: 'user/list',
        component: UserList,
        name: 'UserList',
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'user/detail',
        component: UserDetail,
        name: 'UserDetail',
        meta: {
          title: '修改用户信息'
        }
      },
      {
        path: 'role/list',
        component: RoleList,
        name: 'RoleList',
        meta: {
          title: '角色管理'
        }
      },
      {
        path: 'menu/list',
        component: MenuList,
        name: 'MenuList',
        meta: {
          title: '菜单管理'
        }
      },
      {
        path: 'dict/list',
        component: DictList,
        name: 'DictList',
        meta: {
          title: '字典管理'
        }
      }
    ]
  }
]
