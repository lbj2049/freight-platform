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
                <Input size="small" type="date" v-model="ticket.date" placeholder="Enter something..."></Input>
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
                <Input size="small" type="date" v-model="ticket.date" placeholder="Enter something..."></Input>
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

      <Modal v-model="ticketSearchModel" title="票据查询" width="800" :footer-hide="true">
        <Form ref="ts" :model="ts" :show-message="false" :label-width="72" class="qib-form">
          <Row>
            <Col span="6">
              <FormItem label="票据类型" prop="msg">
                <RadioGroup v-model="ts.msg">
                  <Radio label="运单"></Radio>
                  <Radio label="货单"></Radio>
                  <Radio label="出站单"></Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="运输方式" prop="msg">
                <RadioGroup v-model="ts.msg">
                  <Radio label="整车"></Radio>
                  <Radio label="零担"></Radio>
                  <Radio label="集装箱"></Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="提报日期" prop="date">
                <DatePicker size="small" type="date" v-model="ts.date" placeholder="请选择提报日期"></DatePicker>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem :label-width="15">
                <Button size="small" type="primary" @click="handleSearchPosition('ts')">查询</Button>
                <Button size="small" @click="handleSearchReset('ts')" style="margin-left: 8px">重置</Button>
                <Button size="small" type="primary" @click="handleGetPosition('ts')" style="margin-left: 8px">取货票</Button>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="6">
              <FormItem label="托运人" prop="name">
                <Input size="small" v-model="ts.name" placeholder="Enter something..."></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="收货人" prop="name">
                <Input size="small" v-model="ts.name" placeholder="Enter something..."></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="处理状态" prop="city">
                <Select size="small" v-model="ts.city" placeholder="Select your city">
                  <Option value="beijing">通知进货</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
            </Col>
          </Row>

          <Row>
            <Col span="6">
              <FormItem label="票据号" prop="name">
                <Input size="small" v-model="ts.name" placeholder="Enter something..."></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="发站" prop="name">
                <Input size="small" v-model="ts.name" placeholder="Enter something..."></Input>
              </FormItem>
            </Col>
            <Col span="6">
            </Col>
            <Col span="6">
            </Col>
          </Row>
        </Form>
        <Table ref="tsRowTable" border :columns="tscols" :data="tsrs" @on-current-change="getCurrentData" size="small" highlight-row></Table>
      </Modal>

      <Modal v-model="positionSelectModel" title="选择货位" width="800" @on-ok="positionSelectOk" @on-cancel="positionSelectCancel">
        <Row :gutter="6">
          <Col span="3">
            <div class="position-col">
              <div class="position-body">
                <Row :gutter="1">
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                </Row>
                <Row :gutter="1">
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                </Row>
                <Row :gutter="1">
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                </Row>
              </div>
              <div class="position-title">1门1货位 空</div>
            </div>
          </Col>
          <Col span="3">
            <div class="position-col">
              <div class="position-body">
                <Row :gutter="1">
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                </Row>
                <Row :gutter="1">
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                </Row>
                <Row :gutter="1">
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                </Row>
              </div>
              <div class="position-title">1门1货位 空</div>
            </div>
          </Col>
          <Col span="3">
            <div class="position-col">
              <div class="position-body">
                <Row :gutter="1">
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                </Row>
                <Row :gutter="1">
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                </Row>
                <Row :gutter="1">
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                </Row>
              </div>
              <div class="position-title">1门1货位 空</div>
            </div>
          </Col>
          <Col span="3">
            <div class="position-col">
              <div class="position-body">
                <Row :gutter="1">
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                </Row>
                <Row :gutter="1">
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                </Row>
                <Row :gutter="1">
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                </Row>
              </div>
              <div class="position-title">1门1货位 空</div>
            </div>
          </Col>
          <Col span="3">
            <div class="position-col">
              <div class="position-body">
                <Row :gutter="1">
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                </Row>
                <Row :gutter="1">
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                </Row>
                <Row :gutter="1">
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                </Row>
              </div>
              <div class="position-title">1门1货位 空</div>
            </div>
          </Col>
          <Col span="3">
            <div class="position-col">
              <div class="position-body">
                <Row :gutter="1">
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                </Row>
                <Row :gutter="1">
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                </Row>
                <Row :gutter="1">
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                </Row>
              </div>
              <div class="position-title">1门1货位 空</div>
            </div>
          </Col>
          <Col span="3">
            <div class="position-col">
              <div class="position-body">
                <Row :gutter="1">
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                </Row>
                <Row :gutter="1">
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                </Row>
                <Row :gutter="1">
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                </Row>
              </div>
              <div class="position-title">1门1货位 空</div>
            </div>
          </Col>
          <Col span="3">
            <div class="position-col">
              <div class="position-body">
                <Row :gutter="1">
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                </Row>
                <Row :gutter="1">
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                </Row>
                <Row :gutter="1">
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                  <Col span="8"><div class="position-cell"></div></Col>
                </Row>
              </div>
              <div class="position-title">1门1货位 空</div>
            </div>
          </Col>

          <Col span="3" v-for="ps in psrs">
            <div class="position-col">
              <div class="position-body">
                <Row :gutter="1">
                  <Col span="8" v-for="lv in ps.ls"><div class="position-cell" v-bind:class="{'position-cell-1': lv.status === 1, 'position-cell-2': lv.status === 2, 'position-cell-3': lv.status === 3, 'position-cell-4': lv.status === 4}"></div></Col>
                  <!--<Col span="8"><div class="position-cell position-cell-1"></div></Col>-->
                  <!--<Col span="8"><div class="position-cell position-cell-1"></div></Col>-->
                  <!--<Col span="8"><div class="position-cell position-cell-1"></div></Col>-->
                  <!--<Col span="8"><div class="position-cell"></div></Col>-->
                  <!--<Col span="8"><div class="position-cell position-cell-1"></div></Col>-->
                  <!--<Col span="8"><div class="position-cell position-cell-1"></div></Col>-->
                  <!--<Col span="8"><div class="position-cell position-cell-1"></div></Col>-->
                  <!--<Col span="8"><div class="position-cell position-cell-1"></div></Col>-->
                </Row>
              </div>
              <div class="position-title">{{ps.door}}门{{ps.pos}}货位 {{ps.full}}</div>
            </div>
          </Col>
        </Row>
      </Modal>

  </div>
