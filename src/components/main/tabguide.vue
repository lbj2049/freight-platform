<template>
  <Layout style="height: 100%" class="main">
    <Header class="header-con">
      <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange" :siderable="false" :crumbable="false">
        <user :message-unread-count="unreadCount" :user-avator="userAvator"/>
        <!--<language v-if="$config.useI18n" @on-lang-change="setLocal" style="margin-right: 10px;" :lang="local"/>-->
        <!--<error-store v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader" :has-read="hasReadErrorPage" :count="errorCount"></error-store>-->
        <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>
        <go-back :backUrl="backUrl" style="margin-right: 10px;" v-if="!noBack"/>
      </header-bar>
    </Header>
    <Layout>
        <Layout class="main-layout-con">
          <Content class="content-wrapper">
            <Tabs type="card"
                  @on-click="tabClick"
                  v-if="options.length">
              <TabPane v-for="(item) in options"
                       :key="item.name"
                       :label="item.name"
                       :name="item.route">
              </TabPane>
            </Tabs>
            <router-view></router-view>
          </Content>
        </Layout>
    </Layout>
  </Layout>
</template>
<script>
import HeaderBar from './components/header-bar'
import User from './components/user'
import ABackTop from './components/a-back-top'
import Fullscreen from './components/fullscreen'
import Language from './components/language'
import GoBack from './components/go-back'
import ErrorStore from './components/error-store'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import './main.less'
export default {
  name: 'TabGuide',
  components: {
    HeaderBar,
    Language,
    Fullscreen,
    GoBack,
    ErrorStore,
    User,
    ABackTop
  },
  data () {
    return {
      collapsed: false,
      isFullscreen: false,
      backUrl: '/front/home',
      options: [ { name: '制票计费', route: '/stu/makesys' }, { name: '杂费核收', route: '/stu/checkfees' } ]
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
    },
    noBack () {
      return this.backUrl === this.$route.path
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
    },
    tabClick (name) {
      this.$router.push(name)
    }
  },
  watch: {
  },
  mounted () {
    this.setSystemName('main')
    // 设置初始语言
    this.setLocal(this.$i18n.locale)

    // 获取未读消息条数
    // this.getUnreadMessageCount()
  }
}
</script>
