<template>
  <div>
    <Form ref="searchForm" :model="demand" :rules="rules" :label-width="88" :show-message="false" class="qib-form">

      <Row>
        <Col span="6">
          <FormItem label="装车日期" prop="loadDate">
            <DatePicker size="small" v-model="demand.loadDate" type="date" placeholder="请选择装车日期" @on-change="handleChangeDate"></DatePicker>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="订单受理号" prop="acceptNo">
            <Input size="small" v-model="demand.acceptNo" placeholder="请输入订单受理号"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="货运名称" prop="gname">
            <Input size="small" v-model="demand.gname" placeholder="请输入货运名称"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="状态" prop="states">

            <CheckboxGroup v-model="demand.state" @on-change="handleChangeState">
              <Checkbox v-for="item in states" :label="item.value" :key="item.value">{{ item.label }}</Checkbox>
            </CheckboxGroup>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="发站" prop="station">
            <Input size="small" v-model="demand.station" placeholder="请输入发站"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="到站" prop="astation">
            <Input size="small" v-model="demand.astation" placeholder="请输入到站"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="车种" prop="carType">
            <Select size="small" v-model="demand.carType" placeholder="请选择车种">
              <Option v-for="item in carTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Divider />
      <FormItem>
        <Button size="small" type="primary" :loading="loading" @click="handleSubmit('searchForm')" style="margin-left: 8px">查询</Button>
        <Button size="small" @click="handleReset('searchForm')" style="margin-left: 8px">清空</Button>
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
      states: [{ value: 3, label: '待受理' }, { value: 4, label: '已通过受理' }],
      admitCarStates: [{ value: 0, label: '未匹配' }, { value: 1, label: '已匹配' }],
      carTypes: [{ value: 1, label: '整车' }, { value: 2, label: '集装箱' }, { value: 3, label: '零担' }, { value: 4, label: '其他' }],
      demand: {
        reservaNo: '',
        needNo: '',
        acceptNo: '',
        ctime: '',
        loadDate: '',
        station: '',
        astation: '',
        sname: '',
        aname: '',
        gname: '',
        state: [],
        states: '',
        admitCarState: '',
        carDownAddr: '',
        carType: ''
      },
      rules: {
      },
      defaultInfo: {

      }
    }
  },
  created () {
    // 保留初始值
    this.defaultInfo = { ...this.demand }
  },
  mounted: function () {
    this.toHandleSearch()
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
    handleChangeDate (dr) {
      this.demand.loadDate = dr
    },
    handleChangeState () {
      if (this.demand.state) {
        this.demand.states = this.demand.state.join(',')
      }
    }
  }
}
</script>
