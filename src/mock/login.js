import { getParams } from '@/libs/util'
const USER_MAP = {
  student: {
    name: 'student',
    user_id: '1',
    access: ['student'],
    token: 'student',
    avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
  },
  teacher: {
    name: 'teacher',
    user_id: '2',
    access: ['teacher'],
    token: 'teacher',
    avator: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
  },
  admin: {
    name: 'admin',
    user_id: '3',
    access: ['admin'],
    token: 'admin',
    avator: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
  }
}

export const login = req => {
  req = JSON.parse(req.body)
  // console.log('mock login')
  return { token: USER_MAP[req.userName].token }
}

export const getUserInfo = req => {
  const params = getParams(req.url)
  return USER_MAP[params.token]
}

export const logout = req => {
  return null
}
