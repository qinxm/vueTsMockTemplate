import Mock from 'mockjs'
import { menuData, menuTree, menuDetail } from './menu'
import { dictData, dictPage, dictTypeList } from './dict'
import { login, userInfo, userList } from './user'
import { roleList } from './role'
const handleRes = data => {
  return {
    code: 200,
    message: '请求成功'
  }
}

const data = {
  id: '@guid',
  name: '@cname'
}

Mock.mock('/api/test', 'post', data)
Mock.mock('/srm/auth/login/', 'post', login)
Mock.mock('/srm/sys/user/info/', 'get', userInfo)
Mock.mock('/srm/sys/menu/tree/', 'post', menuData)
Mock.mock('/srm/sys/menu/treeList/', 'get', menuTree)
Mock.mock('/srm/dict/list/select', 'post', dictData)
Mock.mock(/\/srm\/dict\/list[\w]*/, 'get', dictPage)
Mock.mock('/srm/dict/typeList', 'get', dictTypeList)
Mock.mock(/\/srm\/sys\/user\/list[\w]*/, 'get', userList)
Mock.mock(/\/srm\/sys\/menu\/detail[\w]*/, 'get', menuDetail)
Mock.mock(/\/srm\/sys\/role\/list[\w]*/, 'get', roleList)

export default Mock
