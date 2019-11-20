import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import { RouteConfig } from 'vue-router'
import store from '@/store'
import { getUserPermission } from '@/config/service/user'
import { getToken } from '@/utils/cookies'
import { Message } from 'element-ui'

export interface IPermissionState {
  routes: RouteConfig[]
  accessMenuMap: any
}
@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements IPermissionState {
  public routes: RouteConfig[] = []
  public accessMenuMap: any = null

  @Mutation
  private SET_ROUTES(routes: RouteConfig[]) {
    this.routes = routes
  }
  @Mutation
  private SET_AccessMenuMap(menuMap: any) {
    this.accessMenuMap = menuMap
  }

  @Action
  public GenerateRoutes(roles: RouteConfig[]) {
    this.SET_ROUTES(roles)
  }
  @Action
  public async getMenus() {
    const token = getToken() || ''
    // console.log('token', token)
    if (!token) {
      console.log('token不存在')
      return
    }
    const data = await getUserPermission()
    // const MenuData = data.result

    const convertMenu = (menus: any[], menuMap: object) => {
      let menuObj: any[] = []
      if (Array.isArray(menus)) {
        for (var i = 0; i < menus.length; i++) {
          let item = menus[i]
          menuMap[item.href] = item.name
          let hidden = (item.isShow && item.isShow =='1') ? false : true
          menuObj[i] = {
            path: item.href,
            meta: {
              icon: item.icon,
              title: item.name,
              // hidden: item.isShow === "0"
              // hidden: !show
              hidden: hidden
            }
          }

          if (item.children && item.children.length) {
            menuObj[i].meta.alwaysShow = true
            menuObj[i]['children'] = convertMenu(item.children, menuMap)

          }
        }
      }
      return menuObj
    }
    const menuMapObj = {}
    if (data.result) {
      const DestMenu = convertMenu(data.result, menuMapObj)
      this.SET_AccessMenuMap(menuMapObj)
      this.SET_ROUTES(DestMenu)
    } else {
      Message.error('获取菜单为空，请联系管理员')
    }

  }
  @Action
  public async resetRoutes() {
    this.SET_ROUTES([])
    this.SET_AccessMenuMap(null)
  }

  @Action
  public getMenusPromise() {
    return new Promise(async (resolve, reject) => {
      try {
        if(this.accessMenuMap) {
          resolve(this.accessMenuMap)
        } else {
          const token = getToken() || ''
          if (!token) {
            console.log('token不存在')
            return
          }
          const data = await getUserPermission()


          let convertMenu = (menus: any[], level: number, menuMap: object) => {
            let menuObj: any[] = []
            if (Array.isArray(menus)) {
              for (var i = 0; i < menus.length; i++) {
                let item = menus[i]
                menuMap[item.href] = item.name
                menuObj[i] = {
                  path: item.href,
                  meta: {
                    icon: item.icon,
                    title: item.name,
                    hidden: item.isShow === '0',
                    level
                  }
                }

                if (item.children && item.children.length) {
                  if (level === 1) {
                    menuObj[i].meta.alwaysShow = true
                  } else {
                    menuObj[i].meta.alwaysShow = false
                  }
                  let newLevel = level + 1
                  let children = convertMenu(item.children, newLevel, menuMap)

                  menuObj[i]['children'] = children
                }
              }
            }
            return menuObj
          }
          let menuMapObj: any = {}
          let level: number = 1
          const DestMenu = convertMenu(data.result,level, menuMapObj)
          this.SET_AccessMenuMap(menuMapObj)
          this.SET_ROUTES(DestMenu)
          resolve(menuMapObj)
        }
      } catch (e) {
        reject(new Error('获取菜单树异常'))
      }
    })
  }
}

export const PermissionModule = getModule(Permission)
