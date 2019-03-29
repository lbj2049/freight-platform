<template>
  <div>
    <Form ref="search" :model="search" :rules="rules" :label-width="94" :show-message="false" class="qib-form">
      <Row>
        <Col span="4">
          <FormItem :label-width="0">
            <Select size="small" v-model="search.city" placeholder="Select your city">
              <Option value="beijing">发送</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="货运单" prop="mail">
            <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="发站">
            <Select size="small" v-model="search.city" placeholder="Select your city">
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="到站">
            <Select size="small" v-model="search.city" placeholder="Select your city">
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="到专用线" prop="mail">
            <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="制票日期" prop="date">
            <DatePicker size="small" type="date" placeholder="请选择制票日期" v-model="search.date"></DatePicker>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="msg" label="">
            <Radio v-model="search.msg">查询运单</Radio>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="发货人" prop="mail">
            <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="结束制票日期" prop="date">
            <DatePicker size="small" type="date" placeholder="请选择结束制票日期" v-model="search.date"></DatePicker>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="msg" label="">
            <Radio v-model="search.msg">查询货票</Radio>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <RadioGroup size="small" v-model="search.gender" >
            <Radio value="1" label="仅确认货票"></Radio>
            <Radio value="2" label="确认并核收杂费"></Radio>
          </RadioGroup>
        </Col>
        <Col span="6">
          <FormItem label="处理状态">
            <Select size="small" v-model="search.city" placeholder="Select your city">
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="运单状态">
            <Select size="small" v-model="search.city" placeholder="Select your city">
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
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
      search: {
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
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('handleSubmit', this.search)
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleSearch () {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('handleSearch', this.search)
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleCopy () {
      this.$emit('handleCopy')
    }
  }
}
</script>
