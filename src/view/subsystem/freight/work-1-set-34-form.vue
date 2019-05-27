<template>
  <div>
    <Modal :value="editable" :mask-closable="false" :styles="{top: '16%'}" width="880" @on-visible-change="getEditableChange" class="work-form-modal">

      <Card :padding="0" :dis-hover="true">
        <p slot="title">装车</p>
        <Row>
          <Col span="12">
            <Card>
              <p slot="title">装车前三检</p>
              <Form ref="dt3Form" :model="dt31" :rules="dt31rules" :label-width="80" :show-message="false" class="qib-form">
                <FormItem label="车辆状态">
                  <Checkbox disabled>良好</Checkbox>
                </FormItem>
                <FormItem label="轴数" prop="axleNum">
                  <Input size="small" type="text" v-model="dt31.axleNum" readonly :disabled="dt31disabled"></Input>
                </FormItem>
                <FormItem label="车型" prop="carVersion">
                  <Input size="small" type="text" v-model="dt31.carVersion" readonly :disabled="dt31disabled"></Input>
                </FormItem>
                <FormItem label="车号" prop="carCard">
                  <Input size="small" type="text" v-model="dt31.carCard" readonly :disabled="dt31disabled"></Input>
                </FormItem>
                <FormItem label="标重" prop="tunnage">
                  <Input size="small" type="text" v-model="dt31.tunnage" :disabled="dt31disabled"></Input>
                </FormItem>
                <FormItem label="货位" prop="bglID">
                  <Input size="small" type="text" v-model="dt31.bglID" readonly :disabled="dt31disabled"></Input>
                </FormItem>
                <FormItem>
                  <Checkbox disabled>综合货拉</Checkbox>
                  <Checkbox disabled>多货拉</Checkbox>
                </FormItem>
              </Form>
            </Card>
          </Col>
          <Col span="12">
            <Card>
              <p slot="title">装车后三检</p>
              <Form ref="dt4Form" :model="dt41" :rules="dt41rules" :label-width="80" :show-message="false" class="qib-form">
                <Row>
                  <Col span="6">
                    <FormItem label="品名"></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="重量"></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="件数"></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="体积"></FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="6">
                    <FormItem prop="gname" :label-width="0"><Input size="small" type="text" v-model="dt41.gname" disabled></Input></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem prop="caseNum" :label-width="0"><Input size="small" type="text" v-model="dt41.caseNum" disabled></Input></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem prop="tunnage" :label-width="0"><Input size="small" type="text" v-model="dt41.tunnage" disabled></Input></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="6">
                    <FormItem label="合计"></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="6">
                    <FormItem :label-width="20"><Checkbox disabled>封</Checkbox><Checkbox disabled>蓬</Checkbox></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                  <Col span="6">
                  </Col>
                </Row>
                <Row>
                  <Col span="6">
                    <FormItem label="防冻用量"></FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="标准记事"></FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="6">
                    <FormItem label="承运人记事"></FormItem>
                  </Col>
                  <Col span="6">
                    <Button type="default" disabled>增加记事</Button>
                  </Col>
                  <Col span="6">
                    <Button type="default" disabled>物品清单</Button>
                  </Col>
                  <Col span="6">
                    <Button type="default" disabled>超限超重</Button>
                  </Col>
                </Row>
                <FormItem :label-width="0" prop="carrierNote">
                  <Input v-model="dt41.carrierNote" type="textarea" :rows="2"  :disabled="dt41disabled"/>
                </FormItem>
              </Form>
            </Card>
          </Col>
        </Row>
      </Card>
      <Card>
        <p slot="title">卸车</p>
        <Row>
          <Col span="12">
            <Card>
              <p slot="title">卸车前三检</p>
              <Form ref="dt3Form" :model="dt32" :rules="dt32rules" :label-width="80" :show-message="false" class="qib-form">
                <FormItem label="车型" prop="carVersion">
                  <Input size="small" type="text" v-model="dt32.carVersion" readonly :disabled="dt32disabled"></Input>
                </FormItem>
                <FormItem label="车号" prop="carCard">
                  <Input size="small" type="text" v-model="dt32.carCard" readonly :disabled="dt32disabled"></Input>
                </FormItem>
                <FormItem label="施封篷布号" prop="carCard">
                  <Input size="small" type="text" v-model="dt32.carCard" readonly :disabled="dt32disabled"></Input>
                </FormItem>
                <FormItem label="发站" prop="station">
                  <Input size="small" type="text" v-model="dt32.station" readonly :disabled="dt32disabled"></Input>
                </FormItem>
                <FormItem label="货位" prop="bglID">
                  <Input size="small" type="text" v-model="dt32.bglID" :disabled="dt32disabled"></Input>
                </FormItem>
                <FormItem>
                  <Checkbox disabled>综合货拉</Checkbox>
                  <Checkbox disabled>多货拉</Checkbox>
                </FormItem>
              </Form>
            </Card>
          </Col>
          <Col span="12">
            <Card>
              <p slot="title">卸车后三检</p>
              <Form ref="dt4Form" :model="dt42" :rules="dt42rules" :label-width="80" :show-message="false" class="qib-form">
                <Row>
                  <Col span="6">
                    <FormItem label="品名"></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="重量"></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="件数"></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="体积"></FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="6">
                    <FormItem prop="gname" :label-width="0"><Input size="small" type="text" v-model="dt42.gname" disabled></Input></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem prop="caseNum" :label-width="0"><Input size="small" type="text" v-model="dt42.caseNum" disabled></Input></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem prop="tunnage" :label-width="0"><Input size="small" type="text" v-model="dt42.tunnage" disabled></Input></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="6">
                    <FormItem label="合计"></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem :label-width="0"><Input size="small" type="text" disabled></Input></FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="8">
                    <FormItem label="货物记录" :label-width="64"><Checkbox disabled>是</Checkbox></FormItem>
                  </Col>
                  <Col span="16">
                    <Button type="default" disabled>物品清单</Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </Card>

      <!--提交时加载动画-->
      <Spin size="large" fix v-if="loading"></Spin>

      <div slot="footer">
        <div>
          <Button type="primary" @click="doSubmit">确定</Button>
          <Button @click="doCancel">关闭</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  bg3CheckLoad,
  ed3CheckLoad,
  bg3CheckUnLoad,
  ed3CheckUnLoad
} from '@/api/freight.data'
export default {
  name: 'work-1-set-34-form',
  data () {
    return {
      loading: false,
      editable: false,
      currType: '',
      dt31: {
        axleNum: '',
        carVersion: '',
        carCard: '',
        wbID: '',
        bglID: '',
        sites: '',
        tunnage: ''
      },
      dt31rules: {

      },
      dt31disabled: true,
      dt41: {
        wbID: '',
        carrierNote: '',
        gname: '',
        caseNum: '',
        tunnage: ''
      },
      dt41rules: {
      },
      dt41disabled: true,
      dt32: {
        carVersion: '',
        carCard: '',
        wbID: '',
        bglID: '',
        sites: null,
        station: '',
        astation: ''
      },
      dt32rules: {

      },
      dt32disabled: true,
      dt42: {
        wbID: '',
        gname: '',
        caseNum: '',
        tunnage: ''
      },
      dt42rules: {

      },
      dt42disabled: true
    }
  },
  mounted: function () {
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
    show (item, type) {
      console.log(item, type)
      this.editable = true
      if (item.receptType === 1) {
        this.dt32 = this.dt42 = {}
        this.dt32disabled = this.dt42disabled = true
        if (type === 3) {
          this.currType = 31
          this.dt31disabled = false
          this.dt31 = {
            axleNum: item.axleNum,
            carVersion: item.carVersion,
            carCard: item.carCard,
            wbID: item.wbID,
            bglID: item.bglID,
            sites: item.sites,
            tunnage: item.tunnage
          }
        } else {
          this.dt31disabled = true
        }
        if (type === 4) {
          this.currType = 41
          this.dt41disabled = false
          this.dt41 = {
            wbID: item.wbID,
            carrierNote: '',
            gname: item.gname,
            caseNum: item.caseNum,
            tunnage: item.tunnage
          }
        } else {
          this.dt41disabled = true
        }
      } else {
        this.dt31 = this.dt41 = {}
        this.dt31disabled = this.dt41disabled = true
        if (type === 3) {
          this.currType = 32
          this.dt32disabled = false
          this.dt32 = {
            carVersion: item.carVersion,
            carCard: item.carCard,
            wbID: item.wbID,
            bglID: item.bglID,
            sites: item.sites,
            station: item.station,
            astation: item.astation
          }
        } else {
          this.dt32disabled = true
        }
        if (type === 4) {
          this.currType = 42
          this.dt42disabled = false
          this.dt42 = {
            wbID: item.wbID,
            carrierNote: '',
            gname: item.gname,
            caseNum: item.caseNum,
            tunnage: item.tunnage
          }
        } else {
          this.dt42disabled = true
        }
      }
    },
    doSubmit () {
      // bg3CheckLoad,
      // ed3CheckLoad,
      // bg3CheckUnLoad,
      // ed3CheckUnLoad
      const UUID = this.getUserId
      const compyId = this.getCompyId
      if (this.currType === 31) {
        let params = { UUID, compyId, ...this.dt31 }
        bg3CheckLoad(params).then(res => {
          this.resultHandler(res)
        })
      }

      if (this.currType === 41) {
        let params = { UUID, compyId, ...this.dt41 }
        ed3CheckLoad(params).then(res => {
          this.resultHandler(res)
        })
      }

      if (this.currType === 32) {
        let params = { UUID, compyId, ...this.dt32 }
        // let wbID = this.dt32.wbID
        // let params = { UUID, compyId, wbID }
        bg3CheckUnLoad(params).then(res => {
          this.resultHandler(res)
        })
      }

      if (this.currType === 42) {
        let params = { UUID, compyId, ...this.dt42 }
        ed3CheckUnLoad(params).then(res => {
          this.resultHandler(res)
        })
      }
    },
    resultHandler (res) {
      const body = res.data
      const data = body.Data
      if (body.Status === 2000) {
        this.$Message.success(data.Result)
        this.$emit('handleFormSubmit')
        this.doCancel()
      } else {
        this.$Message.error(data.ErrorDes)
      }
    },
    getEditableChange (enable) {
      this.editable = enable
    },
    doCancel () {
      this.editable = !this.editable
    }
  }
}
</script>

<style scoped>

</style>
