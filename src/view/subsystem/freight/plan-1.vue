<!-- 装车计划 -->

<template>
  <div slot="content">
    <Row>
      <Col span="24">
        <Card :dis-hover="true">
          <plan-1-search-form @handleFormSubmit="handleSearch" @handlePlan="handlePlan" @handleExport="handleExport"/>
        </Card>
      </Col>
    </Row>
    <div class="split-pane-wrapper">
      <Split v-model="split1" mode="vertical">
        <div slot="top" class="split-pane-2">
          <Split v-model="split2" mode="horizontal">
            <div slot="left" class="split-pane-2-padding" :style="dataStyle">
                <Table size="small" stripe :columns="columns" :data="list"></Table>
            </div>
            <div slot="right" class="split-pane-2-padding" :style="dataStyle">
              <Table size="small" stripe :columns="columns" :data="list"></Table>
            </div>
          </Split>
        </div>
        <div slot="bottom" class="split-pane-2">
          <Split v-model="split3" mode="horizontal">
            <div slot="left" class="split-pane-2-padding" :style="dataStyle">
              <Table size="small" stripe :columns="columns" :data="list"></Table>
            </div>
            <div slot="right" class="split-pane-2">

              <Split v-model="split1" mode="horizontal">
                <div slot="left" class="split-pane-2-padding" :style="dataStyle">
                  <Table size="small" stripe :columns="columns" :data="list"></Table>
                </div>
                <div slot="right" class="split-pane-2-padding" :style="dataStyle">
                  <Table size="small" stripe :columns="columns" :data="list"></Table>
                </div>
              </Split>
            </div>
          </Split>
        </div>
      </Split>
    </div>

  </div>
</template>
<script>
import TablePaging from '@/components/table-paging/table-paging'
import Plan1SearchForm from './plan-1-search-form'

export default {
  components: {
    Plan1SearchForm,
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
    handlePlan () {
      console.log('handlePlan')
    },
    handleExport () {
      console.log('handleExport')
    },
    selectChange (value) {
      this.multItem = value
      console.log('selectChange', value)
    }
  }
}
</script>

<style lang="less">

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
