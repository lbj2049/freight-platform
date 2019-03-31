import axios from '@/libs/api.request'

export const getTeaList = ({ pageNum, pageSize, keyword }) => {
  return axios.request({
    url: '/userInfo/getTeaList',
    params: {
      pageNum, pageSize, keyword
    },
    method: 'post'
  })
}
