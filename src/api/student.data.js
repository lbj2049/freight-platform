import axios from '@/libs/api.request'

export const getExpList = (params) => {
  return axios.request({
    url: '/stuExpInfo/getExpList',
    data: params,
    method: 'post'
  })
}
