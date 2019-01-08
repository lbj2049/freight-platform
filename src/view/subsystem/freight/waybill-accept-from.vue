<template>
  <div>
      <Form ref="demand" :model="demand" :rules="rules" :show-message="false" class="qib-form" inline>
              <FormItem label="日期" prop="mail" label-width="40">
                <DatePicker size="small" type="daterange" placeholder="请选择日期" v-model="demand.date"></DatePicker>
              </FormItem>
              <FormItem label="运单" prop="city" label-width="40">
                <Input size="small" v-model="demand.mail" placeholder="请输入运单"></Input>
              </FormItem>
              <FormItem prop="interest" label-width="10">
                <RadioGroup size="small" v-model="demand.interest" >
                  <Radio label="未审核"></Radio>
                  <Radio label="已审核"></Radio>
                  <Radio label="全部"></Radio>
                </RadioGroup>
              </FormItem>
              <FormItem prop="msg" label-width="0">
                <Checkbox v-model="demand.msg">重点货物类型</Checkbox>
              </FormItem>
              <FormItem prop="mail" label-width="0">
                <Select size="small" v-model="demand.city" placeholder="Select your option">
                  <Option value="">全部</Option>
                  <Option value="1">超重</Option>
                  <Option value="1">超限</Option>
                </Select>
              </FormItem>
              <FormItem>
                <Button size="small" type="primary" :loading="loading" @click="handleSubmit('demand')" style="margin-left: 8px">查询</Button>
                <Button size="small" type="warning" @click="handleAuth()" style="margin-left: 8px">审核</Button>
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
    handleAuth () {
      this.$emit('handleFormAuth')
    }
  }
}
</script>
