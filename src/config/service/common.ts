import request from '@/utils/request'
import apis from "@/config/api/common";

export const getDictonarySelectData = (type?:Array<string>) => request({
  url: apis.DICTONARY_SELECT,
  method: 'post',
  data: {
    type
  }
})

export const uploadFile = (fd:FormData) => request({
  url: apis.FILE_UPLOAD,
  method: 'POST',
  data: fd,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

export const getProvinceList = () => request({
  url: apis.PROVINCE_LIST,
})

export const getCityListByProvince = (provinceCode: string) => request({
  url: apis.CITY_LIST,
  params : {provinceCode}
})

export const getAreaListByCity = (cityCode: string) => request({
  url: apis.AREA_LIST,
  params : {cityCode}
})

export const getRefundDict = () => request({
  url: apis.Refund_Dict,
  method: 'POST',
})
