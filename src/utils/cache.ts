interface CacheData {
  key: string
  data: null | object
  expiresSecond: number
  onbeforeunload: Array<Function>
}

// 缓存数据
export const getStorageData = function({
  key = 'key',
  successCallback = (obj: any)=>{},
  failCallback = (obj?: any)=>{}
}) {
  const data = localStorage.getItem(key) && JSON.parse(localStorage.getItem(key) || '')
  if (data) {
    localStorage.removeItem(key)
    return successCallback(data)
  } else {
    return failCallback()
  }
}

/**
 * 设置缓存数据
 * @param key key 值
 * @param data value 值
 */
export const setStorageData = function(key: string, data: object) {
  localStorage.setItem(key, JSON.stringify(data))
}

/**
 * 设置缓存数据
 * @param param0
 */
export const setCacheDataToStorage = (
  data: CacheData = {
    key: 'key',
    data: null,
    expiresSecond: 3600,
    onbeforeunload: []
  }
) => {
  const expires = new Date().getTime() / 1000 + data.expiresSecond
  const doSetStorageData = () => {
    const scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop
    setStorageData(
       data.key, {
        expires,
        data: data.data,
        scrollTop
    })
  }
}
