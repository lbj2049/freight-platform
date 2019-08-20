import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'

import { getToken } from '@/libs/util'

Vue.use(Vuex)

export default new Vuex.Store({
  state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
    userInfo: {},
    userName: '',
    userId: '',
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
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app
  }
})
