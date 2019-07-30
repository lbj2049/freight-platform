<!-- 运单受理 -->

<template>
  <div slot="content">
    <Card :dis-hover="true">
      <p slot="title">查询</p>
      <waybill-accept-form ref="searchForm" @handleFormSubmit="doHandleSearch"/>
    </Card>
    <table-paging :columns="columns" :data="list" @selectChange="selectChange" @changePageNum="changePageNum" @changePageSize="changePageSize" :pagination="pagination">
      <div slot="bottomTools">
        <!--<Button type="error" @click="doBatchDelete">批量删除</Button>-->
        <!--
        <Poptip :transfer="true" confirm title="确定通过?" @on-ok="doBatchPass" style="text-align: left">
          <Button type="primary">通过</Button>
        </Poptip>
        -->
        <Button type="primary" @click="doBatchPass">通过</Button>
        <Poptip :transfer="true" confirm title="不通过?" @on-ok="doBatchUnPass" style="text-align: left">
          <Button type="warning">不通过</Button>
        </Poptip>
        <Button disabled>整列成组</Button>
      </div>
    </table-paging>

    <Modal v-model="acceptModel" title="运单受理" @on-ok="acceptModel = false" width="780" :transfer="true">

      <Row>
        <Col offset="6">
          <Steps :current="acceptStepCurrent" style="margin-bottom: 15px">
            <Step title="记录事项"></Step>
            <Step title="随附文件"></Step>
          </Steps>
        </Col>
      </Row>

      <Card :dis-hover="true">
        <div v-show="acceptStepCurrent === 0">

          <Row>
            <Col span="4">
              <Tag color="blue">记载事项</Tag>
            </Col>
            <Col span="20">
              <Form ref="acceptForm" :model="acceptFormItem" :label-width="120" class="qib-form">
                <FormItem label="筛选" prop="bsptID">
                  <Select v-model="acceptFormItem.bsptID" @on-change="handleChangeBs">
                    <Option v-for="(bspt) in bspts" :key="bspt.bsptID" :value="bspt.bsptID">{{bspt.typeName}}</Option>
                  </Select>
                </FormItem>
                <FormItem label="">
                  <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                    <Checkbox
                      :indeterminate="indeterminate"
                      :value="checkAll"
                      @click.prevent.native="handleCheckAll">全选</Checkbox>
                  </div>
                </FormItem>
                <FormItem label="" prop="bsIds">
                  <CheckboxGroup v-model="acceptFormItem.bsIds" @on-change="checkAllGroupChange">
                    <Checkbox v-for="(item) in bsTypes" :label="item.value" :key="item.value" :true-value="item.checked">{{item.label}}</Checkbox>
                  </CheckboxGroup>
                </FormItem>
                <FormItem label="承运人记载事项" prop="carrierNote">
                  <Input v-model="acceptFormItem.carrierNote" type="textarea"></Input>
                </FormItem>
                <FormItem label="承运人装车/施封" prop="opslt">
                  <Select v-model="acceptFormItem.opslt">
                    <Option value="1">承运人装车/施封</Option>
                  </Select>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </div>
        <div v-show="acceptStepCurrent === 1">
          <img src="../../../assets/images/img_scanner.png" style="width: 100%; height: 100%;"/>
        </div>
      </Card>
      <div slot="footer">
        <Button type="primary" v-if="acceptStepCurrent === 0" @click="doPassStep0">下一步</Button>
        <Button type="primary" v-if="acceptStepCurrent === 1" disabled>拍照</Button>
        <Button type="primary" v-if="acceptStepCurrent === 1" @click="doPassStep1">上传</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import {
  getWayBillList,
  setPass,
  getStampLinkageList,
  updStamp
} from '@/api/business.data'
import TablePaging from '@/components/table-paging/table-paging'
import WaybillAcceptForm from './waybill-accept-from'
export default {
  components: {
    WaybillAcceptForm,
    TablePaging
  },
  data () {
    return {
      distance: '462px',
      acceptModel: false,
      acceptStepCurrent: 0,
      multItem: [],
      admitCarStateMap: { 0: '未匹配', 1: '已匹配' },
      carTypeMap: { 1: '整车', 2: '集装箱', 3: '零担', 4: '其他' },
      stateMap: { 1: '待用', 2: '待上报', 3: '待受理', 4: '已通过受理', 41: '未通过受理', 5: '已装车', 6: '已发车', 7: '已到达', 8: '已卸车', 9: '已交付', 10: '待理赔', 11: '已理赔', 12: '已作废', 13: '已制票', 14: '通知进货', 400: '退订' },
      list: [],
      columns: [
        { type: 'selection', width: 60, align: 'center', fixed: 'left' },
        { key: 'needNo', title: '需求号', width: 160, fixed: 'left' },
        { key: 'admitCarState', title: '车种', width: 90, render: (h, params) => { let admitCarState = params.row.admitCarState; return h('div', this.admitCarStateMap[admitCarState]) } },
        // { key: 'resDate', title: '预定日期', width: 90, fixed: 'left' },
        // { key: 'reservaNo', title: '预约号', width: 160, fixed: 'left' },
        // { key: 'acceptNo', title: '受理号', width: 90, fixed: 'left' },
        { key: 'station', title: '发站', width: 90 },
        { key: 'astation', title: '到站', width: 90 },
        { key: 'soffic', title: '发局', width: 90 },
        { key: 'aoffic', title: '到局', width: 90 },
        { key: 'sname', title: '托运人', width: 90 },
        { key: 'aname', title: '收货人', width: 90 },
        { key: 'sCarLoadAddr', title: '托运人装车地点', width: 160 },
        { key: 'gname', title: '货物名称', width: 160 },
        { key: 'tunnage', title: '货物描述', width: 90 },
        { key: 'sagent', title: '托运经办人', width: 100 },
        { key: 'aagent', title: '收货经办人', width: 100 },
        { key: 'caseNum', title: '件数', width: 90 },
        { key: 'tunnage', title: '吨数', width: 90 },
        { key: '', title: '保价', width: 90 },
        { key: 'loadDate', title: '装车日期', width: 90 },
        { key: 'reservaNo', title: '预约号', width: 160 },
        { key: 'carType', title: '车种', width: 90, render: (h, params) => { let carType = params.row.carType; return h('div', this.carTypeMap[carType]) } },
        { key: 'carNum', title: '车数', width: 90 },
        { key: 'state', title: '运单状态', width: 90, render: (h, params) => { let state = params.row.state; return h('div', this.stateMap[state]) } }
      ],
      pagination: {
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      acceptFormItem: {
        carrierNote: null,
        bsIds: [],
        bsIDs: null,
        bsptID: null,
        opslt: 1
      },
      indeterminate: true,
      checkAll: false,
      bsTypes: [],
      bspts: []
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
    this.toHandleSearch()
  },
  methods: {
    // 搜索
    toHandleSearch () {
      this.$refs.searchForm.toHandleSearch()
    },
    doHandleSearch (search) {
      const UUID = this.getUserId
      const compyID = this.getCompyId
      let params = { UUID, compyID, ...search, ...this.pagination }
      getWayBillList(params).then(res => {
        const body = res.data
        const data = body.Data
        if (body.Status === 2000) {
          this.list = data.datas || []
          this.pagination = {
            total: data.total,
            pageSize: data.pageSize,
            pageNum: data.page
          }
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
    },
    selectChange (value) {
      this.multItem = value
    },
    // 切换页面
    changePageNum (pageNum) {
      this.pagination.pageNum = pageNum
      this.toHandleSearch()
    },
    // 切换页面size
    changePageSize (pageSize) {
      this.pagination.pageSize = pageSize
      this.toHandleSearch()
    },
    getBatchIds () {
      if (this.multItem && this.multItem.length > 0) {
        const itemIds = []
        this.multItem.forEach((k, v) => {
          itemIds.push(k.wbID)
        })
        return itemIds
      } else {
        this.$Message.error('请选择数据')
      }
    },
    getBatchBsIds () {
      if (this.multItem && this.multItem.length > 0) {
        const itemIds = []
        this.multItem.forEach((k, v) => {
          itemIds.push(k.bsIDs)
        })
        return itemIds
      } else {
        return []
      }
    },
    getCarrierNotes () {
      if (this.multItem && this.multItem.length > 0) {
        const items = []
        this.multItem.forEach((k, v) => {
          items.push(k.carrierNote)
        })
        return items.join(',')
      } else {
        return ''
      }
    },
    doBatchPass () {
      if (!this.getBatchIds()) {
        return
      }
      // this.doSetState(1)
      this.acceptModel = true
      const itemIds = this.getBatchBsIds()

      this.acceptFormItem.carrierNote = this.getCarrierNotes()
      getStampLinkageList({ bsIDs: itemIds.join(',') }).then(res => {
        const body = res.data
        const data = body.Data
        if (body.Status === 2000) {
          this.bspts = data || []
          let c = this.bspts.find((item) => {
            return item.ismark === 1
          })
          if (c) {
            this.acceptFormItem.bsptID = c.bsptID
            this.handleChangeBs(c.bsptID)
          }
          // console.log(this.bspts)
          this.handleCheckAll()
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
    },
    handleChangeBs (item) {
      this.bsTypes = []
      this.bspts.forEach(({ bsptID, chirld }) => {
        if (bsptID === item && chirld) {
          chirld.forEach(({ bsID, name, ismark }) => this.bsTypes.push({ value: bsID, label: name, checked: ismark }))
        }
      })
      this.handleCheckAll()
    },
    doPassStep0 () {
      const UUID = this.getUserId
      const itemIds = this.getBatchIds()
      if (!itemIds) {
        return
      }
      updStamp({ UUID: UUID, wbIDs: itemIds.join(','), bsIDs: this.acceptFormItem.bsIds.join(','), carrierNote: this.acceptFormItem.carrierNote }).then(res => {
        // this.resultHandler(res)
        const body = res.data
        const data = body.Data
        if (body.Status === 2000) {
          this.acceptStepCurrent += 1
          this.$refs['acceptForm'].resetFields()
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
    },
    doPassStep1 () {
      this.doSetState(1)
      debugger
      if (this.acceptStepCurrent === 1) {
        this.acceptStepCurrent = 0
      }
      this.acceptModel = false
    },
    doBatchUnPass () {
      this.doSetState(0)
    },
    doSetState (type) {
      const UUID = this.getUserId
      const state = type === 0 ? 41 : 4
      const itemIds = this.getBatchIds()
      if (!itemIds) {
        return
      }
      setPass({ UUID: UUID, wbIDs: itemIds.join(','), state: state }).then(res => {
        this.resultHandler(res)
      })
    },
    resultHandler (res) {
      const body = res.data
      const data = body.Data
      if (body.Status === 2000) {
        this.toHandleSearch()
        this.multItem = []
        this.$Message.success(data.Result)
      } else {
        this.$Message.error(data.ErrorDes)
      }
    },
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false
      } else {
        this.checkAll = !this.checkAll
      }
      this.indeterminate = false
      this.acceptFormItem.bsIds = []
      if (this.checkAll) {
        this.bsTypes.forEach(({ value }) => {
          this.acceptFormItem.bsIds.push(value)
        })
      }
    },
    checkAllGroupChange (data) {
      if (data.length === this.bsTypes.length) {
        this.indeterminate = false
        this.checkAll = true
      } else if (data.length > 0) {
        this.indeterminate = true
        this.checkAll = false
      } else {
        this.indeterminate = false
        this.checkAll = false
      }
    }
  }
}
</script>
