import {
  login,
  logout,
  getInfoByUUID,
  getMessage,
  getContentByMsgId,
  hasRead,
  removeReaded,
  restoreTrash,
  getUnreadCount
} from '@/api/user'
import {
  enterTest
} from '@/api/student.data'
import { setToken, getToken, setUserId, getUserId, getExp, setExp } from '@/libs/util'

export default {
  state: {
    userInfo: {},
    userName: '',
    userId: getUserId(),
    avatorImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false,
    unreadCount: 0,
    messageUnreadList: [],
    messageReadedList: [],
    messageTrashList: [],
    messageContentStore: {},
    experimentId: '', // 学生子系统实验 ID,
    compyId: '', // 学生公司 ID
    compyName: '' // 学生公司名称
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
      setUserId(id)
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    setMessageCount (state, count) {
      state.unreadCount = count
    },
    setMessageUnreadList (state, list) {
      state.messageUnreadList = list
    },
    setMessageReadedList (state, list) {
      state.messageReadedList = list
    },
    setMessageTrashList (state, list) {
      state.messageTrashList = list
    },
    updateMessageContentStore (state, { msg_id, content }) {
      state.messageContentStore[msg_id] = content
    },
    moveMsg (state, { from, to, msg_id }) {
      const index = state[from].findIndex(_ => _.msg_id === msg_id)
      const msgItem = state[from].splice(index, 1)[0]
      msgItem.loading = false
      state[to].unshift(msgItem)
    },
    setExperimentId (state, id) {
      state.experimentId = id
    },
    setCompyId (state, id) {
      state.compyId = id
    },
    setCompyName (state, name) {
      state.compyName = name
    }
  },
  getters: {
    messagmessageeUnreadCount: state => state.messageUnreadList.length,
    messageReadedCount: state => state.messageReadedList.length,
    messageTrashCount: state => state.messageTrashList.length
  },
  actions: {
    // 登录
    handleLogin ({ state, commit }, { loginName, loginPwd, role, type }) {
      /*
      return new Promise((resolve, reject) => {
        userName = userName.trim()
        let access = role === 1 ? 'student' : role === 2 ? 'teacher' : 'admin'
        commit('setToken', access)
        resolve()
      })
      */
      return new Promise((resolve, reject) => {
        login({
          loginName,
          loginPwd,
          type
        }).then(res => {
          const body = res.data
          // commit('setToken', data.token)
          if (body.Status === 2000) {
            let token = role === 1 ? 'student' : role === 2 ? 'teacher' : 'admin'
            // let access = [token]

            const data = body.Data
            commit('setToken', token)
            // commit('setUserInfo', data)
            // commit('setUserName', data.userName)
            commit('setUserId', data.UUID)
            // commit('setAccess', access)
            // commit('setHasGetInfo', true)
            // commit('setAvator', data.head_img)
            // console.log(state)
          }
          resolve(body)
        }).catch(err => {
          reject(err)
        })
      })
      /*
      return new Promise((resolve, reject) => {
        login({
          userName,
          loginPwd
        }).then(res => {
          const data = res.data
          commit('setToken', data.token)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
      */
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('setToken', '')
        //   commit('setAccess', [])
        //   resolve()
        // }).catch(err => {
        //   reject(err)
        // })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
        logout(state.userId).then(() => {
          commit('setUserInfo', {})
          commit('setToken', '')
          commit('setAccess', [])
          setExp({})
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      /*
      const data = {
        name: 'admin',
        user_id: '3',
        access: [state.token],
        token: 'admin',
        avator: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
      }
      */
      // console.log(state.userInfo, state.userId, state.userName)
      /*
      return new Promise((resolve, reject) => {
        commit('setAvator', data.avator)
        commit('setUserName', data.name)
        commit('setUserId', data.user_id)
        commit('setAccess', data.access)
        commit('setHasGetInfo', true)
        resolve(data)
      })
      */
      /*
      return new Promise((resolve, reject) => {
        try {
          getInfoByUUID(state.userId).then(res => {
            const data = res.data
            commit('setAvator', data.avator)
            commit('setUserName', data.name)
            commit('setUserId', data.user_id)
            commit('setAccess', data.access)
            commit('setHasGetInfo', true)

            commit('setUserInfo', data)
            commit('setUserName', data.userName)
            commit('setUserId', data.UUID)
            commit('setAccess', access)
            commit('setHasGetInfo', true)
            commit('setAvator', data.head_img)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
      */
      return new Promise((resolve, reject) => {
        try {
          getInfoByUUID(state.userId).then(res => {
            let data = res.data.Data
            const token = data.userType === 1 ? 'student' : data.userType === 2 ? 'teacher' : 'admin'
            const access = [token]

            commit('setUserInfo', data)
            commit('setUserName', data.userName)
            commit('setUserId', data.UUID)
            commit('setAccess', access)
            commit('setHasGetInfo', true)
            commit('setAvator', data.head_img)

            data.access = access

            const exp = getExp()
            // console.log(exp)
            if (exp) {
              commit('setExperimentId', exp.expID)
              commit('setCompyId', exp.compyID)
              commit('setCompyName', exp.compyName)
            }

            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    // 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
    getUnreadMessageCount ({ state, commit }) {
      getUnreadCount().then(res => {
        const { data } = res
        commit('setMessageCount', data)
      })
    },
    // 获取消息列表，其中包含未读、已读、回收站三个列表
    getMessageList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getMessage().then(res => {
          const { unread, readed, trash } = res.data
          commit('setMessageUnreadList', unread.sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          commit('setMessageReadedList', readed.map(_ => {
            _.loading = false
            return _
          }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          commit('setMessageTrashList', trash.map(_ => {
            _.loading = false
            return _
          }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 根据当前点击的消息的id获取内容
    getContentByMsgId ({ state, commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        let contentItem = state.messageContentStore[msg_id]
        if (contentItem) {
          resolve(contentItem)
        } else {
          getContentByMsgId(msg_id).then(res => {
            const content = res.data
            commit('updateMessageContentStore', { msg_id, content })
            resolve(content)
          })
        }
      })
    },
    // 把一个未读消息标记为已读
    hasRead ({ state, commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        hasRead(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageUnreadList',
            to: 'messageReadedList',
            msg_id
          })
          commit('setMessageCount', state.unreadCount - 1)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除一个已读消息到回收站
    removeReaded ({ commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        removeReaded(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageReadedList',
            to: 'messageTrashList',
            msg_id
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 还原一个已删除消息到已读消息
    restoreTrash ({ commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        restoreTrash(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageTrashList',
            to: 'messageReadedList',
            msg_id
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    handleExperiment ({ commit }, param) {
      return new Promise((resolve, reject) => {
        enterTest(param).then(res => {
          const body = res.data
          const data = body.Data
          if (body.Status === 2000) {
            setExp(data)
            commit('setExperimentId', data.expID)
            commit('setCompyId', data.compyID)
            commit('setCompyName', data.compyName)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
