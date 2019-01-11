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
            <Input v-model="teacherData.phoneNum"  placeholder="请输入手机号" ></Input>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <FormItem label="性别" prop="sex">
              <RadioGroup v-model="teacherData.sex">
                <Radio label="男" ></Radio>
                <Radio label="女" ></Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="24">
          <FormItem label="状态" prop="status">
            <RadioGroup v-model="teacherData.status">
              <Radio label="已审核"></Radio>
              <Radio label="未审核"></Radio>
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
        status: '已审核'
      },
      rules: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        teacherName: [
          { required: true, message: '老师姓名不能为空', trigger: 'blur' }
        ],
        phoneNum: [
          { required: true, message: '请输入手机号', trigger: 'blur' }, { pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '请输入正确的电话', rigger: 'blur' }
        ],
        sex: [
          { required: true, message: '', trigger: 'change' }
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
      alert(Object.values(this.teacherData))
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
