<template>
  <div>
    <Form ref="demand" :model="demand" :rules="rules" :label-width="88" :show-message="false" class="qib-form">
      <Row>
        <Col span="18">
          <Row>
            <Col span="6">
              <FormItem label="装车日期" prop="mail">
                <DatePicker size="small" type="daterange" placeholder="请选择装车日期" v-model="demand.date"></DatePicker>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="到站" prop="city">
                <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="运单状态" prop="mail">
                <Select size="small" v-model="demand.city" placeholder="Select your city">
                  <Option value="beijing">New York</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="运输方式" prop="mail">
                <Select size="small" v-model="demand.city" placeholder="Select your city">
                  <Option value="">全部</Option>
                  <Option value="1">整车</Option>
                  <Option value="2">零担</Option>
                  <Option value="3">集装箱</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="6">
              <FormItem label="提报日期" prop="mail">
                <DatePicker size="small" type="daterange" placeholder="请选择提报日期" v-model="demand.date"></DatePicker>
              </FormItem>
            </Col>
            <Col span="6">

              <FormItem prop="msg">
                <Checkbox v-model="demand.msg">整车/成组</Checkbox>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="需求号" prop="mail">
                <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
            <Col span="6">
            </Col>
          </Row>
        </Col>
        <Col span="6">
          <FormItem label-width="10">
            <Button size="small" type="primary" :loading="loading" @click="handleSubmit('demand')" style="margin-left: 8px">查询</Button>
            <Button size="small" @click="handlePrint()" style="margin-left: 8px">运单打印</Button>
            <Button size="small" @click="handleOut()" style="margin-left: 8px">退出</Button>
          </FormItem>
        </Col>
      </Row>
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
        ],
        mail: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' }
        ],
        city: [
          { required: true, message: 'Please select the city', trigger: 'change' }
        ],
        gender: [
          { required: true, message: 'Please select gender', trigger: 'change' }
        ],
        interest: [
          { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
          { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
        ],
        date: [
          { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
        ],
        time: [
          { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
        ],
        desc: [
          { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
          { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
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
    handlePrint () {
      this.$emit('handleFormPrint')
    },
    handleOut (name) {
      this.$emit('handleFormOut')
    }
  }
}
</script>
