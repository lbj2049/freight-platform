<template>
  <div>
    <Modal :value="editable" :mask-closable="false" :footer-hide="true" title="用户注册" @on-visible-change="watchEditableChange" :styles="{top: '16%'}" width="880">
      <Form ref="registerForm" :model="registerForm" :rules="registerRule" :label-width="80">
        <FormItem label="班级" prop="classId">
          <Select v-model="registerForm.classId" placeholder="请输入班级">
            <Option value="1">一班</Option>
            <Option value="2">二班</Option>
            <Option value="3">三班</Option>
          </Select>
        </FormItem>
        <FormItem label="学号" prop="userno">
          <Input v-model="registerForm.userno" placeholder="请输入学号"></Input>
        </FormItem>
        <FormItem label="登录名" prop="username">
          <Input v-model="registerForm.username" placeholder="请输入登录名"></Input>
        </FormItem>
        <FormItem label="姓名" prop="realname">
          <Input v-model="registerForm.realname" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="性别" prop="sex">
          <RadioGroup v-model="registerForm.sex">
            <Radio label="1">男</Radio>
            <Radio label="2">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input v-model="registerForm.password" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="联系电话" prop="phone">
          <Input v-model="registerForm.phone" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('registerForm')">注册</Button>
          <Button @click="handleReset('registerForm')" style="margin-left: 8px">重置</Button>
          <Button @click="formCancelEvent" type="text" style="float: right">关闭</Button>
        </FormItem>
      </Form>
      <!--提交时加载动画-->
      <Spin size="large" fix v-if="loading"></Spin>
      </Modal>
    </div>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      registerForm: {
        classId: '',
        userno: '',
        username: '',
        realname: '',
        sex: 1,
        password: '',
        phone: ''
      },
      registerRule: {
        classId: [
          { required: true, message: '班级不能为空', trigger: 'blur' }
        ],
        userno: [
          { required: true, message: '学号不能为空', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '登录名不能为空', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 弹出层的事件
    formConfirmEvent () {
      this.$emit('formConfirmEvent')
    },
    formCancelEvent () {
      this.$emit('formCancelEvent')
      this.handleReset('registerForm')
    },
    watchEditableChange (e) {
      this.$emit('watchEditableChange', e)
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
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
