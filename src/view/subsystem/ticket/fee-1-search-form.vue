<template>
  <div>
    <Form ref="searchForm" :model="search" :rules="rules" :label-width="68" :show-message="false" class="qib-form">
      <Row>
        <Col span="24">
          <FormItem label="车/箱 号" prop="carTypeNum">
            <Input size="small" v-model="search.carTypeNum" placeholder="请输入车/箱号"></Input>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem label="到站" prop="astation">
            <Input size="small" v-model="search.astation" placeholder="请输入到站"></Input>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem label="开装日期" prop="loadTime">
            <DatePicker size="small" type="daterange" placeholder="请选择开装日期/结束日期" v-model="search.loadTime" @on-change="handleChangeDate"></DatePicker>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem label="托运人" prop="sname">
            <Input size="small" v-model="search.sname" placeholder="请输入"></Input>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem label="收货人" prop="aname">
            <Input size="small" v-model="search.aname" placeholder="请输入"></Input>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem label="货物名称" prop="gname">
            <Input size="small" v-model="search.gname" placeholder="请输入"></Input>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem label="品名代码">
            <Input size="small" disabled></Input>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem :label-width="8">
            <Button size="small" type="primary" :loading="loading" @click="toHandleSearch('searchForm')" style="margin-left: 8px">查询</Button>
            <Button size="small" type="primary" @click="handleSubmit('searchForm')" disabled style="margin-left: 8px">确定</Button>
            <Button size="small" type="primary" @click="handleCopy('searchForm')" disabled style="margin-left: 8px">粘贴</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <!--提交时加载动画-->
    <Spin size="large" fix v-if="loading"></Spin>

    <Table size="small" stripe :columns="columns" :data="list" highlight-row @on-current-change="getCurrentData"></Table>
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
        carTypeNum: '',
        receptType: '1',
        astation: '',
        loadTime: '',
        bgLoadTime: '',
        edLoadTime: '',
        sname: '',
        aname: '',
        gname: ''
      },
      rules: {
        /*
        carTypeNum: [
          { required: true, message: '车/箱号不能为空', trigger: 'blur' }
        ]
        */
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
    handleChangeDate (dr) {
      this.search.loadDate = dr
      this.search.bgLoadTime = dr[0]
      this.search.edLoadTime = dr[1]
    },
    getCurrentData (item) {
      console.log(item)
      if (item) {
        this.$emit('handleGetData', item)
      }
    }
  }
}
</script>
