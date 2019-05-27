<template>

  <div>
    <Modal :value="profileable" :mask-closable="false" title="基本信息" @on-visible-change="watchProfileAbleChange" :styles="{top: '16%'}" width="450">
      <Card :bordered="false" :dis-hover="true">
        <Form ref="dataFrom" :model="dataFrom" :label-width="80">
          <FormItem label="用户名" prop="loginName">
            <span v-html="dataFrom.loginName"></span>
          </FormItem>
          <FormItem label="姓名" prop="userName">
            <span v-html="dataFrom.userName"></span>
          </FormItem>
          <FormItem label="电话" prop="userTel">
            <span v-html="dataFrom.userTel"></span>
          </FormItem>
        </Form>
      </Card>
      <div slot="footer">
        <Button type="primary" @click="profileModifyClickEvent()">编辑</Button>
        <Button @click="profileCancelEvent()" style="margin-left: 8px">关闭</Button>
      </div>
      <Modal v-model="profileModifyAble" title="修改基本信息">
        <Form ref="dataFrom" :model="dataFrom" :rules="dataRule" :label-width="80">
          <FormItem label="用户名" prop="loginName">
            <span v-html="dataFrom.loginName"></span>
          </FormItem>
          <FormItem label="姓名" prop="userName">
            <span v-html="dataFrom.userName"></span>
          </FormItem>
          <FormItem label="电话" prop="userTel">
            <span v-html="dataFrom.userTel"></span>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input v-model="dataFrom.password" type="password" placeholder="请输入密码"></Input>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="primary" @click="handleSubmit('dataFrom')">保存</Button>
          <Button @click="handleReset('dataFrom')" style="margin-left: 8px">重置</Button>
        </div>
      </Modal>
    </Modal>
  </div>
</template>

<script>
import {
  upPwd
} from '@/api/user'
export default {
  name: 'profile',
  props: {
    profileable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      profileModifyAble: false,
      dataFrom: {
        loginName: 'admin',
        userName: 'admin',
        userTel: '18888888888',
        password: ''
      },
      dataRule: {
        password: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    getUserId () {
      return this.$store.state.user.userId
    }
  },
  mounted: function () {
    this.initInfo()
  },
  methods: {
    initInfo () {
      this.dataFrom = { ...this.$store.state.user.userInfo }
      // console.log(this.$store.state.user.userInfo)
    },
    // 弹出层的事件
    profileCancelEvent () {
      this.$emit('profileCancelEvent', false)
    },
    watchProfileAbleChange (e) {
      this.$emit('watchProfileAbleChange', e)
    },
    profileModifyClickEvent () {
      this.profileModifyAble = true
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const UUID = this.getUserId
          upPwd({ UUID: UUID, newPwd: this.dataFrom.password }).then(res => {
            this.resultHandler(res)
          })
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    resultHandler (res) {
      const body = res.data
      const data = body.Data
      if (body.Status === 2000) {
        this.profileModifyAble = false
        this.$Message.success(data.Result)
      } else {
        this.$Message.error(data.ErrorDes)
      }
    }
  }
}
</script>

<style scoped>

</style>
