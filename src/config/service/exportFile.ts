
import request from '@/utils/request'
import { Message } from 'element-ui'
import { Method } from 'axios'

/**
 * 下载文件类型
 */
export enum DownLoadFileType {
  Zip,
  Excel,
}
/**
 * 导出文件
 * @param {请求链接} url
 * @param {请求数据} data
 * @param {导出的文件名} filename
 */
const exportList = async (url: string, data?: any, method: Method ='post') => {
    return request({
        url: url,
        method,
        data,
        params: method.toLowerCase() == "get" ? data : '',
        timeout: 300000,
        responseType: 'blob',
    })
}

/**
 *
 * @param url
 * @param data
 * @param filename
 * @param method
 * @param fileType 'excel | 'zip'
 */
export const exportFlie = async (url: string, data?: any, filename = "download", method: Method="post", fileType?: DownLoadFileType) => {

    let res = await exportList(url, data, method)

    if (res.code == 200) {
        let type = '';
        if(fileType == DownLoadFileType.Zip) {
          type = 'application/zip;;charset=utf-8;'
        } else {
          type = 'application/vnd.ms-excel;charset=utf-8'
        }
        let blob = new Blob([res.result], { type });
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        if (fileType == DownLoadFileType.Zip) {
          link.download = res.filename ? res.filename : `${filename}.zip`;
        } else {
          link.download = res.filename ? res.filename : `${filename}.xls`;
        }

        // document.body.appendChild(link);
        link.click();
        link.remove();
    } else {
        Message({
            message: res.message,
            type: 'error'
        })
    }

}
