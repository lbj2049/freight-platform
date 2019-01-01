<template>

  <div>
    <Modal :value="profileable" :mask-closable="false" title="基本信息" @on-visible-change="watchProfileAbleChange" :styles="{top: '16%'}" width="450">
      <Card :bordered="false" :dis-hover="true">
        <Form ref="dataFrom" :model="dataFrom" :label-width="80">
          <FormItem label="用户名" prop="username">
            <span v-html="dataFrom.username"></span>
          </FormItem>
          <FormItem label="姓名" prop="realName">
            <span v-html="dataFrom.realName"></span>
          </FormItem>
          <FormItem label="电话" prop="phone">
            <span v-html="dataFrom.phone"></span>
          </FormItem>
        </Form>
      </Card>
      <div slot="footer">
        <Button type="primary" @click="profileModifyClickEvent()">编辑</Button>
        <Button @click="profileCancelEvent()" style="margin-left: 8px">关闭</Button>
      </div>
      <Modal v-model="profileModifyAble" title="修改基本信息">
        <Form ref="dataFrom" :model="dataFrom" :rules="dataRule" :label-width="80">
          <FormItem label="用户名" prop="username">
            <Input v-model="dataFrom.username" placeholder="请输入用户名"></Input>
          </FormItem>
          <FormItem label="姓名" prop="realName">
            <Input v-model="dataFrom.realName" placeholder="请输入姓名"></Input>
          </FormItem>
          <FormItem label="电话" prop="phone">
            <Input v-model="dataFrom.phone" placeholder="请输入电话"></Input>
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
        username: 'admin',
        realName: 'admin',
        phone: '18888888888',
        password: ''
      },
      dataRule: {
        username: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
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
          this.$Message.success('Success!')
          this.profileModifyAble = false
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
