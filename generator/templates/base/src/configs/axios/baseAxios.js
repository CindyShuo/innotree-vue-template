// axios配置
import axios from 'axios'
import qs from 'qs'
import UrlConfig from '../api.config'

const instance = axios.create({
  baseURL: UrlConfig.baseURL,
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  }
})

instance.interceptors.request.use(
  config => {
    // POST传参序列化
    if (
      config.method === 'post' &&
      config.headers['Content-Type'] !== 'multipart/form-data' &&
      config.headers['Content-Type'] !== 'application/json'
    ) {
      config.data = qs.stringify(config.data)
    }
    // 无token时，尝试重新获取token
    if (!config.headers['accessToken']) {
      config.headers['accessToken'] = 'token'
    }
    return config
  },
  error => {
    console.log('错误的传参')
    return Promise.reject(error)
  }
)

// code状态码200判断
instance.interceptors.response.use(
  res => {
    if (parseInt(res.status) !== 200) return Promise.reject(res)
    // 文件流
    if (res.config.responseType === 'blob') return res.data
    // 接口
    if (res.data.code === 0) return res.data
    return Promise.reject(res)
  },
  error => {
    console.log('网络异常')
    return Promise.reject(error)
  }
)

export default instance
