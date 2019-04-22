import axios from '@/libs/api.request'

export const getTDWayBillList = (params) => {
  return axios.request({
    url: '/stuWayBill/getTDWayBillList',
    data: params,
    method: 'post'
  })
}

export const getWayBillList = (params) => {
  return axios.request({
    url: '/stuWayBill/getWayBillList',
    data: params,
    method: 'post'
  })
}

export const saveWayBill = (params) => {
  return axios.request({
    url: '/stuWayBill/saveWayBill',
    data: params,
    method: 'post'
  })
}
