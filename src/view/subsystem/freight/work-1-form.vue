<template>
  <div>
    <Form ref="searchForm" :model="search" :rules="rules" :label-width="42" :show-message="false" class="qib-form">
      <Row>
        <Col span="14">

          <Card :dis-hover="true">
            <p slot="title">作业车查看</p>
            <Row>
              <Col span="10">
                <FormItem prop="type">
                  <RadioGroup size="small" v-model="search.type" >
                    <Radio label="1">装车</Radio>
                    <Radio label="2">卸车</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col span="10">
                <FormItem >
                  <Checkbox disabled>显示已撤除小牌车</Checkbox>
                </FormItem>
              </Col>
              <Col span="2">

                <FormItem :label-width="10">
                  <Button size="small" type="primary" :loading="loading" @click="handleSubmit('searchForm')" style="margin-left: 8px">查询</Button>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="10">
                <FormItem label="股道" prop="cowName">
                  <Input size="small" v-model="search.cowName" placeholder="请输入股道"></Input>
                </FormItem>
              </Col>
              <Col span="10">
                <FormItem label="外勤" prop="cgyName">
                  <Input size="small" v-model="search.cgyName" placeholder="请输入外勤"></Input>
                </FormItem>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span="5">

          <Card :dis-hover="true">
            <p slot="title">信息查询</p>
            <FormItem :label-width="10">
              <Button size="small" @click="handleWorkTime()" style="margin-left: 8px">作业时间查询</Button>
              <Button size="small" @click="handleWorkScan()" style="margin-left: 8px">直接直卸扫描</Button>
            </FormItem>
          </Card>
        </Col>

        <Col span="5">
          <Card :dis-hover="true">
            <p slot="title">装卸作业操作</p>
            <FormItem :label-width="10">
              <Button size="small" @click="handleWorkCancel()" style="margin-left: 8px">取消作业</Button>
              <Button size="small" @click="handleWorkBrand()" style="margin-left: 8px">防护牌操作</Button>
              <Button size="small" @click="handlePrint()" style="margin-left: 8px">打印</Button>
            </FormItem>
          </Card>
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
        type: 1,
        cowName: '',
        cgyName: ''
      },
      rules: {
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
