import axios from '@/libs/api.request'

// 空箱提报
export const saveEmptyCase = (params) => {
  return axios.request({
    url: '/emptyCase/saveEmptyCase',
    data: params,
    method: 'post'
  })
}

// 空箱列表
export const planEmptyCase = (params) => {
  return axios.request({
    url: '/emptyCase/planEmptyCase',
    data: params,
    method: 'post'
  })
}

// 提箱录入列表
export const getCaseInfoListByWbID = (params) => {
  return axios.request({
    url: '/emptyCase/getCaseInfoListByWbID',
    data: params,
    method: 'post'
  })
}

// 提箱录入确定
export const updCaseInfoByWbID = (params) => {
  return axios.request({
    url: '/emptyCase/updCaseInfoByWbID',
    data: params,
    method: 'post'
  })
}
