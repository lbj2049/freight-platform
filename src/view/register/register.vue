<template>
  <div>
    <Modal :value="editable" :mask-closable="false" :footer-hide="true" title="用户注册" @on-visible-change="watchEditableChange" :styles="{top: '16%'}" width="880">
      <Form ref="userInfo" :model="userInfo" :rules="registerRule" :label-width="80">
        <FormItem label="班级" prop="classID">
          <Select v-model="userInfo.classID" placeholder="请输入班级">
            <Option v-for="item in classes" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="登录名" prop="loginName">
          <Input v-model="userInfo.loginName" placeholder="请输入登录名"></Input>
        </FormItem>
        <FormItem label="密码" prop="loginPwd">
          <Input v-model="userInfo.loginPwd" placeholder="请输入密码"></Input>
        </FormItem>
        <FormItem label="姓名" prop="userName">
          <Input v-model="userInfo.userName" placeholder="请输入姓名"></Input>
        </FormItem>

        <FormItem label="电话" prop="userTel">
          <Input v-model="userInfo.userTel"  placeholder="请输入电话" ></Input>
        </FormItem>
        <FormItem label="性别" prop="userSex">
          <RadioGroup v-model="userInfo.userSex">
            <Radio :label="1">男</Radio>
            <Radio :label="2">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('userInfo')">注册</Button>
          <Button @click="handleReset('userInfo')" style="margin-left: 8px">重置</Button>
          <Button @click="formCancelEvent" type="text" style="float: right">关闭</Button>
        </FormItem>
      </Form>
      <!--提交时加载动画-->
      <Spin size="large" fix v-if="loading"></Spin>
      </Modal>
    </div>
</template>
<script>
import {
  getClassSel,
  editUserInfo
} from '@/api/teacher.data'
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
      classes: [],
      userInfo: {
        loginName: '',
        loginPwd: '',
        userName: '',
        state: 0,
        userNo: '',
        userTel: '',
        userSex: 1,
        userType: 1,
        classID: null
      },
      registerRule: {
        classID: [
          { required: true, message: '班级不能为空', trigger: 'blur' }
        ],
        loginName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        loginPwd: [
          // { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted: function () {
    // this.getClassList()
  },
  methods: {
    getClassList () {
      getClassSel({}).then(res => {
        const body = res.data
        const data = body.Data
        if (body.Status === 2000) {
          if (data) {
            data.forEach(({ classID, className }) => this.classes.push({ value: classID, label: className }))
            this.userInfo.classID = this.classes[ 0 ]
          }
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
    },
    // 弹出层的事件
    formConfirmEvent () {
      this.$emit('formConfirmEvent')
    },
    formCancelEvent () {
      this.$emit('formCancelEvent')
      this.handleReset('userInfo')
    },
    watchEditableChange (e) {
      this.$emit('watchEditableChange', e)
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          editUserInfo(this.userInfo).then(res => {
            const body = res.data
            const data = body.Data
            if (body.Status === 2000) {
              this.editable = false
              this.$Message.success(data.Result)
            } else {
              this.$Message.error(data.ErrorDes)
            }
          })
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
