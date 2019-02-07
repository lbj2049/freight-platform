<template>
  <div>
    <Form ref="search" :model="search" :rules="rules" :label-width="64" :show-message="false" class="qib-form">
      <Row>
        <Col span="12">
          <Row>
            <Col span="8">
              <FormItem label="代报站">
                <Select size="small" v-model="search.city" placeholder="Select your city">
                  <Option value="beijing">New York</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <Row>
                <Col span="12">
                  <FormItem prop="gender" :label-width="15">
                    <RadioGroup size="small" v-model="search.gender" >
                      <Radio value="1" label="到达股道"></Radio>
                      <Radio value="2" label="现车股道"></Radio>
                    </RadioGroup>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem prop="city" :label-width="0">
                    <Select size="small" v-model="search.city" placeholder="Select your city">
                      <Option value="beijing">New York</Option>
                      <Option value="shanghai">London</Option>
                      <Option value="shenzhen">Sydney</Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col span="8">
              <Row>
                <Col span="24">
                  <FormItem label="车次">
                    <Select size="small" v-model="search.city" placeholder="Select your city">
                      <Option value="beijing">New York</Option>
                      <Option value="shanghai">London</Option>
                      <Option value="shenzhen">Sydney</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="24">
                  <FormItem label="到站">
                    <Select size="small" v-model="search.city" placeholder="Select your city">
                      <Option value="beijing">New York</Option>
                      <Option value="shanghai">London</Option>
                      <Option value="shenzhen">Sydney</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="24">
                  <FormItem label="车号">
                    <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
                  </FormItem>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span="6">
          <FormItem :label-width="20">
            <Button size="small" type="primary" :loading="loading" @click="handleSubmit('search')" style="margin-left: 8px">查询</Button>
            <Button size="small" type="primary" @click="handlePlan('search')" style="margin-left: 8px">执行计划</Button>
            <Button size="small" type="primary" @click="handleExport('search')" style="margin-left: 8px">导出excel</Button>
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
          this.$emit('handleFormSubmit', this.search)
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handlePlan () {
      this.$emit('handlePlan')
    },
    handleExport () {
      this.$emit('handleExport')
    }
  }
}
</script>
