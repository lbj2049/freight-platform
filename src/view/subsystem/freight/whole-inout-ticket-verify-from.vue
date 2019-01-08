<template>
  <div>
      <Form ref="ticket" :model="ticket" :rules="rules" :show-message="false" class="qib-form">
          <FormItem prop="mail" label="股道" label-width="40">
            <Select size="small" v-model="ticket.city" placeholder="Select your option">
              <Option value="">全部</Option>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
            </Select>
          </FormItem>
          <FormItem label-width="10">
            <Button size="small" type="primary" :loading="loading" @click="handleSubmit('ticket')" style="margin-left: 8px">查询</Button>
            <Button size="small" @click="handleAuth()" style="margin-left: 8px">票据验证</Button>
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
      ticket: {
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
          this.$emit('handleFormSubmit', this.ticket)
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleTicketVerify () {
      this.$emit('handleTicketVerify')
    }
  }
}
</script>
