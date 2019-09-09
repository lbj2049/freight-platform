<template>
  <div>
      <Form ref="searchForm" :model="search" :rules="rules" :label-width="88" :show-message="false" class="qib-form">

        <Row>
          <Col span="8">
            <FormItem label="装卸标识" prop="receptType">
              <Select size="small" v-model="search.receptType" placeholder="请选择装卸标识">
                <Option v-for="item in receptTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="装车日期" prop="loadDate">
              <DatePicker size="small" v-model="search.loadDate" type="date" placeholder="请选择装车日期" @on-change="handleChangeDate"></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="车号" prop="carCard">
              <Input size="small" v-model="search.carCard" placeholder="请输入车号"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="股道名称" prop="yardName">
              <Input size="small" v-model="search.yardName" placeholder="请输入股道名称"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="取车标志" prop="noticeCar">
              <RadioGroup size="small" v-model="search.noticeCar" >
                <Radio label="0">未通知</Radio>
                <Radio label="1">已通知</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem>
              <Button size="small" type="primary" :loading="loading" @click="handleSubmit('searchForm')" style="margin-left: 8px">查询</Button>
              <Button size="small" @click="handleNotice()" style="margin-left: 8px">通知取车</Button>
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
      // receptTypes: [{ value: 1, label: '装' }, { value: 2, label: '卸' }],
      receptTypes: [{ value: 1, label: '装' }],
      search: {
        receptType: 1,
        yardName: '',
        loadDate: '',
        carCard: '',
        noticeCar: ''
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
  mounted: function () {
    // this.toHandleSearch()
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
    handleReset (name) {
      this.search = { ...this.defaultInfo }
      this.$refs[name].resetFields()
    },
    handleNotice () {
      this.$emit('handleNotice')
    },
    handleChangeDate (dr) {
      this.search.loadDate = dr
    }
  }
}
</script>
