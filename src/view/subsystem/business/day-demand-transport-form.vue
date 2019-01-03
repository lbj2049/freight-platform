<template>
  <div  style=" height:350px; overflow:auto">
      <Form ref="demand" :model="demand" :rules="rules" :label-width="88" :show-message="false" class="qib-form">

        <Row>
          <Col span="2">
            <label class="ivu-form-item-label">基本信息</label>
          </Col>
          <Col span="22">
            <Row>
              <Col span="8">
                <FormItem label="预约号" prop="mail">
                  <Input size="small" v-model="demand.mail" placeholder="请输入预约号"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="装运日期" prop="mail">
                  <DatePicker size="small" type="date" placeholder="请选择装运日期" v-model="demand.date"></DatePicker>
                </FormItem>
              </Col>
              <Col span="8">
                <Row>
                  <Col span="8">
                    <FormItem label="装载加固" prop="msg">
                      <Checkbox v-model="demand.msg"></Checkbox>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="保价运输" prop="msg">
                      <Checkbox v-model="demand.msg"></Checkbox>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="批量快运" prop="msg">
                      <Checkbox v-model="demand.msg"></Checkbox>
                    </FormItem>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="吨数" prop="mail">
                  <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="货区货位" prop="mail">
                  <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
              </Col>
              <Col span="8">
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="领货通知" prop="city">
                  <Checkbox v-model="demand.msg"></Checkbox>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="手机号" prop="mail">
                  <Input size="small" v-model="demand.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
              </Col>
              <Col span="8">
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col span="2">
            <label class="ivu-form-item-label">领货设置</label>
          </Col>
          <Col span="22">
            <Row>
              <Col span="8">
                <FormItem label="电子领货" prop="mail">
                  <Checkbox v-model="demand.msg"></Checkbox>
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
              <Input size="small" v-model="demand.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="2">
            <label class="ivu-form-item-label">不可编辑</label>
          </Col>
          <Col span="22">
            <Row>
              <Col span="8">
                <FormItem label="发站" prop="mail">
                  <Input size="small" disabled v-model="demand.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="发局" prop="city">
                  <Input size="small" disabled v-model="demand.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="托运人" prop="mail">
                  <Input size="small" disabled v-model="demand.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="到站" prop="mail">
                  <Input size="small" disabled v-model="demand.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="到局" prop="city">
                  <Input size="small" disabled v-model="demand.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="收货人" prop="mail">
                  <Input size="small" disabled v-model="demand.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="16">
                <FormItem label="装车地点" prop="mail">
                  <Input size="small" disabled v-model="demand.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
              </Col>
              <Col span="8">
              </Col>
            </Row>
            <Row>
              <Col span="16">
                <FormItem label="卸车地点" prop="mail">
                  <Input size="small" disabled v-model="demand.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="货物名称" prop="mail">
                  <Input size="small" disabled v-model="demand.mail" placeholder="Enter your e-mail"></Input>
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
