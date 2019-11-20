import request from '@/utils/request'
import apis from '@/config/api/user';

export const login = (data: any) =>
  request({
    url: apis.login,
    method: 'post',
    data
  })

export const logout = () =>
  request({
    url: apis.logout,
    method: 'post'
  })

export const register = (data: any) =>
  request({
    url: apis.register,
    method: 'post',
    data
  })

export const getUserInfo = () =>
  request({
    url: apis.getUserInfo,
    method: 'get',
  })

export const getUserPermission = () =>
  request({
    url: apis.getUserPermission,
    method: 'post'
  })

export const editPwd = (data: any) =>
  request({
    url: apis.editPwd,
    method: 'put',
    data
  })

export const getSmsCaptcha = (params: any) =>
  request({
    url: apis.getSmsCaptcha,
    method: 'get',
    params
  })

export const findPwd = (data: any) =>
  request({
    url: apis.findPwd,
    method: 'put',
    data
  })

  export const getUserList = (params: any) =>
    request({
      url: apis.getUserList,
      method: 'get',
      params
    })
  export const getUserDetail = (params: any) =>
    request({
      url: apis.getUserDetail,
      method: 'get',
      params
    })
  export const postUserEdit = (data: any) =>
    request({
      url: apis.userEdit,
      method: 'post',
      data
    })
  export const getRoleList = (params: any) =>
    request({
      url: apis.roleList,
      method: 'get',
      params
    })

