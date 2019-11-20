import request from '@/utils/request'
import apis from "@/config/api/dictionaries";

export const getDictionaries = (data: any) =>
  request({
    url: apis.getDictionaries,
    method: 'post',
    data
})