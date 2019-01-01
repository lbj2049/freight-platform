<template>
  <div>
      <Form ref="demand" :model="demand" :rules="rules" :label-width="88" :show-message="false" class="qib-form">

          <Row>
            <Col span="8">
              <FormItem label="装车日期" prop="mail">
                <DatePicker size="small" type="date" placeholder="请选择装车日期" v-model="demand.date"></DatePicker>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="订单号" prop="mail">
                <Input size="small" v-model="demand.name" placeholder="请输入订单号"></Input>
              </FormItem>
            </Col>
            <Col span="8">
            </Col>
          </Row>

        <Divider />
        <FormItem>
          <Button type="primary" :loading="loading" @click="handleSubmit('demand')" style="margin-left: 8px">查询</Button>
          <Button @click="handleReset('demand')" style="margin-left: 8px">清空</Button>
        </FormItem>
      </Form>
      <!--提交时加载动画-->
      <Spin size="large" fix v-if="loading"></Spin>
  </div>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      demand: {
        name: '',
        mail: '',
        city: '',
        gender: '',
        interest: [],
        msg: 1,
        date: '',
        time: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('handleFormSubmit', this.demand)
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
