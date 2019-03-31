<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit" @do-register="doRegister"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
      <register :editable="editable" @formConfirmEvent="formConfirmEvent" @formCancelEvent="formCancelEvent" @watchEditableChange="watchEditableChange"/>

    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import Register from '../register/register'
import { mapActions } from 'vuex'
export default {
  components: {
    Register,
    LoginForm
  },
  data () {
    return {

      editable: false
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ loginName, loginPwd, role, type }) {
      this.handleLogin({ loginName, loginPwd, role, type }).then(body => {
        if (body.Status === 2000) {
          console.log(loginName, loginPwd, role, type, body)
          if (role === 1) {
            this.$router.push({
              name: this.$config.guideName
            })
          } else {
            this.$router.push({
              name: this.$config.homeName
            })
          }
        } else {
          this.$Message.error(body.Data.ErrorDes)
        }
        /*
        this.getUserInfo().then(res => {
          if (role === 1) {
            this.$router.push({
              name: this.$config.guideName
            })
            // this.$router.push({
            //   name: 'student-maketicketsystem'
            // })
          } else {
            this.$router.push({
              name: this.$config.homeName
            })
          }
        })
        */
      })
    },
    doRegister () {
      this.faultClickEvent()
    },
    // 表单弹窗的状态
    watchEditableChange (e) {
      if (e === false) {
        this.editable = false
      }
    },
    // 点击事件
    faultClickEvent () {
      this.editable = true
    },
    // 弹出层的事件
    formConfirmEvent () {
      this.editable = false
    },
    formCancelEvent () {
      this.editable = false
    }
  }
}
</script>

<style>

</style>
