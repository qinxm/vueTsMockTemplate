import { getApis, postApis, formPostApis } from '@/configNew/api/index'
import request from '@/utils/request'

let exportService = {}
for (let item in getApis) {
  if (getApis.hasOwnProperty(item)) {
    exportService[item] = async (params?: any) => {
      return request({
        url: getApis[item],
        method: 'post',
        params
      })
    }
  }
}
for (let item in postApis) {
  if (postApis.hasOwnProperty(item)) {
    exportService[item] = async data => {
      return request({
        url: postApis[item],
        method: 'post',
        data
      })
    }
  }
}
for (let item in formPostApis) {
  if (postApis.hasOwnProperty(item)) {
    exportService[item] = async data => {
      return request({
        url: postApis[item],
        method: 'post',
        data,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }
  }
}
export default exportService
