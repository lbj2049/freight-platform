import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import { setToken, getToken, canTurnTo, setTitle, getSystem, getExp, getHomeRoute } from '@/libs/util'
import config from '@/config'
const { homeName, guideName } = config

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
  else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    if (token === 'student') {
      next({
        name: guideName // 跳转到guideName页
      })
    } else {
      next({
        name: homeName // 跳转到homeName页
      })
    }
  } else {
    /*
    console.log(store.state)
    if (store.state.user.hasGetInfo) {
      turnTo(to, store.state.user.access, next)
    } else {
      setToken('')
      setUser({})
      next({
        name: 'login'
      })
    }
    */
    if (store.state.user.hasGetInfo) {
      turnTo(to, store.state.user.access, next)
    } else {
      store.dispatch('getUserInfo').then(user => {
        // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
        if (token === 'student') {
          const systemName = getSystem()
          const exp = getExp()
          // console.log(systemName, exp)
          // debugger
          if (to.name === 'home') {
            if (systemName === config.businessHomeName) {
              next({
                name: config.businessHomeName // 跳转到homeName页
              })
            } else if (systemName === config.freightHomeName) {
              next({
                name: config.freightHomeName // 跳转到homeName页
              })
            } else if (systemName === config.containerHomeName) {
              next({
                name: config.containerHomeName // 跳转到homeName页
              })
            } else if (systemName === config.ticketHomeName) {
              next({
                name: config.ticketHomeName // 跳转到homeName页
              })
            }
          }
          if (exp && Object.keys(exp).length !== 0) {
            const UUID = store.state.user.userId
            const param = { ...exp, UUID }
            // console.log(param)
            store.dispatch('handleExperiment', param).then(expInfo => {
              console.log(expInfo)
              next({
                name: '/front/guide' // 跳转到homeName页
              })
            })
          } else {
            next({
              name: config.guideName // 跳转到homeName页
            })
          }
          // turnTo(homeRoute, user.access, next)
        } else {
          turnTo(to, user.access, next)
        }
      }).catch(() => {
        setToken('')
        next({
          name: 'login'
        })
      })
    }
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
