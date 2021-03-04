<template>
  <div>
      <Form ref="demand" :model="demand" :rules="rules" :label-width="88" :show-message="false" class="qib-form">

          <Row>
            <Col span="8">
              <FormItem label="预定号" prop="reservaNo">
                <Input size="small" v-model="demand.reservaNo" placeholder="请输入预定号"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="到站" prop="aStation">
                <Input size="small" v-model="demand.aStation" placeholder="请输入到站"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="提箱日期" prop="caseDate">
                <DatePicker size="small" v-model="demand.caseDate" type="date" placeholder="请选择提箱日期"></DatePicker>
              </FormItem>
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
        reservaNo: '',
        aStation: '',
        caseDate: null,
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
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
