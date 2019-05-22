<template>
  <div>
    <Modal :value="editable" :mask-closable="false" :styles="{top: '16%'}" width="880" @on-visible-change="getEditableChange" class="work-form-modal">

      <Card :padding="0" :dis-hover="true">
        <p slot="title">装车</p>
        <Row>
          <Col span="12">
            <Card>
              <p slot="title">装车前三检</p>
              <Form ref="dt3Form" :model="dt3" :rules="dt3rules" :label-width="80" :show-message="false" class="qib-form">
                <FormItem label="车辆状态">
                  <Checkbox disabled>良好</Checkbox>
                </FormItem>
                <FormItem label="轴数" prop="axleNum">
                  <Input size="small" type="text" v-model="dt3.axleNum" readonly :disabled="dt3disabled"></Input>
                </FormItem>
                <FormItem label="车型" prop="carVersion">
                  <Input size="small" type="text" v-model="dt3.carVersion" readonly :disabled="dt3disabled"></Input>
                </FormItem>
                <FormItem label="车号" prop="carCard">
                  <Input size="small" type="text" v-model="dt3.carCard" readonly :disabled="dt3disabled"></Input>
                </FormItem>
                <FormItem label="标重" prop="tunnage">
                  <Input size="small" type="text" v-model="dt3.tunnage" :disabled="dt3disabled"></Input>
                </FormItem>
                <FormItem label="货位" prop="bglID">
                  <Input size="small" type="text" v-model="dt3.bglID" readonly :disabled="dt3disabled"></Input>
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
              <Form ref="dt4Form" :model="dt4" :rules="dt4rules" :label-width="80" :show-message="false" class="qib-form">
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
                  <Input v-model="dt4.carrierNote" type="textarea" :rows="2"  :disabled="dt4disabled"/>
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
              <Form ref="dt3Form" :model="dt5" :rules="dt5rules" :label-width="80" :show-message="false" class="qib-form">
                <FormItem label="车型" prop="carVersion">
                  <Input size="small" type="text" v-model="dt5.carVersion" readonly :disabled="dt5disabled"></Input>
                </FormItem>
                <FormItem label="车号" prop="carCard">
                  <Input size="small" type="text" v-model="dt5.carCard" readonly :disabled="dt5disabled"></Input>
                </FormItem>
                <FormItem label="施封篷布号" prop="carCard">
                  <Input size="small" type="text" v-model="dt5.carCard" readonly :disabled="dt5disabled"></Input>
                </FormItem>
                <FormItem label="发站" prop="station">
                  <Input size="small" type="text" v-model="dt5.station" readonly :disabled="dt5disabled"></Input>
                </FormItem>
                <FormItem label="货位" prop="bglID">
                  <Input size="small" type="text" v-model="dt5.bglID" readonly :disabled="dt5disabled"></Input>
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
              <Form ref="dt4Form" :model="dt6" :rules="dt6rules" :label-width="80" :show-message="false" class="qib-form">
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
      dt3: {
        axleNum: '',
        carVersion: '',
        carCard: '',
        wbID: '',
        bglID: '',
        sites: '',
        tunnage: ''
      },
      dt3rules: {

      },
      dt3disabled: true,
      dt4: {
        wbID: '',
        carrierNote: ''
      },
      dt4rules: {

      },
      dt4disabled: true,
      dt5: {
        carVersion: '',
        carCard: '',
        wbID: '',
        bglID: '',
        sites: null,
        station: '',
        astation: ''
      },
      dt5rules: {

      },
      dt5disabled: true,
      dt6: {
        wbID: ''
      },
      dt6rules: {

      },
      dt6disabled: true
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
      this.currType = type
      if (type === 3) {
        this.dt3disabled = false
        this.dt3 = {
          axleNum: item.axleNum,
          carVersion: item.carVersion,
          carCard: item.carCard,
          wbID: item.wbID,
          bglID: item.bglID,
          sites: item.sites,
          tunnage: item.tunnage
        }
      } else {
        this.dt3disabled = true
      }
      if (type === 4) {
        this.dt4disabled = false
        this.dt4 = {
          wbID: item.wbID,
          carrierNote: ''
        }
      } else {
        this.dt4disabled = true
      }
      if (type === 5) {
        this.dt5disabled = false
        this.dt5 = {
          carVersion: item.carVersion,
          carCard: item.carCard,
          wbID: item.wbID,
          bglID: item.bglID,
          sites: item.sites
        }
      } else {
        this.dt5disabled = true
      }
      if (type === 6) {
        this.dt6disabled = false
        this.dt6 = {
          wbID: item.wbID
        }
      } else {
        this.dt6disabled = true
      }
    },
    doSubmit () {
      // bg3CheckLoad,
      // ed3CheckLoad,
      // bg3CheckUnLoad,
      // ed3CheckUnLoad
      const UUID = this.getUserId
      const compyId = this.getCompyId
      if (this.currType === 3) {
        let params = { UUID, compyId, ...this.dt3 }
        bg3CheckLoad(params).then(res => {
          this.resultHandler(res)
        })
      }

      if (this.currType === 4) {
        let params = { UUID, compyId, ...this.dt4 }
        ed3CheckLoad(params).then(res => {
          this.resultHandler(res)
        })
      }

      if (this.currType === 5) {
        let params = { UUID, compyId, ...this.dt5 }
        bg3CheckUnLoad(params).then(res => {
          this.resultHandler(res)
        })
      }

      if (this.currType === 6) {
        let params = { UUID, compyId, ...this.dt6 }
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
