<template>
  <div style=" height:350px; overflow:auto">
      <Form ref="demand" :model="demand" :rules="rules" :label-width="88" :show-message="false" class="qib-form">

        <Row>
          <Col span="2">
            <label class="ivu-form-item-label">客户信息</label>
          </Col>
          <Col span="22">
            <Row>
              <Col span="8">
                <FormItem label="所属企业" prop="mail">
                  <Input size="small" v-model="demand.mail" placeholder="请输入所属企业"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="所属客户" prop="mail">
                  <Input size="small" v-model="demand.mail" placeholder="请输入所属客户"></Input>
                </FormItem>
              </Col>
              <Col span="8">
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col span="2">
            <label class="ivu-form-item-label">交易合同</label>
          </Col>
          <Col span="22">
            <Row>
              <Col span="8">
                <FormItem label="合同号" prop="mail">
                  <Input size="small" v-model="demand.mail" placeholder="请输入合同号"></Input>
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
                <FormItem label="托运人名称" prop="mail">
                  <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="发站" prop="city">
                  <Select size="small" v-model="demand.city" placeholder="Select your city">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="发局" prop="mail">
                  <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="装车地点" prop="mail">
                  <Select size="small" v-model="demand.city" placeholder="Select your city">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="移动电话" prop="mail">
                  <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="经办人" prop="mail">
                  <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="身份证" prop="city">
                  <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="手机" prop="mail">
                  <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="通讯地址" prop="mail">
                  <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
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
                <FormItem label="货物名称" prop="mail">
                  <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
              </Col>
              <Col span="16">
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
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="货物包装" prop="mail">
                  <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="最大单件重量" prop="city" :label-width="98">
                  <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"><span slot="append">(kg)</span></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="货区货位" prop="mail">
                  <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
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
            <label class="ivu-form-item-label">记载事项</label>
          </Col>
          <Col span="22">
            <FormItem label="记载事项" prop="desc">
              <Input v-model="demand.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="2">
            <label class="ivu-form-item-label">收货信息</label>
          </Col>
          <Col span="22">
            <Row>
              <Col span="8">
                <FormItem label="经办人" prop="mail">
                  <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="身份证" prop="city">
                  <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="手机" prop="mail">
                  <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col span="2">
            <label class="ivu-form-item-label">记载事项</label>
          </Col>
          <Col span="22">
            <FormItem label="记载事项" prop="desc">
              <Input v-model="demand.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="2">
            <label class="ivu-form-item-label">运输信息</label>
          </Col>
          <Col span="22">
            <Row>
              <Col span="4">
                <FormItem label="吨数" prop="mail">
                  <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
              </Col>
              <Col span="4">
                <FormItem label="车种" prop="city">
                  <Select size="small" v-model="demand.city" placeholder="Select your city">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="4">
                <FormItem label="车数" prop="mail">
                  <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <Row>
                  <Col span="6">
                    <FormItem label="装载加固材料" prop="msg">
                      <Checkbox v-model="demand.msg"></Checkbox>
                    </FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="保价运输" prop="msg">
                      <Checkbox v-model="demand.msg"></Checkbox>
                    </FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="仓储" prop="msg">
                      <Checkbox v-model="demand.msg"></Checkbox>
                    </FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="冷藏(保温)" prop="msg">
                      <Checkbox v-model="demand.msg"></Checkbox>
                    </FormItem>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col span="2">
            <label class="ivu-form-item-label">物流服务</label>
          </Col>
          <Col span="22">
            <Row>
              <Col span="6">
                <FormItem prop="interest">
                  <CheckboxGroup v-model="demand.interest">
                    <Checkbox label="门到站"></Checkbox>
                    <Checkbox label="站到门"></Checkbox>
                  </CheckboxGroup>
                </FormItem>
              </Col>
              <Col span="18">
                <FormItem :label-width="0">
                  （可根据您的需求，选择录入发到站截取、送达、仓储等物流服务信息）
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>

        <Divider />
        <FormItem>
          <Button disabled style="float: left">零散货物快运提报</Button>
          <Button type="primary" :loading="loading" @click="handleSubmit('demand')" style="margin-left: 8px">保存</Button>
          <Button @click="handleReset('demand')" style="margin-left: 8px">清空</Button>
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
    }
  },
  data () {
    return {
      demand: {
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
        name: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' }
        ],
        city: [
          { required: true, message: 'Please select the city', trigger: 'change' }
        ],
        gender: [
          { required: true, message: 'Please select gender', trigger: 'change' }
        ],
        interest: [
          { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
          { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
        ],
        date: [
          { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
        ],
        time: [
          { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
        ],
        desc: [
          { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
          { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
