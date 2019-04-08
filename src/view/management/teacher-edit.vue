<template>
  <div>
    <Modal :value="editable" :mask-closable="false" :footer-hide="true" :title="getTitle()" @on-visible-change="watchEditableChange" :styles="{top: '16%'}" width="880">
      <Form ref="editUserForm" :model="userInfo" :rules="rules" :label-width="120">

        <Row>
          <Col span="24">
            <FormItem label="用户名" prop="loginName">
              <Input v-model="userInfo.loginName" placeholder="请输入用户名"></Input>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="24">
          <FormItem label="姓名" prop="userName">
            <Input v-model="userInfo.userName" placeholder="请输入姓名"></Input>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="24">
          <FormItem label="电话" prop="userTel">
            <Input v-model="userInfo.userTel"  placeholder="请输入电话" ></Input>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <FormItem label="性别" prop="userSex">
              <RadioGroup v-model="userInfo.userSex">
                <Radio :label="1" >男</Radio>
                <Radio :label="2" >女</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="24">
          <FormItem label="状态" prop="state">
            <RadioGroup v-model="userInfo.state">
              <Radio :label="0">未审核</Radio>
              <Radio :label="1">正常</Radio>
              <Radio :label="2">禁用</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>

        <FormItem>
          <Button type="primary" :loading="loading" @click="handleSubmit('editUserForm')">提交</Button>
          <Button @click="handleReset('editUserForm')" style="margin-left: 8px">清空</Button>
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
      isAdd: true,
      userInfo: {
        UUID: '',
        loginName: '',
        userName: '',
        state: 1,
        userNo: '',
        userTel: 1,
        userSex: '1',
        userType: 2
      },
      rules: {
        loginName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getTitle () {
      return (this.isAdd ? '添加' : '修改') + '班级'
    },
    // 弹出层的事件
    formConfirmEvent () {
      this.$emit('formConfirmEvent')
    },
    formCancelEvent () {
      this.$emit('formCancelEvent')
    },
    watchEditableChange (e) {
      this.$emit('watchEditableChange', e)
    },
    editFormData (userInfo) {
      this.userInfo = { ...userInfo }
      this.isAdd = true
      if (this.userInfo.UUID) {
        this.isAdd = false
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('onSuccessValid', this.userInfo)
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
