<template>
  <div>
    <Row>
      <Col span="12">
        <Form ref="searchForm" :model="search" :rules="rules" :label-width="94" :show-message="false" class="qib-form">
          <Row>
            <Col span="4">
              <FormItem :label-width="0">
                <Select size="small" value="1" disabled>
                  <Option value="1">发送</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="运单号" prop="waybillNo">
                <Input size="small" v-model="search.waybillNo"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="发站" prop="station">
                <Input size="small" v-model="search.station"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="到站" prop="astation">
                <Input size="small" v-model="search.astation"></Input>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <FormItem label="到专用线">
                <Input size="small" disabled></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="制票日期" prop="bgLoadTime">
                <DatePicker size="small" v-model="search.bgLoadTime" @on-change="handleChangeDate1"></DatePicker>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="">
                <Radio disabled>查询运单</Radio>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <FormItem label="发货人" prop="sname">
                <Input size="small" v-model="search.sname"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="结束制票日期" prop="edLoadTime">
                <DatePicker size="small" type="date" v-model="search.edLoadTime" @on-change="handleChangeDate2"></DatePicker>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="">
                <Radio disabled>查询货票</Radio>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <FormItem label="收货人" prop="aname">
                <Input size="small" v-model="search.aname"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="票符票号">
                <Input size="small" disabled></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="">
                <Button size="small" type="primary" :loading="loading" @click="toHandleSearch('searchForm')" style="margin-left: 8px">查询</Button>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <RadioGroup size="small" disabled >
                <Radio value="1" label="仅确认货票"></Radio>
                <Radio value="2" label="确认并核收杂费"></Radio>
              </RadioGroup>
            </Col>
            <Col span="6">
              <FormItem label="处理状态">
                <Select size="small" value="1" disabled>
                  <Option value="1">全部</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="运单状态">
                <Select size="small" value="1" disabled>
                  <Option value="1">全部</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Col>
      <Col span="11" offset="1">
        <Table size="small" stripe :columns="columns" :data="list" highlight-row @on-current-change="getCurrentData"></Table>
      </Col>
    </Row>
    <!--提交时加载动画-->
    <Spin size="large" fix v-if="loading"></Spin>
  </div>
</template>
<script>
import {
  getList
} from '@/api/ticket.data'
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
        waybillNo: '',
        carTypeNum: '',
        receptType: '2',
        station: '',
        astation: '',
        loadTime: '',
        bgLoadTime: '',
        edLoadTime: '',
        sname: '',
        aname: '',
        gname: ''
      },
      rules: {
      },
      list: [],
      columns: [
        { key: 'needNo', title: '需求单号', width: 120, fixed: 'left' },
        { key: 'waybillNo', title: '运单号', width: 120 },
        { key: 'carTypeNum', title: '车/箱号', width: 120 },
        { key: 'station', title: '发站', width: 120 },
        { key: 'astation', title: '到站', width: 120 },
        { key: 'sname', title: '托运人名称', width: 120 },
        { key: 'saddr', title: '托运人地址', width: 120 },
        { key: 'sagent', title: '托运经办人', width: 120 },
        { key: 'stel', title: '托运经办人电话', width: 120 },
        { key: 'aname', title: '收货人名称', width: 120 },
        { key: 'aaddr', title: '收货人地址', width: 120 },
        { key: 'aagent', title: '收货经办人', width: 120 },
        { key: 'atel', title: '经办人电话', width: 120 },
        { key: 'carVersionCard', title: '车种车号', width: 120 },
        { key: 'warehouse', title: '货区', width: 120 },
        { key: 'door', title: '货位名称', width: 80 },
        { key: 'parWeight', title: '标重', width: 60 }
      ]
    }
  },
  computed: {
    getUserId () {
      return this.$store.state.user.userId
    },
    getCompyId () {
      return this.$store.state.user.compyId
    }
  },
  mounted: function () {
    this.toHandleSearch('searchForm')
  },
  methods: {
    // 搜索
    toHandleSearch (name) {
      this.doHandleSearch(name)
    },
    doHandleSearch (name) {
      this.$emit('handleGetData', {})
      this.$refs[name].validate((valid) => {
        if (valid) {
          const UUID = this.getUserId
          const compyID = this.getCompyId
          let params = { UUID, compyID, ...this.search }
          getList(params).then(res => {
            const body = res.data
            const data = body.Data
            if (body.Status === 2000) {
              this.list = data || []
            } else {
              this.$Message.error(data.ErrorDes)
            }
          })
        }
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('handleSubmit', this.search)
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleSearch () {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('handleSearch', this.search)
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleCopy () {
      this.$emit('handleCopy')
    },
    handleChangeDate1 (dr) {
      this.search.bgLoadTime = dr
    },
    handleChangeDate2 (dr) {
      this.search.edLoadTime = dr
    },
    getCurrentData (item) {
      // console.log(item)
      if (item) {
        this.$emit('handleGetData', item)
      }
    }
  }
}
</script>
