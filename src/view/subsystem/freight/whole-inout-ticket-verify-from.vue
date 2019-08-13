<style lang="less">
  @import 'whole-inout-ticket-verify-from';
</style>
<template>
  <div>
      <Form ref="transit" :model="transit" :rules="rules" :show-message="false" class="qib-form">
          <FormItem label="股道" prop="yardName" :label-width="40">
            <Input size="small" v-model="transit.yardName" placeholder="请输入股道"></Input>
          </FormItem>
          <FormItem :label-width="10">
            <Button size="small" type="primary" :loading="loading" @click="handleSubmit('transit')" style="margin-left: 8px">查询</Button>
            <Button size="small" @click="handleTicketVerify()" style="margin-left: 8px">票据验证</Button>
          </FormItem>
      </Form>
      <!--提交时加载动画-->
      <Spin size="large" fix v-if="loading"></Spin>

      <Modal v-model="verifyFormModel" title="外勤进出货验证" @on-ok="verifyOk" @on-cancel="verifyCancel">
        <Form ref="ticket" :model="ticket" :rules="rules" :show-message="false" :label-width="72" class="qib-form">
          <FormItem label="票据号" prop="waybillNo">
            <Input size="small" v-model="ticket.waybillNo" readonly>
              <Button slot="append" @click="handleSelectTicket">选择</Button>
            </Input>
          </FormItem>
          <Divider orientation="left" class="divider">整车进出货信息</Divider>
          <FormItem label="托运人" prop="sname">
            <Input size="small" v-model="ticket.sname" readonly></Input>
          </FormItem>
          <FormItem label="收货人" prop="aname">
            <Input size="small" v-model="ticket.aname" readonly></Input>
          </FormItem>
          <Row>
            <Col span="12">
              <FormItem label="品名" prop="gname">
                <Input size="small" v-model="ticket.gname" readonly></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="货重" prop="tunnage">
                <Input size="small" v-model="ticket.tunnage"></Input>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <FormItem label="发站" prop="station">
                <Input size="small" v-model="ticket.station" readonly></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="到站" prop="astation">
                <Input size="small" v-model="ticket.astation" readonly></Input>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <FormItem label="汽车号码">
                <Input size="small" readonly></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="预约日期" prop="waybillNo">
                <Input size="small" type="date" v-model="ticket.date" readonly></Input>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <FormItem label="进门重量">
                <Input size="small" readonly></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="有效日期" prop="date">
                <Input size="small" type="date" v-model="ticket.date" readonly></Input>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <FormItem label="需求号" prop="needNo">
                <Input size="small" v-model="ticket.needNo" readonly></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="股道简称" prop="yardName">
                <Input size="small" v-model="ticket.yardName" readonly></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="货区货位" prop="glocation">
                <Input size="small" v-model="ticket.glocation" readonly></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <Row>
                <Col span="10">
                  <FormItem :label-width="12" prop="isg">
                    <Checkbox v-model="ticket.isg" readonly>综合货位</Checkbox>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem>
                    <Button size="small" type="primary" @click="handleSelectPosition()">选择货位</Button>
                  </FormItem>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal v-model="ticketSearchModel" title="票据查询" width="960" :footer-hide="true">
        <Form ref="ts" :model="ts" :rules="tsrules" :show-message="false" :label-width="72" class="qib-form">
          <Row>
            <Col span="8">
              <FormItem label="票据类型" :label-width="72">
                <RadioGroup v-model="ts.ticketType">
                  <Radio label="1" >运单</Radio>
                  <Radio label="2" readonly>货单</Radio>
                  <Radio label="3" readonly>出站单</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="运输方式" prop="carType">

                <Select size="small" v-model="ts.carType" placeholder="请选择车种">
                  <Option v-for="item in carTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="提报日期" prop="resDate">
                <DatePicker size="small" type="daterange" v-model="ts.resDate" placeholder="请选择提报日期" @on-change="handleChangeResDate"></DatePicker>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="托运人" prop="sname">
                <Input size="small" v-model="ts.sname" placeholder="请输入托运人"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="收货人" prop="aname">
                <Input size="small" v-model="ts.aname" placeholder="请输入收货人"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="处理状态" prop="state">
                <Select size="small" v-model="ts.state" placeholder="请选择运单状态">
                  <Option v-for="item in states" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="8">
              <FormItem label="票据号" prop="waybillNo">
                <Input size="small" v-model="ts.waybillNo" placeholder="请输入票据号"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="发站" prop="station">
                <Input size="small" v-model="ts.station" placeholder="请输入发站"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem :label-width="15">
                <Button size="small" type="primary" @click="handleSearchPosition('ts')">查询</Button>
                <Button size="small" @click="handleSearchReset('ts')" style="margin-left: 8px">重置</Button>
                <Button size="small" type="primary" @click="handleGetPosition('ts')" style="margin-left: 8px">取货票</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Table ref="tsRowTable" border :columns="tscols" :data="tsrs" @on-current-change="getCurrentData" size="small" highlight-row></Table>
      </Modal>

      <Modal v-model="positionSelectModel" title="选择货位" width="800" @on-ok="positionSelectOk" @on-cancel="positionSelectCancel">
        <Form ref="glocation" :model="glocation" :rules="rules" :show-message="false" :label-width="72" class="qib-form">
        <Row :gutter="6">
          <Col span="18">
            <div style="line-height: 32px">
              <Row>
                <Col span="3"><div class="legend"><span class="legend-text">空位</span><div class="legend-img position-cell-0"></div></div></Col>
                <Col span="3"><div class="legend"><span class="legend-text">预约</span><div class="legend-img position-cell-1"></div></div></Col>
                <Col span="3"><div class="legend"><span class="legend-text">作业中</span><div class="legend-img position-cell-2"></div></div></Col>
                <Col span="3"><div class="legend"><span class="legend-text">仓单</span><div class="legend-img position-cell-3"></div></div></Col>
                <Col span="3"><div class="legend"><span class="legend-text">混合</span><div class="legend-img position-cell-4"></div></div></Col>
                <Col span="3"><div class="legend"><span class="legend-text">占用</span><div class="legend-img position-cell-5"></div></div></Col>
                <Col span="3"><div class="legend"><span class="legend-text">仓单</span><div class="legend-img position-cell-6"></div></div></Col>
                <Col span="3"><div class="legend"><span class="legend-text">混合</span><div class="legend-img position-cell-7"></div></div></Col>
              </Row>
            </div>
          </Col>
          <Col span="6">
            <FormItem label="货区" prop="bgwID">
              <Select size="small" v-model="glocation.bgwID" placeholder="请选择货区" @on-change="handleChangeBGW" :label-in-value="true">
                <Option v-for="item in pwhs" :value="item.value" :key="item.label">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        </Form>
        <Row :gutter="6">
          <Col span="3" v-for="pr in psrs">
            <Poptip trigger="hover">
              <div slot="title" v-show="pr.checked"><i>仓位已满</i></div>
              <div slot="title" v-show="!pr.checked"><i>选择仓位</i></div>
              <div slot="content" v-show="!pr.checked">
                <Button size="small" type="primary" @click="doHandlePrOk(pr)">确定</Button>
                <Button size="small" style="margin-left: 8px" @click="doHandlePrCancel(pr)">关闭</Button>
              </div>
              <div class="position-col ">
                <div class="position-body">
                  <Row :gutter="1">
                    <Col span="8" v-for="lv in pr.ls">
                      <div v-if="lv.site > 0 && lv.state === 0" :class="{'position-cell-checked': lv.checked, 'position-cell position-cell-0': lv.state === 0}" v-on:click="doHandlePrChecked1(pr, lv.site)"></div>
                      <div v-else-if="lv.site === 0 && lv.state === 0" :class="{'position-cell-checked': lv.checked, 'position-cell position-cell-0': true}" v-on:click="doHandlePrChecked2(pr)"></div>
                      <div v-else class="position-cell" v-bind:class="psdsMap[lv.state]"></div>
                    </Col>
                  </Row>
                </div>
                <div class="position-title">{{pr.door}}门{{pr.warehouse}}货位 {{pr.full}}</div>
              </div>
            </Poptip>
          </Col>

        </Row>
      </Modal>

  </div>
