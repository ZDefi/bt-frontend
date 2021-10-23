import request from 'utils/request'

const HOST = process.env.REACT_APP_SERVER_HOST
const testHOST = HOST || 'https://api.flyswap.net'
// 获取用户
export const getUser = (data) => {
  return request({
    url: `${testHOST}/peer/getUser`,
    method: 'POST',
    data,
  })
}

// 获取节点
export const getPeers = (data) => {
  return request({
    url: `${testHOST}/peer/getPeers`,
    method: 'POST',
    data,
  })
}

// 获取用户下线
export const getUserSub = (data) => {
  return request({
    url: `${testHOST}/peer/getUserSub`,
    method: 'POST',
    data,
  })
}

// 注册绑定parent
export const regUserBind = (data) => {
  return request({
    url: `${testHOST}/peer/regUserBind`,
    method: 'POST',
    data,
  })
}

// 获取banner
export const getBannerList = (data) => {
  return request({
    url: `${HOST}/api/queryBannerList`,
    method: 'POST',
    data,
  })
}
