<template>
  <div>
    <Form ref="search" :model="search" :rules="rules" :label-width="92" :show-message="false" class="qib-form">
      <Row>
        <Col span="16">
          <Row>
            <Col span="6">
              <FormItem label="付款方式" prop="city">
                <Select size="small" v-model="search.city" placeholder="Select your city">
                  <Option value="beijing">New York</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <div style="width: 100%; text-align: center; font-size: 24px; padding-top: 12px;">铁路局整车运单</div>
            </Col>
            <Col span="6">
              <FormItem label="票据号" prop="mail">
                <Input disabled size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <FormItem label="付款单位姓名" prop="mail">
                <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="票运输票据" prop="mail">
                <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="办理种别" prop="city">
                <Select size="small" v-model="search.city" placeholder="Select your city">
                  <Option value="beijing">New York</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="6">
              <FormItem label="发站" prop="city">
                <Select size="small" v-model="search.city" placeholder="Select your city">
                  <Option value="beijing">New York</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="到站" prop="city">
                <Select size="small" v-model="search.city" placeholder="Select your city">
                  <Option value="beijing">New York</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="专用线名称代码" prop="mail">
                <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="6">
              <FormItem label="车种车号" prop="mail">
                <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="标重" prop="mail">
                <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="经由" prop="mail">
                <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <Row>
                <Col span="12">
                  <FormItem label="箱型" prop="city">
                    <Select size="small" v-model="search.city" placeholder="Select your city">
                      <Option value="beijing">New York</Option>
                      <Option value="shanghai">London</Option>
                      <Option value="shenzhen">Sydney</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="篷布或施封号" prop="mail">
                    <Input size="small" v-model="search.mail" placeholder="Enter your e-mail"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <Table size="small" height="160" stripe :columns="columns" :data="list"></Table>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <h5>费用</h5>
                  <Table size="small" height="160" stripe :columns="columns" :data="list"></Table>
                </Col>
              </Row>
            </Col>
            <Col span="12">
              <FormItem label="记事内容" prop="mail">
                <Input v-model="search.mail" type="textarea" :autosize="{minRows: 12,maxRows: 18}" placeholder="Enter something..."></Input>
              </FormItem>

            </Col>
          </Row>

        </Col>
        <Col span="8">

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
