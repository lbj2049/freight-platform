import axios from '@/libs/api.request'

export const getClassList = (params) => {
  return axios.request({
    url: '/classInfo/getClassList',
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
