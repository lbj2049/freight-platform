<template>
  <div>
    <Modal :value="editable" :mask-closable="false" :footer-hide="true" :title="getTitle()" @on-visible-change="watchEditableChange" :styles="{top: '8%'}" width="880">
      <Form ref="editItemForm" :model="demand" :rules="rules" :label-width="120" class="qib-form">

        <Row>
          <Col span="2">
            <label class="ivu-form-item-label">基本信息</label>
          </Col>
          <Col span="22">
            <Row>
              <Col span="16">
                <FormItem label="需求单名称" prop="title">
                  <Input v-model="demand.title" placeholder="请输入需求单名称"/>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="练习类型" prop="carType">
                  <Select v-model="demand.receptType" placeholder="请选择练习类型">
                    <Option v-for="item in receptTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="吨数" prop="tunnage">
                  <Input v-model="demand.tunnage" placeholder="请输入吨数" number/>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="车种" prop="carType">
                  <Select v-model="demand.carType" placeholder="请选择车种">
                    <Option v-for="item in carTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="车数" prop="carNum">
                  <Input v-model="demand.carNum" placeholder="请输入车数" number/>
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col span="2">
            <label class="ivu-form-item-label">发货信息</label>
          </Col>
          <Col span="22">
            <Row>
              <Col span="8">
                <FormItem label="托运人名称" prop="sname">
                  <Input v-model="demand.sname" placeholder="请输入托运人名称"/>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="发站" prop="soffic">
                  <Input v-model="demand.soffic" placeholder="随机分发" disabled/>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="发局" prop="soffic">
                  <Input v-model="demand.soffic" placeholder="随机分发" disabled/>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="装车地点" prop="sCarLoadAddr">
                  <Input v-model="demand.sCarLoadAddr" placeholder="请输入装车地点"/>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="移动电话" prop="smobile">
                  <Input v-model="demand.smobile" placeholder="请输入移动电话"/>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="经办人" prop="sagent">
                  <Input v-model="demand.sagent" placeholder="请输入经办人"/>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="身份证" prop="scardID">
                  <Input v-model="demand.scardID" placeholder="请输入身份证"/>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="手机" prop="stel">
                  <Input v-model="demand.stel" placeholder="请输入手机"/>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="通讯地址" prop="saddr">
                  <Input v-model="demand.saddr" placeholder="请输入通讯地址"/>
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col span="2">
            <label class="ivu-form-item-label">货物信息</label>
          </Col>
          <Col span="22">
            <Row>
              <Col span="8">
                <FormItem label="货物名称" prop="gname">
                  <Input v-model="demand.gname" placeholder="请输入货物名称"/>
                </FormItem>
              </Col>
              <Col span="16">
                <!--
                <FormItem label="货物特种" prop="city">
                  <span>[</span>
                  <RadioGroup v-model="demand.gender">
                    <Radio label="male">怕湿</Radio>
                    <Radio label="female">不怕湿</Radio>
                  </RadioGroup>
                  <span>]    [</span>
                  <RadioGroup v-model="demand.gender">
                    <Radio label="male">散堆装</Radio>
                    <Radio label="female">非散堆装</Radio>
                  </RadioGroup>
                  <span>]</span>
                </FormItem>
                -->
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="货物包装" prop="gpackage">
                  <Input v-model="demand.gpackage" placeholder="请输入货物包装"/>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="最大单件重量" prop="gMaxWeight">
                  <InputNumber v-model="demand.gMaxWeight" placeholder="请输入最大单件重量"/>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="货区货位" prop="glocation">
                  <Input v-model="demand.glocation" placeholder="请输入货区货位"/>
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span="24">
                <FormItem slot>
                  若需要填写物品清单，请在日需求查询功能中填写。
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col span="2">
            <label class="ivu-form-item-label">收货信息</label>
          </Col>
          <Col span="22">
            <Row>
              <Col span="8">
                <FormItem label="收货人名称" prop="aname">
                  <Input v-model="demand.aname" placeholder="请输入收货人名称"/>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="到站" prop="aoffic">
                  <Input v-model="demand.aoffic" placeholder="随机分发" disabled/>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="到局" prop="aoffic">
                  <Input v-model="demand.aoffic" placeholder="随机分发" disabled/>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="卸车地点" prop="aCarDownAddr">
                  <Input v-model="demand.aCarDownAddr" placeholder="请输入卸车地点"/>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="移动电话" prop="amobile">
                  <Input v-model="demand.amobile" placeholder="请输入移动电话"/>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="经办人" prop="aagent">
                  <Input v-model="demand.aagent" placeholder="请输入经办人"/>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="身份证" prop="acardID">
                  <Input v-model="demand.acardID" placeholder="请输入身份证"/>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="手机" prop="atel">
                  <Input v-model="demand.atel" placeholder="请输入手机"/>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="通讯地址" prop="aaddr">
                  <Input v-model="demand.aaddr" placeholder="请输入通讯地址"/>
                </FormItem>
              </Col>
            </Row>
            <FormItem prop="interest">
              <CheckboxGroup v-model="demand.interest">
                <Checkbox label="领货通知" disabled></Checkbox>
              </CheckboxGroup>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="2">
            <label class="ivu-form-item-label">记载事项</label>
          </Col>
          <Col span="22">
            <FormItem label="记载事项" prop="notepad">
              <Input v-model="demand.notepad" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."/>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="2">
            <label class="ivu-form-item-label">物流服务</label>
          </Col>
          <Col span="22">
            <FormItem>
              <CheckboxGroup>
                <Checkbox label="门到站" disabled></Checkbox>
                <Checkbox label="站到门" disabled></Checkbox>
                （可根据您的需求，选择录入发到站截取、送达、仓储等物流服务信息）
              </CheckboxGroup>
            </FormItem>
          </Col>
        </Row>

        <FormItem>
          <Button type="primary" :loading="loading" @click="handleSubmit('editItemForm')">提交</Button>
          <Button @click="handleReset('editItemForm')" style="margin-left: 8px">清空</Button>
        </FormItem>
      </Form>
      <!--提交时加载动画-->
      <Spin size="large" fix v-if="loading"></Spin>
    </Modal>
  </div>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isAdd: true,
      // receptTypes: [{ value: 1, label: '发车练习' }, { value: 2, label: '接车练习' }],
      receptTypes: [{ value: 1, label: '发车练习' }],
      carTypes: [{ value: 1, label: '整车' }, { value: 2, label: '集装箱' }, { value: 3, label: '零担' }, { value: 4, label: '其他' }],
      demand: {
        bwbID: '',
        title: '',
        receptType: 1,
        gMaxWeight: null,
        gpackage: '',
        smobile: '',
        amobile: '',
        tunnage: '',
        aname: '',
        notepad: '',
        aagent: '',
        carNum: '',
        gname: '',
        glocation: '',
        sCarLoadAddr: '',
        acardID: '',
        carType: '',
        sname: '',
        sagent: '',
        scardID: '',
        atel: '',
        stel: '',
        aCarDownAddr: '',
        soffic: '',
        aoffic: '',
        aaddr: '',
        saddr: ''
      },
      rules: {
        title: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        // gMaxWeight: [ { required: true, message: '请输入有效数字', trigger: 'blur' } ],
        gpackage: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        smobile: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        amobile: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        tunnage: [ { required: true, message: '请输入有效数字', trigger: 'blur', type: 'number' } ],
        aname: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        // notepad: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        // aagent: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        carNum: [ { required: true, message: '请输入有效数字', trigger: 'blur', type: 'number' } ],
        gname: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        // glocation: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        sCarLoadAddr: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        acardID: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        carType: [ { required: true, message: '不能为空', trigger: 'change', type: 'number' } ],
        sname: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        // sagent: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        scardID: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        atel: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        stel: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        aCarDownAddr: [ { required: true, message: '不能为空', trigger: 'blur' } ]
        // soffic: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        // aoffic: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        // aaddr: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        // saddr: [ { required: true, message: '不能为空', trigger: 'blur' } ]
      },
      defaultInfo: {

      }
    }
  },
  created () {
    // 保留初始值
    this.defaultInfo = this.demand
  },
  methods: {
    getTitle () {
      return (this.isAdd ? '添加' : '修改') + '需求单'
    },
    // 弹出层的事件
    formConfirmEvent () {
      this.$emit('formConfirmEvent')
    },
    formCancelEvent () {
      this.$emit('formCancelEvent')
    },
    watchEditableChange (e) {
      this.$emit('watchEditableChange', e)
    },
    editFormData (demand) {
      this.demand = { ...demand }
      this.isAdd = true
      if (this.demand.bwbID) {
        this.isAdd = false
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('onSuccessValid', this.demand)
        }
      })
    },
    handleReset (name) {
      this.demand = { ...this.defaultInfo }
      this.$refs[name].resetFields()
    }
  }
}
</script>
