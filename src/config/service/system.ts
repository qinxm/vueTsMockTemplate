import request from '@/utils/request'
import apis from '@/config/api/system'

export const getMenuTreeList = () =>
  request({
    url: apis.getMenuTreeList,
    method: 'get'
  })
export const getMenuDetail = (params: any) =>
  request({
    url: apis.getMenuDetail,
    method: 'get',
    params
  })

export const createMenu = (data: any) =>
  request({
    url: apis.createMenu,
    method: 'post',
    data
  })

export const editMenu = (data: any) =>
  request({
    url: apis.editMenu,
    method: 'post',
    data
  })
export const deleteMenu = (params: any) =>
  request({
    url: apis.deleteMenu,
    method: 'delete',
    params
  })
export const getRoleList = (params: any) =>
  request({
    url: apis.getRoleList,
    method: 'get',
    params
  })
export const deleteRole = (id: any) =>
  request({
    url: `${apis.deleteRole}/${id}`,
    method: 'delete'
  })
export const editRole = (data: any) =>
  request({
    url: apis.editRole,
    method: 'post',
    data
  })
export const createRole = (data: any) =>
  request({
    url: apis.createRole,
    method: 'post',
    data
  })
export const getRoleDetail = (params: any) =>
  request({
    url: apis.getRoleDetail,
    method: 'get',
    params
  })

export const getDictList = (params: any) =>
  request({
    url: apis.getDictList,
    method: 'get',
    params
  })
export const getDictSelect = (data: any) =>
  request({
    url: apis.getDictSelect,
    method: 'post',
    data
  })
export const getDictTypeList = () =>
  request({
    url: apis.getDictTypeList,
    method: 'get'
  })

export const createDict = (data: any) =>
  request({
    url: apis.createDict,
    method: 'post',
    data
  })
export const editDict = (data: any) =>
  request({
    url: apis.editDict,
    method: 'post',
    data
  })
export const deleteDict = (params: any) =>
  request({
    url: apis.deleteDict,
    method: 'delete',
    params
  })
