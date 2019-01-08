<template>
  <div>
    <Form ref="search" :model="search" :rules="rules" :label-width="64" :show-message="false" class="qib-form">
      <Row>
        <Col span="18">
          <Row>
            <Col span="12">
              <FormItem label="开始日期" prop="mail">
                <DatePicker size="small" type="date" placeholder="请选择开始日期" v-model="search.date"></DatePicker>
              </FormItem>
            </Col>
            <Col span="12">
              <Row>
                <Col span="12">
                  <FormItem prop="msg" label-width="15">
                    <Radio v-model="search.msg">需求联</Radio>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem prop="msg" label-width="0">
                    <Radio v-model="search.msg">到达运单</Radio>
                  </FormItem>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="截止日期" prop="mail">
                <DatePicker size="small" type="date" placeholder="请选择截止日期" v-model="search.date"></DatePicker>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="需求号" prop="mail">
                <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
          </Row>
        </Col>
        <Col span="6">
          <FormItem label-width="10">
            <Button size="small" type="primary" :loading="loading" @click="handleSubmit('search')" style="margin-left: 8px">查询</Button>
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
    handleAuth () {
      this.$emit('handleFormAuth')
    }
  }
}
</script>
