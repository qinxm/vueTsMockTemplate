import axios, { AxiosStatic, AxiosInstance } from 'axios'
import { Message, MessageBox, Loading } from 'element-ui'
import { UserModule } from '@/store/modules/user'
import router from '@/router'
import { setToken } from './cookies'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 20000,
  // withCredentials: true // send cookies when cross-domain requests
})

// Request interceptors
service.interceptors.request.use(
config => {
    // Add Authorization header to every request, you can add other custom headers here
    if (UserModule.token) {
      config.headers['Authorization'] = UserModule.token
    }
    // 因为AxiosRequestConfig类型的限制，将noLoading配置暂存在headers中，读取后将其删除
    if(config.headers['noLoading'] === undefined || config.headers['noLoading'] === false) {
      UserModule.requestLoading = Loading.service({
        // lock: true,
        text: '正在加载',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)'
      });
    }
    // 删除noLoading
    if(config.headers['noLoading'] !== undefined) {
      delete config.headers['noLoading']
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)
// 导出失败读取Blob内容
function readBlobContent(data: any) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsText(data, 'UTF-8')
    reader.addEventListener(
      'loadend',
      function() {
        resolve(reader.result)
      },
      false
    )
    reader.addEventListener(
      'error',
      function() {
        reject(reader)
      },
      false
    )
  })
}

// 重新登录提示
function login() {
  UserModule.ResetToken()
  location.reload() // To prevent bugs from vue-router
}
function goSupplyInfoPage() {
  MessageBox.alert(
    '供应商信息未补充完成，将跳转信息补充页面!',
    {
      showClose: false,
      confirmButtonText: '确定',
      type: 'warning'
    }
  ).then(() => {

    router.replace({
      name: 'SupplierConfig'
    })
  })
}
// 错误提示
function errorMessage(data: any) {
  Message({
    message: data.message || 'Error',
    type: 'error',
    duration: 3 * 1000
  })
}
// 获取下载文件名
function getFilename(contentDisposition: string) {
  if (!contentDisposition) return ''
  const patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
  const result = patt.exec(contentDisposition) as RegExpExecArray
  let filename = ''
  if (result) {
    filename = result.length > 0 ? result[1] : ''
  }
  // 解码之前尝试去除空格和双引号
  // content-disposition: "attachment; filename=\"xxxx.docx\";"
  return decodeURIComponent(filename.trim().replace(new RegExp('"', 'g'), ''))
}

/**
 * 刷新token方法
 * @param {*} headers 传入的headers
 * @param {*} tokenName headers中的token名称
 */
function refreshToken(headers = {}, tokenName = 'refresh_token') {
  if (!headers || !headers[tokenName])  return
  const tokenObj = headers[tokenName]
  if(tokenObj) {
    const refresh_token = tokenObj.token
    if (refresh_token) {
      const expireTime = tokenObj.expires_in * 1000
      var exdate = new Date();
      var expires = new Date(exdate.setTime(exdate.getTime() + expireTime));
      setToken(refresh_token, {
        expires
      })
    }
  }

}
// Response interceptors
service.interceptors.response.use(
  response => {
    const { status, data, headers } = response
    // // 查看有效期刷新token
    if (headers) {
      refreshToken(headers, 'refresh_token')
    }
    if(UserModule.requestLoading) {
      UserModule.requestLoading.close();
    }

    if (status == 200) {
      if (data instanceof Blob) {
        if (data.type !== 'application/json') {
          let filename = getFilename(headers['content-disposition'])
          return {
            code: 200,
            message: 'success',
            result: data,
            filename: filename,
            'content-type': headers['content-type']
          }
        } else {
          return readBlobContent(data).then(data => {
            return Promise.resolve({
              code: 500,
              message: '暂无数据',
              result: data
            })
          })
        }
      }

      return data
    } else {
      // 其他情况
      errorMessage(data)
      if (status == 401) {
        login()
      }
      return Promise.reject(data)
    }
  },
  error => {
    if(UserModule.requestLoading) {
      UserModule.requestLoading.close();
    }
    if (!error.response) {
      errorMessage({
        message: '连接超时，请检查网络'
      })
      return
    }
    const { status, data } = error.response

    if (status == 401) {
      errorMessage({
        message: 'token 失效，需重新登录系统'
      })
      // login()
    // } else if(status == 500) {
    //   if(data.message && data.message.length<50) {
    //     errorMessage(data)
    //   } else{
    //     errorMessage({
    //       message: '系统异常，请联系管理员'
    //     })
    //   }
    // } else if(status == 403 ){
    //   if(data && data.code == 100403) {
    //     // 需要跳转到补充信息页面
    //     goSupplyInfoPage()
    //   } else {
    //     login()
    //   }

    } else {
      errorMessage(data)
    }
    return Promise.reject(error)
  }
)

export default service
