<template>
  <div>

    <form-create ref="fc" v-model="searchApi" :rule="searchRule" :option="searchOption" class="qib-form"></form-create>
    <!--
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
      <Spin size="large" fix v-if="loading"></Spin>
    -->
  </div>
</template>
<script>
import { maker } from 'form-create'
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchApi: {},
      searchModel: {},
      // 表单生成规则
      searchRule: [
        maker.input('装车日期', 'keyword').col({ span: 6, labelWidth: 64 }),
        maker.input('订单号', 'roderNo').col({ span: 6, labelWidth: 64 }),
        maker.create('i-button')
          .props({ type: 'primary', size: 'default', shape: undefined, long: false, htmlType: 'button', disabled: false, icon: 'ios-upload', loading: false, show: true })
          .col({ span: 2 })
          .on({
            'click': () => {
              this.toHandleSearch()
            }
          })
          .children([ '查询' ])
      ],
      // 组件参数配置
      searchOption: {
        // submitBtn: { innerText: '查询', size: 'small', col: { span: 2 } }
        submitBtn: false

      },
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
  mounted: function () {
    this.toHandleSearch()
    this.searchModel = this.searchApi.model()
  },
  methods: {
    toHandleSearch () {
      this.doHandleSearch(this.searchApi.formData())
    },
    // 搜索
    doHandleSearch (search) {
      this.$emit('handleToHandleSearch', search)
    },
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
