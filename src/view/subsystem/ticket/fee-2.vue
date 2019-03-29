<template>
  <div slot="content">
    <Row>
      <Col span="12">
        <fee-2-search-form @handleSearch="handleSearch" @handleSubmit="handleSubmit" @handleCopy="handleCopy"/>
      </Col>
      <Col span="12" >
        <fee-2-search-result/>
      </Col>
    </Row>
    <Row>
      <Col span="24" >
        <fee-2-bill-form @handleWrite="handleWrite" @handleFee="handleFee"/>
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
      dataStyle: {
        height: 'calc(100% - 5px)',
        overflow: 'auto'
      },
      split1: 0.5,
      split2: 0.6,
      split3: 0.5,
      split4: 0.5,
      th: 300,
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
