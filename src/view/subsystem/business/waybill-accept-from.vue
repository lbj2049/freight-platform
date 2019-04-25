<template>
  <div>
      <Form ref="searchForm" :model="demand" :rules="rules" :label-width="88" :show-message="false" class="qib-form">

          <Row>
            <Col span="8">
              <FormItem label="预约号" prop="reservaNo">
                <Input size="small" v-model="demand.reservaNo" placeholder="请输入预约号"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="需求号" prop="needNo">
                <Input size="small" v-model="demand.needNo" placeholder="请输入需求号"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="装车日期" prop="loadDate">
                <DatePicker size="small" v-model="demand.loadDate" type="date" placeholder="请选择装车日期" @on-change="handleChangeDate"></DatePicker>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="发站" prop="station">
                <Input size="small" v-model="demand.station" placeholder="请输入发站"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="托运人" prop="sname">
                <Input size="small" v-model="demand.sname" placeholder="请输入托运人"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="货运名称" prop="gname">
                <Input size="small" v-model="demand.gname" placeholder="请输入货运名称"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="到站" prop="astation">
                <Input size="small" v-model="demand.astation" placeholder="请输入到站"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="收货人" prop="aname">
                <Input size="small" v-model="demand.aname" placeholder="请输入收货人"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="运单状态" prop="state">
                <Select size="small" v-model="demand.state" placeholder="请选择运单状态">
                  <Option v-for="item in states" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="承认车标识" prop="admitCarState">
                <Select size="small" v-model="demand.admitCarState" placeholder="请选择承认车标识">
                  <Option v-for="item in admitCarStates" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
            </Col>
            <Col span="8">
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
      states: [{ value: 2, label: '待受理' }, { value: 4, label: '已通过受理' }, { value: 41, label: '未通过受理' }],
      admitCarStates: [{ value: 0, label: '未匹配' }, { value: 1, label: '已匹配' }],
      demand: {
        reservaNo: '',
        needNo: '',
        loadDate: '',
        station: '',
        astation: '',
        sname: '',
        aname: '',
        gname: '',
        state: '',
        admitCarState: ''
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
    }
  }
}
</script>
