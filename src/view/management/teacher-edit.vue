<template>
  <div>
    <Modal :value="editable" :mask-closable="false" :footer-hide="true" title="添加老师" @on-visible-change="watchEditableChange" :styles="{top: '16%'}" width="880">
      <Form ref="addTeacher" :model="teacherData" :rules="rules" :label-width="120">

        <Row>
          <Col span="24">
            <FormItem label="用户名" prop="userName">
              <Input v-model="teacherData.userName" placeholder="请输入教师用户名"></Input>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="24">
          <FormItem label="老师姓名" prop="teacherName">
            <Input v-model="teacherData.teacherName" placeholder="请输入教师姓名"></Input>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="24">
          <FormItem label="手机号" prop="phoneNum">
            <Input v-model="teacherData.phoneNum"  placeholder="请输入手机号"  number></Input>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <FormItem label="性别" prop="sex">
              <RadioGroup v-model="teacherData.sex">
                <Radio label="男"></Radio>
                <Radio label="女"></Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="24">
          <FormItem label="状态" prop="status">
            <RadioGroup v-model="teacherData.status">
              <Radio label="开通"></Radio>
              <Radio label="禁用"></Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>

        <FormItem>
          <Button type="primary" :loading="loading" @click="handleSubmit('addTeacher')">提交</Button>
          <Button @click="handleReset('addTeacher')" style="margin-left: 8px">清空</Button>
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
      teacherData: {
        userName: '',
        teacherName: '',
        phoneNum: '',
        sex: '男',
        status: '开通'
      },
      rules: {
        userName: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        teacherName: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        phoneNum: [
          { required: true, message: 'Please select the city', trigger: 'change' }
        ],
        sex: [
          { required: true, message: 'Please select gender', trigger: 'change' }
        ],
        status: [
          { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
          { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
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