</template>
<script>
import {
  waybillNoSel,
  warehouseList,
  adCompyGlocation,
  compyGlocation
} from '@/api/freight.data'
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      verifyFormModel: false,
      ticketSearchModel: false,
      positionSelectModel: false,
      transit: {
        yardName: ''
      },
      ticket: {
        wbID: '', // id
        waybillNo: '', // 运单号
        resDate: '', // 提报日期
        station: '', // 发站
        astation: '', // 到站
        sname: '', // 托运人
        aname: '', // 收货人
        state: '', // 状态
        gname: '', // 品名
        carNum: '', // 车数
        carType: '', // 运输方式
        tunnage: '', // 货重
        yardName: '', // 股道名称
        glocation: '' // 货区货位

      },
      ticketTmp: {
      },
      carTypeMap: { 1: '整车', 2: '集装箱', 3: '零担', 4: '其他' },
      carTypes: [{ value: 1, label: '整车' }, { value: 2, label: '集装箱' }, { value: 3, label: '零担' }, { value: 4, label: '其他' }],
      stateMap: { 1: '待用', 2: '待上报', 3: '待受理', 4: '已通过受理', 41: '未通过受理', 5: '已装车', 6: '已发车', 7: '已到达', 8: '已卸车', 9: '已交付', 10: '待理赔', 11: '已理赔', 12: '已作废', 13: '已制票', 14: '通知进货', 400: '退订' },
      states: [{ value: 1, label: '待用' }, { value: 2, label: '待上报' }, { value: 3, label: '待受理' }, { value: 4, label: '已通过受理' }, { value: 41, label: '未通过受理' }, { value: 5, label: '已装车' }, { value: 6, label: '已发车' }, { value: 7, label: '已到达' }, { value: 8, label: '已卸车' }, { value: 9, label: '已交付' }, { value: 10, label: '待理赔' }, { value: 11, label: '已理赔' }, { value: 12, label: '已作废' }, { value: 13, label: '已制票' }],
      ts: {
        ticketType: '1',
        resDate: '',
        resDate_bg: '',
        resDate_ed: '',
        carType: '',
        sname: '',
        aname: '',
        station: '',
        waybillNo: '',
        state: '',
        isg: ''
      },
      tsrules: {},
      tscols: [
        { type: 'index', width: 38, align: 'center' },
        { key: 'waybillNo', title: '运单号', width: 90 },
        { key: 'resDate', title: '货主提报日期', width: 160 },
        { key: 'station', title: '发站', width: 160 },
        { key: 'astation', title: '到站', width: 160 },
        { key: 'sname', title: '托运人', width: 160 },
        { key: 'aname', title: '收货人', width: 90 },
        { key: 'state', title: '处理状态', width: 120, render: (h, params) => { let state = params.row.state; return h('div', this.stateMap[state]) } },
        { key: 'gname', title: '品名', width: 160 },
        { key: 'carNum', title: '车数', width: 160 },
        { key: 'carType', title: '运输方式', width: 90, render: (h, params) => { let carType = params.row.carType; return h('div', this.carTypeMap[carType]) } }
      ],
      tsrs: [],
      glocation: {
        bgwID: '',
        warehouse: '',
        doors: []
        // wbID: '',
        // bglID: '',
        // sites: []
      },
      pwhs: [],
      psds: [
        { wbID: '', bglID: '', site: 1, state: 0, checked: false },
        { wbID: '', bglID: '', site: 2, state: 0, checked: false },
        { wbID: '', bglID: '', site: 3, state: 0, checked: false },
        { wbID: '', bglID: '', site: 4, state: 0, checked: false },
        { wbID: '', bglID: '', site: 0, state: 0, checked: false },
        { wbID: '', bglID: '', site: 5, state: 0, checked: false },
        { wbID: '', bglID: '', site: 6, state: 0, checked: false },
        { wbID: '', bglID: '', site: 7, state: 0, checked: false },
        { wbID: '', bglID: '', site: 8, state: 0, checked: false }
      ],
      psdsMap: { 0: 'position-cell-0', 1: 'position-cell-1', 2: 'position-cell-2', 3: 'position-cell-3', 4: 'position-cell-4', 5: 'position-cell-5', 6: 'position-cell-6', 7: 'position-cell-7', 8: 'position-cell-8' },
      psrs: [],
      rules: {
      },
      pagination: {
        total: 0,
        pageSize: 10,
        pageNum: 1
      }
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
  methods: {
    // 搜索
    toHandleSearch () {
      this.handleSubmit('transit')
    },
    handleSubmit (name) {
      // this.$emit('handleFormSubmit', this.transit)
      // this.$Message.success('Success!')
      /*
      */
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('handleFormSubmit', this.transit)
        }
      })
    },
    handleTicketVerify () {
      this.$emit('handleTicketVerify')
      this.verifyFormModel = true

      if (!this.$data.ticket) Object.assign(this.$data.ticket, this.$options.data().ticket)
      // if (!this.$data.ticketTmp) Object.assign(this.$data.ticketTmp, this.$options.data().ticketTmp)
      // if (!this.$data.glocation) Object.assign(this.$data.glocation, this.$options.data().glocation)
      // if (!this.$data.pwhs) Object.assign(this.$data.pwhs, this.$options.data().pwhs)
      // if (!this.$data.tsrs) Object.assign(this.$data.tsrs, this.$options.data().tsrs)
      // if (!this.$data.psrs) Object.assign(this.$data.psrs, this.$options.data().psrs)
    },
    handleSelectTicket () {
      // console.log('handleSelectTicket')
      this.ticketSearchModel = true
    },
    handleSelectPosition () {
      if (!(this.ticket && this.ticket.wbID)) {
        this.$Message.error('请选择票据')
        return
      }
      this.pwhs = []
      const UUID = this.getUserId
      const compyID = this.getCompyId
      const type = 1
      let params = { UUID, type }
      warehouseList(params).then(res => {
        // console.log(res)
        const body = res.data
        const data = body.Data
        if (body.Status === 2000) {
          if (data) {
            data.forEach(({ bgwID, warehouse }) => this.pwhs.push({ value: bgwID, label: warehouse }))
          }
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
      this.positionSelectModel = true
    },
    handleSearchPosition (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const UUID = this.getUserId
          const compyID = this.getCompyId
          let params = { UUID, compyID, ...this.ts, ...this.pagination }
          waybillNoSel(params).then(res => {
            // console.log(res)
            const body = res.data
            const data = body.Data
            if (body.Status === 2000) {
              this.tsrs = data.datas || []
              this.pagination = {
                total: data.total,
                pageSize: data.pageSize,
                pageNum: data.page
              }
            } else {
              this.$Message.error(data.ErrorDes)
            }
          })
        }
      })
    },
    handleSearchReset (name) {
      this.$refs[name].resetFields()
      this.$refs.tsRowTable.clearCurrentRow()
    },
    handleGetPosition (name) {
      if (Object.is(this.ticketTmp, null) || Object.keys(this.ticketTmp).length === 0) {
        this.$Message.error('请选择一条数据')
        return
      }

      this.ticket = this.ticketTmp
      this.ticketTmp = {}
      this.ticketSearchModel = false
      this.$refs[name].resetFields()
      this.$refs.tsRowTable.clearCurrentRow()
      this.psrs = []
      this.glocation = {}
      // Object.assign(this.$data.ticketTmp, this.$options.data().ticketTmp)
      Object.assign(this.$data.glocation, this.$options.data().glocation)
    },
    getCurrentData (data) {
      this.ticketTmp = data
    },
    verifyOk () {
      this.$emit('handleFormSubmit', this.search)
    },
    verifyCancel () {
      // this.$emit('handleFormSubmit', this.search)
    },
    positionSelectOk () {
      // console.log(this.glocation)
      this.ticket.glocation = this.glocation.warehouse + this.glocation.doors.join(',')
    },
    positionSelectCancel () {

    },
    handleChangeResDate (dr) {
      this.ts.resDate_bg = dr[0]
      this.ts.resDate_ed = dr[1]
    },
    // 选择货区
    handleChangeBGW (sv) {
      if (!this.positionSelectModel) {
        return
      }
      // console.log(sv)
      // console.log(this.glocation)
      const UUID = this.getUserId
      const compyID = this.getCompyId
      const bgwID = this.glocation.bgwID
      if (!bgwID) {
        this.$Message.error('请选择货区')
        return
      }
      if (sv) {
        this.glocation.warehouse = sv.label
      }
      let params = { UUID, compyID, bgwID }
      this.psrs = []
      compyGlocation(params).then(res => {
        const body = res.data
        const data = body.Data
        if (body.Status === 2000) {
          if (data) {
            data.forEach(dv => {
              let bglID = dv.bglID
              let pv = {
                bgwID: bgwID,
                bglID: bglID,
                door: dv.door,
                warehouse: dv.warehouse,
                check: false,
                ls: []
              }
              let psds = []
              // let psds = [ ...this.psds ]
              if (dv.used && dv.used.length > 0) {
                this.psds.forEach(pd => {
                  let checked = false
                  if (pd.site !== 0) {
                    const dc = dv.used.find(prt => prt.site === pd.site)
                    // console.log(dc)
                    if (dc) {
                      if (dc.state > 0) {
                        checked = true
                      }
                      let pdt = { ...pd, ...dc, bgwID, bglID, checked }
                      psds.push(pdt)
                    } else {
                      let pdt = { ...pd, bgwID, bglID, checked }
                      psds.push(pdt)
                    }
                  } else {
                    if ((dv.used.length === 8)) {
                      checked = true
                    }
                    let pdt = { ...pd, bgwID, bglID, checked }
                    psds.push(pdt)
                  }
                })
              } else {
                this.psds.forEach(pd => {
                  let pdt = { ...pd }
                  pdt.bglID = bglID
                  psds.push(pdt)
                })
              }
              pv.ls = psds
              this.psrs.push(pv)
            })
          }
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
    },
    doHandlePrChecked1 (pr, site) {
      let checked = false
      let stateNum = 0
      let checkNum = 0
      pr.ls.forEach(prt => {
        if (prt.site !== 0 && prt.state === 0) {
          if (prt.site === site) {
            prt.checked = !prt.checked
            checked = prt.checked
          }
          if (prt.state === 0) {
            ++stateNum
          }
          if (prt.checked) {
            ++checkNum
          }
        }
      })
      // console.log(checkNum, stateNum)
      if (stateNum === checkNum) {
        if (checked) {
          let prtv = pr.ls.find(prt => prt.site === 0)
          prtv.checked = true
        }
      } else {
        let prtv = pr.ls.find(prt => prt.site === 0)
        prtv.checked = false
      }
    },
    doHandlePrChecked2 (pr) {
      // console.log(pr)
      const prtv = pr.ls.find(prt => prt.site === 0)

      let checked = prtv.checked

      pr.ls.forEach(prt => {
        if (prt.state === 0) {
          prt.checked = !checked
        }
      })
    },
    doHandlePrOk (pr) {
      // console.log(pr)
      let site = []
      pr.ls.forEach(prt => {
        if (prt.site !== 0 && prt.state === 0 && prt.checked) {
          site.push(prt.site)
        }
      })
      if (site.length === 0) {
        this.$Message.error('请选择货位')
      }
      const sites = site.join(',')
      const bglID = pr.bglID
      const wbID = this.ticket.wbID
      const UUID = this.getUserId
      const compyID = this.getCompyId
      let params = { UUID, compyID, sites, wbID, bglID }
      adCompyGlocation(params).then(res => {
        const body = res.data
        const data = body.Data
        // console.log(data)
        if (body.Status === 2000) {
          this.$Message.success(data.Result)
          const idx = this.glocation.doors.findIndex((v) => v === pr.door)
          if (idx === -1) {
            this.glocation.doors.push(pr.door)
          }
          this.handleChangeBGW()
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
    },
    doHandlePrCancel (pr) {
      pr.ls.forEach(prt => {
        if (prt.state === 0) {
          prt.checked = false
        }
      })
    }
  }
}
</script>
