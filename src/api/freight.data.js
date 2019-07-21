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

export const compyGyardList = (params) => {
  return axios.request({
    url: '/gLocation/compyGyardList',
    data: params,
    method: 'post'
  })
}

export const compyOutworkerList = (params) => {
  return axios.request({
    url: '/gLocation/compyOutworkerList',
    data: params,
    method: 'post'
  })
}

export const compyLoadGroupList = (params) => {
  return axios.request({
    url: '/gLocation/compyLoadGroupList',
    data: params,
    method: 'post'
  })
}

export const truckLoadList = (params) => {
  return axios.request({
    url: '/fWayBill/truckLoadList',
    data: params,
    method: 'post'
  })
}

export const executePlan = (params) => {
  return axios.request({
    url: '/fWayBill/executePlan',
    data: params,
    method: 'post'
  })
}

export const loadCarNeedList = (params) => {
  return axios.request({
    url: '/gLocation/loadCarNeedList',
    data: params,
    method: 'post'
  })
}

export const arriveList = (params) => {
  return axios.request({
    url: '/fWayBill/arriveList',
    data: params,
    method: 'post'
  })
}

export const unloadPlanList = (params) => {
  return axios.request({
    url: '/fWayBill/unloadPlanList',
    data: params,
    method: 'post'
  })
}

export const unloadCarNeedList = (params) => {
  return axios.request({
    url: '/gLocation/unloadCarNeedList',
    data: params,
    method: 'post'
  })
}

export const getNoticCarList = (params) => {
  return axios.request({
    url: '/loadUnload/getNoticCarList',
    data: params,
    method: 'post'
  })
}

export const noticCar = (params) => {
  return axios.request({
    url: '/loadUnload/noticCar',
    data: params,
    method: 'post'
  })
}

export const getList = (params) => {
  return axios.request({
    url: '/loadUnload/getList',
    data: params,
    method: 'post'
  })
}

export const getCarPlaceList = (params) => {
  return axios.request({
    url: '/loadUnload/getCarPlaceList',
    data: params,
    method: 'post'
  })
}

export const setCarPlace = (params) => {
  return axios.request({
    url: '/loadUnload/setCarPlace',
    data: params,
    method: 'post'
  })
}

export const setPBoardSet = (params) => {
  return axios.request({
    url: '/loadUnload/setPBoardSet',
    data: params,
    method: 'post'
  })
}

export const bg3CheckLoad = (params) => {
  return axios.request({
    url: '/loadUnload/bg3CheckLoad',
    data: params,
    method: 'post'
  })
}

export const ed3CheckLoad = (params) => {
  return axios.request({
    url: '/loadUnload/ed3CheckLoad',
    data: params,
    method: 'post'
  })
}

export const bg3CheckUnLoad = (params) => {
  return axios.request({
    url: '/loadUnload/bg3CheckUnLoad',
    data: params,
    method: 'post'
  })
}

export const ed3CheckUnLoad = (params) => {
  return axios.request({
    url: '/loadUnload/ed3CheckUnLoad',
    data: params,
    method: 'post'
  })
}

export const setPBoardMove = (params) => {
  return axios.request({
    url: '/loadUnload/setPBoardMove',
    data: params,
    method: 'post'
  })
}

export const getTestModel = (params) => {
  return axios.request({
    url: '/fWayBill/getTestModel',
    data: params,
    method: 'post'
  })
}
