<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="role">
      <Select v-model="form.role">
        <Option v-for="item in roles" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </FormItem>
    <FormItem prop="loginName">
      <Input v-model="form.loginName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="loginPwd">
      <Input type="password" v-model="form.loginPwd" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary">登录</Button>
      <Button @click="handleRegister" type="text" style="float: right">注册</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    loginNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    loginPwdRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        loginName: 'admin',
        loginPwd: 'admin',
        role: 1
      },
      roles: [
        {
          label: '学生',
          value: 1
        },
        {
          label: '老师',
          value: 2
        },
        {
          label: '管理员',
          value: 3
        }
      ]
    }
  },
  computed: {
    rules () {
      return {
        loginName: this.loginNameRules,
        loginPwd: this.loginPwdRules
      }
    }
  },
  methods: {
    changeRole (val) {
      console.log(val)
    },
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            loginName: this.form.loginName,
            loginPwd: this.form.loginPwd,
            role: this.form.role,
            type: this.form.role
          })
        }
      })
    },
    handleRegister () {
      this.$emit('do-register')
    }
  }
}
</script>
