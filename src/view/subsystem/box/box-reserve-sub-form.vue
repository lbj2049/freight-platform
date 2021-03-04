<template>
  <div>
    <Form ref="editItemForm" :model="forminfo" :rules="rules" :label-width="96" class="qib-form">

      <Row>
        <Col span="2">
          <label class="ivu-form-item-label">发货信息</label>
        </Col>
        <Col span="22">
          <Row>
            <Col span="6">
              <FormItem label="托运人名称" prop="sname">
                <Input size="small" v-model="forminfo.sname" placeholder="请输入托运人名称"/>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="提箱站" prop="suitcaseStation">
                <Input size="small" v-model="forminfo.suitcaseStation" placeholder="请输入发站"/>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="发站" prop="sStation">
                <Input size="small" v-model="forminfo.sStation" placeholder="请输入发站"/>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="发局" prop="soffic">
                <Input size="small" v-model="forminfo.soffic" placeholder="请输入发局"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="装车地点" prop="sCarLoadAddr">
                <Input size="small" v-model="forminfo.sCarLoadAddr" placeholder="请输入装车地点"/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="移动电话" prop="smobile">
                <Input size="small" v-model="forminfo.smobile" placeholder="请输入移动电话"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="经办人" prop="sagent">
                <Input size="small" v-model="forminfo.sagent" placeholder="请输入经办人"/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="身份证" prop="scardID">
                <Input size="small" v-model="forminfo.scardID" placeholder="请输入身份证"/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="手机" prop="stel">
                <Input size="small" v-model="forminfo.stel" placeholder="请输入手机"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="通讯地址" prop="saddr">
                <Input size="small" v-model="forminfo.saddr" placeholder="请输入通讯地址"/>
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
                <Input size="small" v-model="forminfo.aname" placeholder="请输入收货人名称"/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="收站" prop="astation">
                <Input size="small" v-model="forminfo.astation" placeholder="请输入到站"/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="到局" prop="aoffic">
                <Input size="small" v-model="forminfo.aoffic" placeholder="请输入到局"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="卸车地点" prop="aCarDownAddr">
                <Input size="small" v-model="forminfo.aCarDownAddr" placeholder="请输入卸车地点"/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="移动电话" prop="amobile">
                <Input size="small" v-model="forminfo.amobile" placeholder="请输入移动电话"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="经办人" prop="aagent">
                <Input size="small" v-model="forminfo.aagent" placeholder="请输入经办人"/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="身份证" prop="acardID">
                <Input size="small" v-model="forminfo.acardID" placeholder="请输入身份证"/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="手机" prop="atel">
                <Input size="small" v-model="forminfo.atel" placeholder="请输入手机"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="通讯地址" prop="aaddr">
                <Input size="small" v-model="forminfo.aaddr" placeholder="请输入通讯地址"/>
              </FormItem>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col span="2">
          <label class="ivu-form-item-label">订箱信息</label>
        </Col>
        <Col span="22">
          <Row>
            <Col span="6">
              <FormItem label="箱类" prop="caseClass">
                <Select size="small" v-model="forminfo.caseClass" placeholder="请选择箱类">
                  <Option v-for="item in caseClasses" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="箱型" prop="caseForm">
                <Select size="small" v-model="forminfo.caseForm" placeholder="请选择箱型">
                  <Option v-for="item in caseForms" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="提箱日期" prop="caseDate">
                <DatePicker size="small" v-model="forminfo.caseDate" type="date" placeholder="请输入提箱日期" @on-change="handleChangeDate"></DatePicker>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="剩余箱数">
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="箱数" prop="caseCount">
                <Input size="small" v-model="forminfo.caseCount" placeholder="请输入箱数" number/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="货物名称" prop="gname">
                <Input size="small" v-model="forminfo.gname" placeholder="请输入货物名称"/>
              </FormItem>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col span="2">
          <label class="ivu-form-item-label">付费方式</label>
        </Col>
        <Col span="22">
          <Row>
            <Col span="8">
              <FormItem label="" prop="city">

                <RadioGroup>
                  <Radio label="male" disabled>现金</Radio>
                  <Radio label="female" disabled>支票</Radio>
                  <Radio label="male" disabled>银行卡</Radio>
                  <Radio label="female" disabled>预付款</Radio>
                  <Radio label="female" disabled>汇款支付</Radio>
                </RadioGroup>

              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="付费号码">
                <Input size="small" disabled placeholder="请输入付费号码"/>
              </FormItem>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col span="2">
          <label class="ivu-form-item-label">其他事项</label>
        </Col>
        <Col span="22">
          <FormItem label="托运人记载事项" prop="notepad">
            <Input size="small" v-model="forminfo.notepad" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."/>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="2">
          <label class="ivu-form-item-label">货运信息</label>
        </Col>
        <Col span="22">
          <Row>
            <Col span="6">
              <FormItem>
                <Checkbox disabled>保价运输</Checkbox>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem>
                <Checkbox disabled>装载加固材料</Checkbox>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem>
                <Checkbox disabled>仓储</Checkbox>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem>
                <Checkbox disabled>冷藏(保温)</Checkbox>
              </FormItem>
            </Col>
          </Row>
        </Col>
      </Row>

      <FormItem :label-width="0" style="text-align: center">
        <Button type="primary" :loading="loading" @click="handleSubmit('editItemForm')">提交</Button>
        <Button @click="handleReset('editItemForm')" style="margin-left: 8px">清空</Button>
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
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      carTypes: [{ value: 1, label: '整车' }, { value: 2, label: '集装箱' }, { value: 3, label: '零担' }, { value: 4, label: '其他' }],
      caseClasses: [{ value: 1, label: '35吨敞顶箱' }, { value: 2, label: '35吨通用箱' }, { value: 3, label: '普通标准箱' }],
      caseForms: [{ value: 1, label: '20英尺' }, { value: 2, label: '40英尺' }],
      forminfo: {
        compyID: null,
        expID: null,
        gMaxWeight: null,
        gpackage: null,
        smobile: null,
        amobile: null,

        aname: null,
        notepad: null,
        aagent: null,

        gnameID: null,
        gname: null,
        // glocation: null,
        sCarLoadAddr: null,
        acardID: null,
        carType: null,
        sname: null,
        sagent: null,
        scardID: null,
        atel: null,
        stel: null,
        aCarDownAddr: null,
        soffic: null,
        aoffic: null,
        aaddr: null,
        saddr: null,
        sStation: null,
        aStation: null,
        suitcaseStation: null,
        caseClass: 1,
        caseForm: 1,
        caseCount: null,
        caseDate: null
      },
      rules: {

        // compyID: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        // expID: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        gMaxWeight: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        gpackage: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        smobile: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        amobile: [ { required: true, message: '不能为空', trigger: 'blur' } ],

        aname: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        // notepad: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        // aagent: [ { required: true, message: '不能为空', trigger: 'blur' } ],

        gnameID: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        gname: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        // glocation: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        sCarLoadAddr: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        acardID: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        carType: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        sname: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        // sagent: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        // scardID: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        atel: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        stel: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        aCarDownAddr: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        soffic: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        aoffic: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        // aaddr: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        // saddr: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        sStation: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        aStation: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        suitcaseStation: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        caseClass: [ { required: true, message: '不能为空', trigger: 'change', type: 'number' } ],
        caseForm: [ { required: true, message: '不能为空', trigger: 'change', type: 'number' } ],
        caseCount: [ { required: true, message: '请输入有效数字', trigger: 'blur', type: 'number' } ],
        caseDate: [ { required: true, message: '不能为空', trigger: 'change' } ]
      },
      defaultInfo: {

      }
    }
  },
  computed: {
    getUserId () {
      return this.$store.state.user.userId
    },
    getCompyId () {
      return this.$store.state.user.compyId
    },
    getExperimentId () {
      return this.$store.state.user.experimentId
    }
  },
  created () {
    // 保留初始值
    this.defaultInfo = this.forminfo
  },
  methods: {
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
    editFormData (forminfo) {
      this.forminfo = { ...forminfo }
      this.isAdd = true
      if (this.forminfo.bwbID) {
        this.isAdd = false
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.forminfo.expID = this.getExperimentId
          this.forminfo.compyID = this.getCompyId
          this.$emit('handleFormSubmit', this.forminfo)
        }
      })
    },
    handleReset (name) {
      this.forminfo = this.defaultInfo
      this.$refs[name].resetFields()
    },
    handleChangeDate (dr) {
      this.forminfo.caseDate = dr
    }
  }
}
</script>
