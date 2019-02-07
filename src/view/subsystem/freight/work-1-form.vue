<template>
  <div>
    <Form ref="search" :model="search" :rules="rules" :label-width="42" :show-message="false" class="qib-form">
      <Row>
        <Col span="8">
          <Row>
            <Col span="12">
              <FormItem prop="gender">
                <RadioGroup size="small" v-model="search.gender" >
                  <Radio value="1" label="装车"></Radio>
                  <Radio value="2" label="卸车"></Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem prop="msg">
                <Checkbox v-model="search.msg">显示已撤除小牌车</Checkbox>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="股道" prop="mail">
                <Select size="small" v-model="search.city" placeholder="Select your city">
                  <Option value="beijing">New York</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="外勤" prop="mail">
                <Select size="small" v-model="search.city" placeholder="Select your city">
                  <Option value="">全部</Option>
                  <Option value="1">整车</Option>
                  <Option value="2">零担</Option>
                  <Option value="3">集装箱</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
        </Col>
        <Col span="12">
          <FormItem :label-width="10">
            <Button size="small" type="primary" :loading="loading" @click="handleSubmit('search')" style="margin-left: 8px">查询</Button>
            <Button size="small" @click="handleWorkTime()" style="margin-left: 8px">作业时间查询</Button>
            <Button size="small" @click="handleWorkScan()" style="margin-left: 8px">直接直卸扫描</Button>
            <Button size="small" @click="handleWorkCancel()" style="margin-left: 8px">取消作业</Button>
            <Button size="small" @click="handleWorkBrand()" style="margin-left: 8px">防护牌操作</Button>
            <Button size="small" @click="handlePrint()" style="margin-left: 8px">打印</Button>
          </FormItem>
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
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('handleFormSubmit', this.search)
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handlePrint () {
      this.$emit('handleFormPrint')
    },
    handleWorkTime () {
      this.$emit('handleWorkTime')
    },
    handleWorkScan () {
      this.$emit('handleWorkScan')
    },
    handleWorkCancel () {
      this.$emit('handleWorkCancel')
    },
    handleWorkBrand () {
      this.$emit('handleWorkBrand')
    }
  }
}
</script>
