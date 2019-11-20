interface IDictEnum {
  label: string,
  type: string,
  value: string
}

// 字典类型过滤器
export const dictFilter = (value: string, dataSource: IDictEnum[]) => {
  let valueName = '未知类型'
  if(Array.isArray(dataSource) ) {
    for (var i=0; i < dataSource.length;i++ ) {
      if (dataSource[i].value == value) {
        valueName = dataSource[i].label
        break;
      }
    }
  }

  return valueName
}
// 时间
export { parseTime } from '@/utils'

/**
 * 精度转换,用户金额
 */
export const precision = (value: number, precision: number) => {
  if (value === null || value === undefined) {
    return  ''
  }
  if(value && value !== 0 ) {
    return value.toFixed(precision)
  } else {
    let v = 0
    return v.toFixed(precision)
  }
}

/**
 * 转换URL
 * @param url
 */
export const urlFilter = (url: string) => {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  if(reg.test(url)) {
    return url
  } else {
    return ''
  }
}
