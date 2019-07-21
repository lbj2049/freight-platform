import axios from '@/libs/api.request'

export const getExpList = (params) => {
  return axios.request({
    url: '/stuExpInfo/getExpList',
    data: params,
    method: 'post'
  })
}

export const isSubsystem = (params) => {
  return axios.request({
    url: '/expInfo/isSubsystem',
    data: params,
    method: 'post'
  })
}

export const enterTest = (params) => {
  return axios.request({
    url: '/stuExpInfo/enterTest',
    data: params,
    method: 'post'
  })
}
export const getScoreDetail = (params) => {
  return axios.request({
    url: '/score/getScoreDetail',
    data: params,
    method: 'post'
  })
}
