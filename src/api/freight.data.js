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

export const inOutStationList = (params) => {
  return axios.request({
    url: '/fWayBill/inOutStationList',
    data: params,
    method: 'post'
  })
}

export const waybillNoSel = (params) => {
  return axios.request({
    url: '/fWayBill/waybillNoSel',
    data: params,
    method: 'post'
  })
}

export const warehouseList = (params) => {
  return axios.request({
    url: '/gLocation/warehouseList',
    data: params,
    method: 'post'
  })
}

export const compyGlocation = (params) => {
  return axios.request({
    url: '/gLocation/compyGlocation',
    data: params,
    method: 'post'
  })
}
export const adCompyGlocation = (params) => {
  return axios.request({
    url: '/gLocation/adCompyGlocation',
    data: params,
    method: 'post'
  })
}
