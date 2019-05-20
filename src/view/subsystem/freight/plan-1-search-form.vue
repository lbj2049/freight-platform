<template>
  <div>
    <Form ref="searchForm" :model="search" :rules="rules" :label-width="64" :show-message="false" class="qib-form">
      <Row>
        <Col span="12">
          <Row>
            <Col span="8">
              <FormItem prop="station" label="代理站">
                <Input size="small" v-model="search.station" placeholder="请输入代理站"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem prop="carType" label="车种">
                <Select size="small" v-model="search.carType" placeholder="请选择车种">
                  <Option v-for="item in carTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem prop="transNo" label="计划号">
                <Input size="small" v-model="search.transNo" placeholder="请输入计划号"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem :label-width="10">
                <RadioGroup size="small" disabled>
                  <Radio value="1" label="运单"></Radio>
                  <Radio value="2" label="国联"></Radio>
                  <Radio value="3" label="清单"></Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="到站" prop="astation">
                <Input size="small" v-model="search.astation" placeholder="请输入到站"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="装车日期" prop="loadDate">
                <DatePicker size="small" v-model="search.loadDate" type="date" placeholder="请选择装车日期" @on-change="handleChangeDate"></DatePicker>
              </FormItem>
            </Col>
          </Row>
        </Col>
        <Col span="6">
          <FormItem :label-width="20">
            <Button size="small" type="primary" :loading="loading" @click="handleSubmit('searchForm')" style="margin-left: 8px">查询</Button>
            <Button size="small" type="primary" @click="handlePlan('searchForm')" style="margin-left: 8px">执行计划</Button>
            <Button size="small" type="primary" @click="handleExport('searchForm')" style="margin-left: 8px">导出excel</Button>
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
      carTypes: [{ value: 1, label: '整车' }, { value: 2, label: '集装箱' }, { value: 3, label: '零担' }, { value: 4, label: '其他' }],
      search: {
        station: '', // 代报站，当前车站名称
        astation: '', // 到站
        transNo: '', // 计划号
        gname: '', // 品名
        carType: '', // 车种
        loadDate: '' // 装车日期
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
    },
    handleChangeDate (dr) {
      this.search.loadDate = dr
    }
  }
}
</script>