</template>
<style>
  .position-col {
    border: 1px #bfd2e6 solid;
    margin-bottom: 5px;
  }
  .position-body {
    padding: 2px 4px;

  }
  .position-title {
    /*height: 12px;*/
    padding: 2px;
    text-align: center;
    border-top: 1px #bfd2e6 solid;
  }
  .position-cell {
    /*border: 1px #bfd2e6 dashed;*/
    height: 24px;
  }
  .position-cell-1 {
    border: 1px #bfd2e6 dashed;
  }
  .position-cell-2 {
    border: 1px #F5CBD1 dashed;
  }
  .position-cell-3 {
    border: 1px #e6584a dashed;
  }
  .position-cell-4 {
    border: 1px #e676cc dashed;
  }

</style>
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
      ticketTmp: {
      },
      ts: {
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
      tscols: [
        { type: 'index', width: 38, align: 'center' },
        // { type: 'selection', width: 45, align: 'center' },
        {
          key: 'name', combine: true, title: '运单号'
        },
        {
          key: 'date', combine: true, title: '货主提报日期'
        }
      ],
      tsrs: [
        {
          name: 'a1',
          mail: '1@1.1',
          city: 'bj',
          gender: '1',
          interest: [1],
          msg: 1,
          date: '2019-01-01',
          time: '08:08:08',
          desc: 'test'
        },
        {
          name: 'a2',
          mail: '1@1.1',
          city: 'bj',
          gender: '1',
          interest: [1],
          msg: 1,
          date: '2019-01-01',
          time: '08:08:08',
          desc: 'test'
        },
        {
          name: 'a3',
          mail: '1@1.1',
          city: 'bj',
          gender: '1',
          interest: [1],
          msg: 1,
          date: '2019-01-01',
          time: '08:08:08',
          desc: 'test'
        }
      ],
      psrs: [
        {
          door: 1,
          pos: 1,
          full: 0,
          ls: [
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 0, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            }
          ]
        },
        {
          door: 1,
          pos: 2,
          full: 0,
          ls: [
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 0, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            }
          ]
        },
        {
          door: 1,
          pos: 3,
          full: 0,
          ls: [
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 2, hn: ''
            },
            {
              full: 0, status: 3, hn: ''
            },
            {
              full: 0, status: 4, hn: ''
            },
            {
              full: 0, status: 0, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 2, hn: ''
            },
            {
              full: 0, status: 3, hn: ''
            },
            {
              full: 0, status: 4, hn: ''
            }
          ]
        },
        {
          door: 1,
          pos: 4,
          full: 0,
          ls: [
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 2, hn: ''
            },
            {
              full: 0, status: 3, hn: ''
            },
            {
              full: 0, status: 4, hn: ''
            },
            {
              full: 0, status: 0, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 2, hn: ''
            },
            {
              full: 0, status: 3, hn: ''
            },
            {
              full: 0, status: 4, hn: ''
            }
          ]
        },
        {
          door: 2,
          pos: 1,
          full: 0,
          ls: [
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 0, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            }
          ]
        },
        {
          door: 2,
          pos: 2,
          full: 0,
          ls: [
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 0, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            }
          ]
        },
        {
          door: 2,
          pos: 3,
          full: 0,
          ls: [
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 0, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            }
          ]
        },
        {
          door: 2,
          pos: 4,
          full: 0,
          ls: [
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 0, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            }
          ]
        },
        {
          door: 3,
          pos: 1,
          full: 0,
          ls: [
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 0, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            }
          ]
        },
        {
          door: 3,
          pos: 2,
          full: 0,
          ls: [
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 0, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            },
            {
              full: 0, status: 1, hn: ''
            }
          ]
        },
        {
          door: 3,
          pos: 3,
          full: 0,
          ls: [
            {
              full: 1, status: 1, hn: '大豆'
            },
            {
              full: 1, status: 1, hn: '大豆'
            },
            {
              full: 1, status: 1, hn: '大豆'
            },
            {
              full: 1, status: 1, hn: '大豆'
            },
            {
              full: 0, status: 0, hn: ''
            },
            {
              full: 1, status: 1, hn: '大豆'
            },
            {
              full: 1, status: 1, hn: '大豆'
            },
            {
              full: 1, status: 1, hn: '大豆'
            },
            {
              full: 1, status: 1, hn: '大豆'
            }
          ]
        }
        /*,
        {
          door: 3,
          pos: 4,
          full: 1,
          status: 1,
          hn: '大豆'
        }
        */
      ],
      rules: {
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$emit('handleFormSubmit', this.transit)
      this.$Message.success('Success!')
      /*
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('handleFormSubmit', this.transit)
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
      */
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
    handleSearchPosition () {
      this.tsrs = [
        {
          name: 'b1',
          mail: '1@1.1',
          city: 'bj',
          gender: '1',
          interest: [1],
          msg: 1,
          date: '2019-01-01',
          time: '08:08:08',
          desc: 'test'
        },
        {
          name: 'b2',
          mail: '1@1.1',
          city: 'bj',
          gender: '1',
          interest: [1],
          msg: 1,
          date: '2019-01-01',
          time: '08:08:08',
          desc: 'test'
        },
        {
          name: 'b3',
          mail: '1@1.1',
          city: 'bj',
          gender: '1',
          interest: [1],
          msg: 1,
          date: '2019-01-01',
          time: '08:08:08',
          desc: 'test'
        }
      ]
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
    },
    getCurrentData (data) {
      this.ticketTmp = data
    },
    verifyOk () {

    },
    verifyCancel () {

    },
    positionSelectOk () {

    },
    positionSelectCancel () {

    }
  }
}
</script>
