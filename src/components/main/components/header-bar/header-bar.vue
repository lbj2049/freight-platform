<template>
  <div class="header-bar">
    <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
    <div class="logo-con">
      <!--<img v-show="!collapsed" :src="maxLogo" key="max-logo" />-->
      <!--<img v-show="collapsed" :src="minLogo" key="min-logo" />-->
      <span>{{logoName}}</span><Tag color="geekblue" v-if="hasCompy">{{compyName}}</Tag>
    </div>
    <sider-trigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange" v-if="siderable"></sider-trigger>
    <custom-bread-crumb show-icon style="margin-left: 30px;" :list="breadCrumbList" v-if="crumbable"></custom-bread-crumb>
    <slot name="top-menu"></slot>
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import siderTrigger from './sider-trigger'
import customBreadCrumb from './custom-bread-crumb'
import './header-bar.less'
import minLogo from '@/assets/images/logo-min.jpg'
import maxLogo from '@/assets/images/logo.jpg'
export default {
  name: 'HeaderBar',
  components: {
    siderTrigger,
    customBreadCrumb
  },
  getters: {
  },
  data () {
    return {
      minLogo,
      maxLogo
    }
  },
  props: {
    collapsed: Boolean,
    siderable: {
      type: Boolean,
      default: true
    },
    crumbable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    hasCompy () {
      // console.log(this.$store.getters.systemName)
      return this.$store.getters.systemName === 'business' || this.$store.getters.systemName === 'freight' || this.$store.getters.systemName === 'ticket'
    },
    compyName () {
      return this.$store.state.user.compyName
    },
    logoName () {
      return this.$store.getters.logoName
    },
    breadCrumbList () {
      return this.$store.state.app.breadCrumbList
    }
  },
  methods: {
    handleCollpasedChange (state) {
      this.$emit('on-coll-change', state)
    }
  }
}
</script>
