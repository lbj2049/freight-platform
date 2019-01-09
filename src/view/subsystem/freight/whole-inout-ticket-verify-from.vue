<template>
  <div>
      <Form ref="transit" :model="transit" :rules="rules" :show-message="false" class="qib-form">
          <FormItem prop="mail" label="股道" :label-width="40">
            <Select size="small" v-model="transit.city" placeholder="Select your option">
              <Option value="">全部</Option>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
            </Select>
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
          <FormItem label="票据号">
            <Input size="small" v-model="ticket.name" placeholder="Enter something...">
              <Button slot="append" @click="handleSelectTicket">选择</Button>
            </Input>
          </FormItem>
          <Divider orientation="left" class="divider">整车进出货信息</Divider>
          <FormItem label="托运人">
            <Input size="small" v-model="ticket.name" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="收货人">
            <Input size="small" v-model="ticket.name" placeholder="Enter something..."></Input>
          </FormItem>
          <Row>
            <Col span="12">
              <FormItem label="品名">
                <Input size="small" v-model="ticket.name" placeholder="Enter something..."></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="货重">
                <Input size="small" v-model="ticket.name" placeholder="Enter something..."></Input>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <FormItem label="发站">
                <Input size="small" v-model="ticket.name" placeholder="Enter something..."></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="到站">
                <Input size="small" v-model="ticket.name" placeholder="Enter something..."></Input>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <FormItem label="汽车号码">
                <Input size="small" v-model="ticket.name" placeholder="Enter something..."></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="预约日期">
                <Input size="small" v-model="ticket.name" placeholder="Enter something..."></Input>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <FormItem label="进门重量">
                <Input size="small" v-model="ticket.name" placeholder="Enter something..."></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="有效日期">
                <Input size="small" v-model="ticket.name" placeholder="Enter something..."></Input>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <FormItem label="需求号">
                <Input size="small" v-model="ticket.name" placeholder="Enter something..."></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="股道简称">
                <Select size="small" v-model="ticket.city" placeholder="Select your city">
                  <Option value="beijing">New York</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="货区货位">
                <Input size="small" v-model="ticket.name" placeholder="Enter something..."></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <Row>
                <Col span="10">
                  <FormItem :label-width="12">
                    <Checkbox v-model="ticket.msg">综合货位</Checkbox>
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

      <Modal v-model="ticketSearchModel" title="票据查询" @on-ok="ticketSearchOk" @on-cancel="ticketSearchCancel">

      </Modal>

      <Modal v-model="positionSelectModel" title="选择货位" @on-ok="positionSelectOk" @on-cancel="positionSelectCancel">

      </Modal>

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
      verifyFormModel: false,
      ticketSearchModel: false,
      positionSelectModel: false,
      transit: {
        mail: ''
      },
      ticket: {
        name: '',
        mail: '',
        city: '',
        gender: '',
        interest: [],
        msg: 1,
        date: '',
        time: '',
        desc: ''
      },
      rules: {
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('handleFormSubmit', this.transit)
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleTicketVerify () {
      this.$emit('handleTicketVerify')
      this.verifyFormModel = true
    },
    handleSelectTicket () {
      console.log('handleSelectTicket')
      this.ticketSearchModel = true
    },
    handleSelectPosition () {
      console.log('handleSelectPosition')
      this.positionSelectModel = true
    },
    verifyOk () {

    },
    verifyCancel () {

    },
    ticketSearchOk () {

    },
    ticketSearchCancel () {

    },
    positionSelectOk () {

    },
    positionSelectCancel () {

    }
  }
}
</script>
