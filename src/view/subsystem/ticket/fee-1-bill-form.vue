<template>
  <div>
    <Form ref="search" :model="search" :rules="rules" :label-width="92" :show-message="false" class="qib-form">
      <Row>
        <Col span="24">
          <Row>
            <Col span="6">
              <FormItem label="号码" prop="mail">
                <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
              <FormItem label="需求单号码" prop="mail">
                <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <div style="width: 100%; text-align: center; font-size: 24px; padding-top: 12px;">铁路局整车运单</div>
            </Col>
            <Col span="6">
              <FormItem label="工作日期" prop="mail">
                <Input disabled size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
              <FormItem label="运单号码" prop="mail">
                <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
          </Row>
        </Col>
        <Col span="24">
          <Row>
            <Col span="6">
              <FormItem label="发站" prop="mail">
                <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="经由" prop="mail">
                <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem label="运到期限" prop="mail" :label-width="72">
                <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem label="车种车号" prop="mail" :label-width="72">
                <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem label="货区" prop="mail" :label-width="54">
                <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem label="标重" prop="mail" :label-width="54">
                <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
          </Row>
        </Col>
        <Col span="24">
          <Row>
            <Col span="6">
              <FormItem label="到站" prop="city">
                <Select size="small" v-model="search.city" placeholder="Select your city">
                  <Option value="beijing">New York</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="9">
              <FormItem label="运价里程" prop="mail">
                <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem label="施封号码" prop="mail" :label-width="72">
                <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem label="货位" prop="mail" :label-width="54">
                <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem label="承运人装车">
              </FormItem>
            </Col>
          </Row>
        </Col>
        <Col span="24">
          <Row>
            <Col span="15">
              <FormItem label="发站专用线" prop="mail">
                <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem label="集装箱型" prop="city" :label-width="72">
                <Select size="small" v-model="search.city" placeholder="Select your city">
                  <Option value="beijing">New York</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem label="">
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem prop="mail" :label-width="20">
                <Checkbox v-model="search.mail">标准价率测算</Checkbox>
              </FormItem>
            </Col>
          </Row>
        </Col>
        <Col span="24">
          <Row>
            <Col span="15">
              <FormItem label="到站专用线" prop="mail">
                <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem label="服务内容" prop="city" :label-width="72">
                <Select size="small" v-model="search.city" placeholder="Select your city">
                  <Option value="beijing">New York</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem label="">
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem label="">
              </FormItem>
            </Col>
          </Row>
        </Col>
        <Col span="24">
          <Row>
            <Col span="18">
              <Row>
                <Col span="1">
                  <FormItem label="托运人" :label-width="72">
                  </FormItem>
                </Col>
                <Col span="23">
                  <Row>
                    <Col span="18">
                      <FormItem label="名称" prop="mail">
                        <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="经办人" prop="mail">
                        <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="14">
                      <FormItem label="地址" prop="mail">
                        <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
                      </FormItem>
                    </Col>
                    <Col span="4">
                      <FormItem label="邮编" prop="mail">
                        <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="电话" prop="mail">
                        <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="10">
                      <FormItem label="取货地址" prop="mail">
                        <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
                      </FormItem>
                    </Col>
                    <Col span="4">
                      <FormItem label="里程" prop="mail">
                        <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
                      </FormItem>
                    </Col>
                    <Col span="4">
                      <FormItem label="联系人" prop="mail">
                        <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="电话" prop="mail">
                        <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
                      </FormItem>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span="1">
                  <FormItem label="收货人" :label-width="72">
                  </FormItem>
                </Col>
                <Col span="23">
                  <Row>
                    <Col span="18">
                      <FormItem label="名称" prop="mail">
                        <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="经办人" prop="mail">
                        <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="14">
                      <FormItem label="地址" prop="mail">
                        <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
                      </FormItem>
                    </Col>
                    <Col span="4">
                      <FormItem label="邮编" prop="mail">
                        <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="电话" prop="mail">
                        <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="10">
                      <FormItem label="取货地址" prop="mail">
                        <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
                      </FormItem>
                    </Col>
                    <Col span="4">
                      <FormItem label="里程" prop="mail">
                        <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
                      </FormItem>
                    </Col>
                    <Col span="4">
                      <FormItem label="联系人" prop="mail">
                        <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="电话" prop="mail">
                        <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
                      </FormItem>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col span="24">
                  <div style="padding-left: 20px; padding-bottom: 10px;">
                    <Table size="small" height="250" stripe :columns="columns" :data="list"></Table>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col span="12">
                  <FormItem label="" prop="mail" :label-width="20">
                    <Input v-model="search.mail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="" prop="mail" :label-width="20">
                    <Input v-model="search.mail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col span="6">
              <Row>
                <Col span="24">
                  <FormItem label="付费方式" prop="city">
                    <Select size="small" v-model="search.city" placeholder="Select your city">
                      <Option value="beijing">New York</Option>
                      <Option value="shanghai">London</Option>
                      <Option value="shenzhen">Sydney</Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem label="领取方式" prop="city">
                    <CheckboxGroup v-model="search.interest">
                      <Checkbox label="电子领货"></Checkbox>
                      <Checkbox label="纸质领货"></Checkbox>
                    </CheckboxGroup>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <div style="padding-left: 20px; padding-bottom: 10px;">
                    <Table size="small" height="398" stripe :columns="columns" :data="list"></Table>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem label="发票合计" prop="mail">
                    <Input v-model="search.mail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                  </FormItem>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <div style="text-align: center">
            <FormItem :label-width="0">
              <Button type="primary" :loading="loading" @click="handleWrite('search')" style="margin-left: 8px">记事</Button>
              <Button type="primary" :loading="loading" @click="handleFee('search')" style="margin-left: 8px">计费</Button>
            </FormItem>
          </div>
        </Col>
      </Row>
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
    }
  },
  data () {
    return {
      search: {
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
      },
      list: [
        {
          key1: 'aaa',
          key2: 'bbb',
          key3: 'ccc'
        },
        {
          key1: 'aaa',
          key2: 'bbb',
          key3: 'ccc'
        },
        {
          key1: '111',
          key2: '222',
          key3: '333'
        },
        {
          key1: '111',
          key2: '222',
          key3: '333'
        },
        {
          key1: '111',
          key2: '222',
          key3: '333'
        },
        {
          key1: '111',
          key2: '222',
          key3: '333'
        },
        {
          key1: '111',
          key2: '222',
          key3: '333'
        },
        {
          key1: '111',
          key2: '222',
          key3: '333'
        },
        {
          key1: '111',
          key2: '222',
          key3: '333'
        }
      ],
      columns: [
        { type: 'index', width: 38, align: 'center' },
        // { type: 'selection', width: 45, align: 'center' },
        {
          key: 'key1', combine: true, title: '托运信息'
        },
        {
          key: 'key1', combine: true, title: '搬运日期'
        }
      ]
    }
  },
  methods: {
    handleWrite (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('handleWrite', this.search)
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleFee () {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('handleFee', this.search)
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>
