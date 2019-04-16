<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <Avatar :src="userAvator"/>
      </Badge>
      <!--
      -->
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <!--
        <DropdownItem name="message">
          消息中心<Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
        </DropdownItem>
        -->
        <DropdownItem name="profile">个人信息</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <profile :profileable="profileable" @profileCancelEvent="profileCancelEvent" @watchProfileAbleChange="watchProfileAbleChange"/>
  </div>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'
import Profile from './profile'
export default {
  name: 'User',
  components: { Profile },
  props: {
    userAvator: {
      type: String,
      default: ''
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      profileable: false
    }
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    logout () {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    },
    message () {
      this.$router.push({
        name: 'message_page'
      })
    },
    profile () {
      this.profileClickEvent()
    },
    handleClick (name) {
      switch (name) {
        case 'logout': this.logout()
          break
        case 'profile': this.profile()
          break
        case 'message': this.message()
          break
      }
    },
    // 表单弹窗的状态
    watchProfileAbleChange (e) {
      if (e === false) {
        this.profileable = false
      };
    },
    // 点击事件
    profileClickEvent () {
      this.profileable = true
    },
    // 弹出层的事件
    profileCancelEvent () {
      this.profileable = false
    }
  }
}
</script>
