import axios from '@/libs/api.request'

export const getClassList = (params) => {
  return axios.request({
    url: '/classInfo/getClassList',
    data: params,
    method: 'post'
  })
}

export const getClassSel = (params) => {
  return axios.request({
    url: '/classInfo/getClassSel',
    data: params,
    method: 'post'
  })
}

export const addClassInfo = (classInfo) => {
  return axios.request({
    url: '/classInfo/adClassInfo',
    data: classInfo,
    method: 'post'
  })
}

export const editClassInfo = (classInfo) => {
  return axios.request({
    url: '/classInfo/updClassInfo',
    data: classInfo,
    method: 'post'
  })
}

export const delClassInfo = (params) => {
  return axios.request({
    url: '/classInfo/delClassInfo',
    data: params,
    method: 'post'
  })
}

export const getStudentList = (params) => {
  return axios.request({
    url: '/userInfo/getStuList',
    data: params,
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

export const getExpList = (params) => {
  return axios.request({
    url: '/expInfo/getExpList',
    data: params,
    method: 'post'
  })
}

export const getExpSel = (params) => {
  return axios.request({
    url: '/stuExpInfo/getExpSel',
    data: params,
    method: 'post'
  })
}

export const adExp = (info) => {
  return axios.request({
    url: '/expInfo/adExp',
    data: info,
    method: 'post'
  })
}

export const updExp = (info) => {
  return axios.request({
    url: '/expInfo/updExp',
    data: info,
    method: 'post'
  })
}

export const delExp = (params) => {
  return axios.request({
    url: '/expInfo/delExp',
    data: params,
    method: 'post'
  })
}

export const setExpState = (params) => {
  return axios.request({
    url: '/expInfo/setState',
    data: params,
    method: 'post'
  })
}


export const getTeaWayBill = (params) => {
  return axios.request({
    url: '/teaWayBill/getTeaWayBill',
    data: params,
    method: 'post'
  })
}

export const adTeaWayBill = (info) => {
  return axios.request({
    url: '/teaWayBill/adTeaWayBill',
    data: info,
    method: 'post'
  })
}

export const updTeaWayBill = (info) => {
  return axios.request({
    url: '/teaWayBill/updTeaWayBill',
    data: info,
    method: 'post'
  })
}

export const delTeaWayBill = (params) => {
  return axios.request({
    url: '/teaWayBill/delTeaWayBill',
    data: params,
    method: 'post'
  })
}

export const sendTeaWayBill = (params) => {
  return axios.request({
    url: '/teaWayBill/sendTeaWayBill',
    data: params,
    method: 'post'
  })
}

export const getStuModelURL = (params) => {
  return axios.request({
    url: '/userInfo/getStuModelURL',
    data: params,
    method: 'post'
  })
}

export const importStuInfo = (params) => {
  return axios.request({
    url: '/userInfo/importStuInfo',
    data: params,
    method: 'post'
  })
}
