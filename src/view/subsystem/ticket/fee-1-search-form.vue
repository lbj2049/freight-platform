<template>
  <div>
    <Form ref="search" :model="search" :rules="rules" :label-width="64" :show-message="false" class="qib-form">
      <Row>
        <Col span="24">
          <FormItem label="车/箱 号" prop="mail">
            <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
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
          <FormItem label="开装日期" prop="mail">
            <DatePicker size="small" type="date" placeholder="请选择开装日期" v-model="search.date"></DatePicker>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem label="结束日期" prop="mail">
            <DatePicker size="small" type="date" placeholder="请选择结束日期" v-model="search.date"></DatePicker>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem label="托运人" prop="mail">
            <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem label="收货人" prop="mail">
            <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem label="货物名称">
            <Select size="small" v-model="search.city" placeholder="Select your city">
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem label="品名代码" prop="mail">
            <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem :label-width="8">
            <Button size="small" type="primary" :loading="loading" @click="handleSearch('search')" style="margin-left: 8px">查询</Button>
            <Button size="small" type="primary" @click="handleSubmit('search')" style="margin-left: 8px">确定</Button>
            <Button size="small" type="primary" @click="handleCopy('search')" style="margin-left: 8px">粘贴</Button>
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
