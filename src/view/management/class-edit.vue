<template>
  <div>
    <Modal :value="editable" :mask-closable="false" :footer-hide="true" :title="getTitle()" @on-visible-change="watchEditableChange" :styles="{top: '16%'}" width="880">
      <Form ref="editClassForm" :model="classInfo" :rules="rules" :label-width="120">
        <input v-model="classInfo.UUID" type="hidden"/>
        <input v-model="classInfo.classID" type="hidden"/>
        <Row>
          <Col span="24">
            <FormItem label="班级名称" prop="className">
              <Input v-model="classInfo.className" placeholder="请输入班级名称"></Input>
            </FormItem>
          </Col>
        </Row>

        <FormItem>
          <Button type="primary" :loading="loading" @click="handleSubmit('editClassForm')">提交</Button>
          <Button @click="handleReset('editClassForm')" style="margin-left: 8px">清空</Button>
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
      classInfo: {
        UUID: null,
        classID: null,
        className: null
      },
      rules: {
        className: [
          { required: true, message: '班级名称不能为空', trigger: 'blur' }
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
    editFormData (classInfo) {
      this.classInfo = { ...classInfo }
      this.isAdd = true
      if (this.classInfo.classID) {
        this.isAdd = false
      }
    },
    handleSubmit (name) {
      if (!this.classID) {
        this.classInfo.UUID = this.$store.state.user.userId
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('onSuccessValid', this.classInfo)
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
