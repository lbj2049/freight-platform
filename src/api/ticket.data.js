import axios from '@/libs/api.request'

export const getList = (params) => {
  return axios.request({
    url: '/bill/getList',
    data: params,
    method: 'post'
  })
}

export const calculate = (params) => {
  return axios.request({
    url: '/bill/calculate',
    data: params,
    method: 'post'
  })
}

export const totleMoney = (params) => {
  return axios.request({
    url: '/bill/totleMoney',
    data: params,
    method: 'post'
  })
}

export const print = (params) => {
  return axios.request({
    url: '/bill/print',
    data: params,
    method: 'post'
  })
}
