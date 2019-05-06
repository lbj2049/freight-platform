<template>
  <div>
    <Form ref="searchForm" :model="demand" :rules="rules" :show-message="false" class="qib-form" inline>
      <FormItem label="日期" prop="loadDate" :label-width="40">
        <DatePicker size="small" type="daterange" placeholder="请选择日期" v-model="demand.loadDate" @on-change="handleChangeDate"></DatePicker>
      </FormItem>
      <FormItem label="运单" prop="waybillNo" :label-width="40">
        <Input size="small" v-model="demand.waybillNo" placeholder="请输入运单"></Input>
      </FormItem>
      <FormItem prop="states" :label-width="10">
        <RadioGroup size="small" v-model="demand.states">
          <Radio v-for="item in states" :label="item.value">{{item.label}}</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem :label-width="0">
        <Checkbox disabled>重点货物类型</Checkbox>
      </FormItem>
      <FormItem :label-width="0">
        <Select disabled>
          <Option value="">全部</Option>
          <Option value="1">超重</Option>
          <Option value="1">超限</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button size="small" type="primary" :loading="loading" @click="handleSubmit('searchForm')" style="margin-left: 8px">查询
        </Button>
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
      states: [{ value: '3', label: '待受理' }, { value: '4', label: '已通过受理' }, { value: '3,4', label: '全部' }],
      demand: {
        loadDate: '',
        loadDate_bg: '',
        loadDate_ed: '',
        waybillNo: '',
        states: '3,4'
      },
      rules: {},
      defaultInfo: {

      }
    }
  },
  created () {
    // 保留初始值
    this.defaultInfo = { ...this.demand }
  },
  methods: {
    // 搜索
    toHandleSearch () {
      this.handleSubmit('searchForm')
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('handleFormSubmit', this.demand)
        }
      })
    },
    handleReset (name) {
      this.demand = { ...this.defaultInfo }
      this.$refs[name].resetFields()
    },
    handleAuth () {
      this.$emit('handleFormAuth')
    },
    handleChangeDate (dr) {
      this.demand.loadDate_bg = dr[0]
      this.demand.loadDate_ed = dr[1]
    }
  }
}
</script>
