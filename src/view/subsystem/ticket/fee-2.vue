<template>
  <div slot="content">
    <!--
    <Row>
      <Col span="12">
        <fee-2-search-form @handleSearch="handleSearch" @handleSubmit="handleSubmit" @handleCopy="handleCopy"/>
      </Col>
      <Col span="12" >
        <fee-2-search-result/>
      </Col>
    </Row>
    -->
    <fee-2-search-form @handleGetData="doGetData" @handleSubmit="handleSubmit" @handleCopy="handleCopy"/>
    <Divider style="margin: 2px 0"/>
    <Row>
      <Col span="24" >
        <fee-2-bill-form ref="billForm" @handleWrite="handleWrite" @handleFee="handleFee"/>
      </Col>
    </Row>

  </div>
</template>
<script>
import TablePaging from '@/components/table-paging/table-paging'
import Fee2SearchForm from './fee-2-search-form'
import Fee2SearchResult from './fee-2-search-result'
import Fee2BillForm from './fee-2-bill-form'

export default {
  components: {
    Fee2SearchForm,
    Fee2SearchResult,
    Fee2BillForm,
    TablePaging
  },
  props: {
  },
  data () {
    return {

    }
  },
  methods: {
    doGetData (item) {
      console.log('item', item)
      this.$refs.billForm.doSetData(item)
    },
    handleSearch (search) {
      console.log('search', search)
    },
    handleSubmit () {
      console.log('handleSubmit')
    },
    handleCopy () {
      console.log('handleCopy')
    },
    selectChange (value) {
      this.multItem = value
      console.log('selectChange', value)
    },
    handleWrite () {
      console.log('handleWrite')
    },
    handleFee () {
      console.log('handleFee')
    }
  }
}
</script>

<style lang="less">

  .ivu-split-horizontal .ivu-split-trigger-con {
    top: 50%;
    height: 100%;
    width: 0;
  }

  .split-pane-wrapper {
    height: ~"calc(100vh - 240px)";
    border: 1px solid #dcdee2;
    margin: 10px 0;
  }
  .split-pane-1 {
    padding: 10px;
  }
  .split-pane-2 {
    height: 100%;
  }

  .split-pane-2 .split-pane-2-padding {
    height: 100%;
    padding: 10px;
  }
  .data-list {
    height: 300px;
    /*overflow: hidden;*/
    overflow: auto !important;
  }
</style>
