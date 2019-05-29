<template>
  <div>
    <Form ref="searchForm" :model="search" :rules="rules" :label-width="64" :show-message="false" class="qib-form">
      <Row>
        <Col span="4">
          <FormItem prop="station" label="代理站">
            <Input size="small" v-model="search.station" placeholder="请输入代理站"></Input>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem prop="yardType" :label-width="15">
            <RadioGroup size="small" v-model="search.yardType" >
              <Radio value="1" label="到达股道"></Radio>
              <Radio value="2" label="现车股道"></Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem prop="trainNum" label="车次">
            <Input size="small" v-model="search.trainNum" placeholder="请输入车次"></Input>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem prop="astation" label="到站">
            <Input size="small" v-model="search.astation" placeholder="请输入到站"></Input>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem prop="carTypeNum" label="车号">
            <Input size="small" v-model="search.carTypeNum" placeholder="请输入车号"></Input>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem :label-width="0">
            <Button size="small" type="primary" :loading="loading" @click="handleSubmit('searchForm')" style="margin-left: 4px">查询</Button>
            <Button size="small" type="primary" @click="handlePlan('searchForm')" style="margin-left: 4px">执行计划</Button>
            <Button size="small" type="primary" @click="handleExport('searchForm')" style="margin-left: 4px">导出excel</Button>
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
        wbID: '',
        station: '',
        trainNum: '',
        astation: '',
        carTypeNum: '',
        yardType: 1,
        cgyID: ''
      },
      rules: {
      }
    }
  },
  created () {
    // 保留初始值
    this.defaultInfo = { ...this.search }
  },
  mounted: function () {
    // this.toHandleSearch()
  },
  methods: {
    // 搜索
    toHandleSearch () {
      this.handleSubmit('searchForm')
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('handleFormSubmit', this.search)
        }
      })
    },
    handleReset (name) {
      this.search = { ...this.defaultInfo }
      this.$refs[name].resetFields()
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
