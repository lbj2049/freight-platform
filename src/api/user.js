import axios from '@/libs/api.request'

export const login = ({ loginName, loginPwd, role, type }) => {
  const data = {
    loginName,
    loginPwd,
    role,
    type
  }

  return axios.request({
    url: '/userInfo/login',
    data,
    method: 'post'
  })
}

export const upPwd = (params) => {
  return axios.request({
    url: '/userInfo/upPwd',
    data: params,
    method: 'post'
  })
}

export const getInfoByUUID = (UUID) => {
  return axios.request({
    url: '/userInfo/getInfoByUUID',
    params: {
      UUID
    },
    method: 'post'
  })
}

export const logout = (UUID) => {
  return axios.request({
    url: '/userInfo/logout',
    params: {
      UUID
    },
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
