<template>
  <div>
    <Form ref="searchForm" :model="search" :rules="rules" :label-width="64" :show-message="false" class="qib-form">
      <Row>
        <Col span="18">
          <Row>
            <Col span="12">
              <FormItem label="起止日期" prop="inoutDate">
                <DatePicker size="small" type="daterange" placeholder="请选择开始日期" v-model="search.inoutDate" @on-change="handleChangeDate"></DatePicker>
              </FormItem>
            </Col>
            <Col span="12">
                  <FormItem prop="receptType" :label-width="15">
                    <RadioGroup v-model="search.receptType">
                      <Radio label="1">发车</Radio>
                      <Radio label="2">到站接车</Radio>
                    </RadioGroup>
                  </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="需求号" prop="needNo">
                <Input size="small" v-model="search.needNo" placeholder="请输入需求号"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label-width="50">
                <Button size="small" type="primary" :loading="loading" @click="handleSubmit('searchForm')" style="margin-left: 8px">查询</Button>
                <Button size="small" @click="handleOut()" style="margin-left: 8px">退出</Button>
              </FormItem>
            </Col>
          </Row>
        </Col>
        <!--
        <Col span="6">
          <FormItem :label-width="20">
            <Button size="small" type="primary" :loading="loading" @click="handleSubmit('searchForm')" style="margin-left: 8px">查询</Button>
            <Button size="small" @click="handleOut()" style="margin-left: 8px">退出</Button>
          </FormItem>
        </Col>
        -->
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
        inoutDate: '',
        inoutDate_bg: '',
        inoutDate_ed: '',
        needNo: '',
        receptType: '',
        yardName: ''
      },
      rules: {
      },
      defaultInfo: {

      }
    }
  },
  created () {
    // 保留初始值
    this.defaultInfo = { ...this.search }
  },
  methods: {
    // 搜索
    toHandleSearch () {
      this.handleSubmit('searchForm')
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('handleFormSubmit', this.search)
        }
      })
    },
    handleOut () {
      this.$emit('handleFormOut')
    },
    handleChangeDate (dr) {
      this.search.inoutDate_bg = dr[0]
      this.search.inoutDate_ed = dr[1]
    }
  }
}
</script>
