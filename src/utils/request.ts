import axios from 'axios'

// 创建 axios
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 * 5, // request timeout
})

// response 拦截
request.interceptors.response.use(
  (response) => {
    const res = response.data
    
    // // 如果状态码不是200，就判断为错误或者异常
    // if (res.code !== 200) {
    //   return Promise.reject(new Error(res.message || 'Error'))
    // }
    return res
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default request
