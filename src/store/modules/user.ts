import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { login, logout, getUserInfo, getUserPermission } from '@/config/service/user'
import { getToken, setToken, removeToken, setVendorStatusToken, setVendorIdToken, getVendorIdToken, getVendorStatusToken, removeVendorIdToken, removeVendorStatusToken } from '@/utils/cookies'
import router from '@/router'
import { PermissionModule } from './permission'
import { TagsViewModule } from './tags-view'
import store from '@/store'

export interface IUserState {
  token: string,
  name: string,
  loginName: string,
  id: string,
  vendorID: number | null ,
  vendorStatus: number  // 0-未填写 1-未完善 2-已完善;
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = getToken() || ''
  public name = ''
  public loginName = ''
  public id = ''
  public vendorID = (getVendorIdToken() == 'null' ? null : ( Number(getVendorIdToken() ||  -1)))
  public vendorStatus = Number(getVendorStatusToken()) || -1
  public requestLoading

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }

  @Mutation
  private SET_LOGINNAME(loginName: string) {
    this.loginName = loginName
  }

  @Mutation
  private SET_VendorStatus(vendorStatus: number) {
    this.vendorStatus = vendorStatus
  }
  @Mutation
  private SET_VendorId(vendorID: any) {
    this.vendorID = vendorID
  }
  @Mutation
  private SET_ID(id: string) {
    this.id = id
  }

  @Action
  public SetUserInfo(info: {id: string, name:string, loginName: string, vendorStatus: number, vendorID: any}) {
    this.SET_ID(info.id)
    this.SET_NAME(info.name)
    this.SET_LOGINNAME(info.loginName)
    this.SET_VendorStatus(info.vendorStatus)
    this.SET_VendorId(info.vendorID)
  }

  @Action
  public SetUserToken(data: {accessToken: string, expires: number}) {
    //data.expires 秒
    const expireTime = data.expires*1000;
    let exdate = new Date()
    let expires = new Date(exdate.setTime(exdate.getTime() + expireTime))
    setToken(data.accessToken, {
      expires
    })
    this.SET_TOKEN(data.accessToken)

  }
  @Action
  public SetVendorStatusToken(data: {vendorStatus: number, vendorID: any}) {
    const expireDay = 15;
    let exdate = new Date()
    let expires = new Date(exdate.setDate(exdate.getDate() + expireDay))
    setVendorStatusToken(String(data.vendorStatus), {
      expires
    })
    setVendorIdToken(String(data.vendorID), {
      expires
    })
    this.SET_VendorStatus(data.vendorStatus)
    this.SET_VendorId(data.vendorID)
  }


  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
    removeVendorIdToken()
    removeVendorStatusToken()
    this.SET_VendorId(-1)
    this.SET_VendorStatus(-1)
    PermissionModule.resetRoutes()
  }

  @Action
  public async fetchUserInfo() {
    if (this.token) {
      const data = await getUserInfo()
      this.SetUserInfo(data.result)
    }
  }
  @Action
  public async ResetTokenCookie() {
    this.ResetToken()
    localStorage.removeItem("supplier:visitedViews" );
    TagsViewModule.delAllViews();
  }
  @Action
  public async LogOut() {
    this.ResetToken()
    localStorage.removeItem("supplier:visitedViews" );
    TagsViewModule.delAllViews();
    router.replace({name: 'Login'})
  }
}

export const UserModule = getModule(User)
