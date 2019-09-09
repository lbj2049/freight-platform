<template>
  <div class="go-back-btn-con">
    <Tooltip :content="'返回首页'" placement="bottom">
      <Icon @click.native="goBack(backUrl)" :type="'md-return-left'" :size="23"></Icon>
    </Tooltip>
  </div>
</template>

<script>
import { setExp } from '@/libs/util'
export default {
  name: 'GoBack',
  props: {
    backUrl: {
      type: String,
      default: '/'
    }
  },
  methods: {
    goBack (backUrl) {
      if (backUrl.search('front/home') > -1) {
        this.$store.state.user.compyId = ''
        setExp('')
      }
      this.$router.push({
        name: backUrl
      })
    }
  }
}
</script>

<style lang="less">
  .go-back-btn-con .ivu-tooltip-rel{
    height: 64px;
    line-height: 56px;
    i{
      cursor: pointer;
    }
  }
</style>
