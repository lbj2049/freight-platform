import axios from '@/libs/api.request'

export const getFWayBillList = (params) => {
  return axios.request({
    url: '/fWayBill/getFWayBillList',
    data: params,
    method: 'post'
  })
}

export const getWayBillList2 = (params) => {
  return axios.request({
    url: '/fWayBill/getWayBillList2',
    data: params,
    method: 'post'
  })
}

export const setPass = (params) => {
  return axios.request({
    url: '/stuWayBill/setPass',
    data: params,
    method: 'post'
  })
}

