<template>
  <div>
      <Form ref="demand" :model="demand" :rules="rules" :label-width="88" :show-message="false" class="qib-form">

          <Row>
            <Col span="8">
              <FormItem label="需求类型" prop="mail">
                <Select size="small" v-model="demand.city" placeholder="Select your city">
                  <Option value="beijing">New York</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="装车日期" prop="mail">
                <DatePicker size="small" type="daterange" placeholder="请选择装车日期" v-model="demand.date"></DatePicker>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="状态" prop="msg">
                <CheckboxGroup v-model="demand.interest">
                  <Checkbox label="待受理"></Checkbox>
                  <Checkbox label="受理通过"></Checkbox>
                </CheckboxGroup>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="发站" prop="mail">
                <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="托运人" prop="mail">
                <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="预约号" prop="mail">
                <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="到站" prop="city">
                <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="收货人" prop="mail">
                <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="预约号" prop="mail">
                <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="8">
              <FormItem label="批量零数" prop="mail">
                <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="快运标志" prop="city">
                <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
            <Col span="8">

              <Row>
                <Col span="12">
                  <FormItem label="需求类型" prop="mail">
                    <Select size="small" v-model="demand.city" placeholder="Select your city">
                      <Option value="beijing">New York</Option>
                      <Option value="shanghai">London</Option>
                      <Option value="shenzhen">Sydney</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem prop="mail" :label-width="45">
                    <Checkbox v-model="demand.msg">大宗交易需求</Checkbox>
                  </FormItem>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col span="8">
              <FormItem label="需求来源" prop="mail">
                <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="提报时间" prop="mail">
                <DatePicker size="small" type="daterange" placeholder="请选择提报时间" v-model="demand.date"></DatePicker>
              </FormItem>
            </Col>
            <Col span="8">

              <Row>
                <Col span="12">
                  <FormItem label="品类" prop="mail">
                    <Select size="small" v-model="demand.city" placeholder="Select your city">
                      <Option value="beijing">New York</Option>
                      <Option value="shanghai">London</Option>
                      <Option value="shenzhen">Sydney</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="到局" prop="mail">
                    <Select size="small" v-model="demand.city" placeholder="Select your city">
                      <Option value="beijing">New York</Option>
                      <Option value="shanghai">London</Option>
                      <Option value="shenzhen">Sydney</Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
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
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
