import axios from '@/libs/api.request'

export const getTeaList = ({ pageNum, pageSize, keyword }) => {
  return axios.request({
    url: '/userInfo/getTeaList',
    params: {
      pageNum, pageSize, keyword
    },
    method: 'post'
  })
}

export const editUserInfo = (userInfo) => {
  return axios.request({
    url: '/userInfo/editUserInfo',
    data: userInfo,
    method: 'post'
  })
}

export const delUserInfo = (params) => {
  return axios.request({
    url: '/userInfo/delUserInfo',
    data: params,
    method: 'post'
  })
}
export const setState = (params) => {
  return axios.request({
    url: '/userInfo/setState',
    data: params,
    method: 'post'
  })
}
