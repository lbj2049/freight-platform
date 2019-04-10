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

