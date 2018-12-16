<template>
  <Layout style="height: 100%" class="main">
    <Header class="header-con">
      <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange" :siderable="false" :crumbable="false">

        <dropdown-menu :dropdownMenu="dropdownMenu"/>
        <user :message-unread-count="unreadCount" :user-avator="userAvator"/>

        <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>
      </header-bar>
    </Header>
    <Layout>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <Content class="content-wrapper">
            <router-view/>
            <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import HeaderBar from './components/header-bar'
import User from './components/user'
import ABackTop from './components/a-back-top'
import Fullscreen from './components/fullscreen'
import Language from './components/language'
import ErrorStore from './components/error-store'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import './main.less'
import DropdownMenu from '../dropdown-menu/dropdown-menu'
export default {
  name: 'Guide',
  components: {
    HeaderBar,
    Language,
    Fullscreen,
    ErrorStore,
    User,
    ABackTop,
    DropdownMenu
  },
  data () {
    return {
      collapsed: false,
      isFullscreen: false,
      dropdownMenu: {
        title: '中国',
        firstDropDownMenuData: [
          {
            title: '北京'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'errorCount'
    ]),
    userAvator () {
      return this.$store.state.user.avatorImgPath
    },
    menuList () {
      return this.$store.getters.menuList
    },
    local () {
      return this.$store.state.app.local
    },
    hasReadErrorPage () {
      return this.$store.state.app.hasReadErrorPage
    },
    unreadCount () {
      return this.$store.state.user.unreadCount
    }
  },
  methods: {
    ...mapMutations([
      'setSystemName',
      'setLocal',
      'setHomeRoute'
    ]),
    ...mapActions([
      'handleLogin',
      'getUnreadMessageCount'
    ]),
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    }
  },
  watch: {
  },
  mounted () {
    this.setSystemName('horizontal-guide')
    // 设置初始语言
    this.setLocal(this.$i18n.locale)

    // 获取未读消息条数
    this.getUnreadMessageCount()
  }
}
</script>
