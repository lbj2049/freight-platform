<template>
  <div>
    <div class="toolButtonGroup">
      <slot name="toolButtons"></slot>
    </div>
    <Spin size="large" fix v-if="loading"></Spin>
    <Table :size="size" :data="data" :columns="columns" :stripe="stripe" :border="border" :show-header="showHeader" :width="width" :height="tableHeight" :disabled-hover="disHover" @on-selection-change="selectChange"></Table>
    <Row v-if="pagination" type="flex" justify="end" :style="{marginTop:'10px',width: width}">
      <Col>
        <Page size="small" :pageSize="pagination.pageSize" :total="pagination.total" :current="pagination.currentPage" show-total @on-change="changePage" @on-page-size-change="changePageSize" :page-size-opts="[10, 50, 100]"></Page>
      </Col>
    </Row>
  </div>
</template>
<script>
import './table-pagin.less'
export default {
  name: 'table-paging',
  props: {
    size: {
      type: String,
      default: 'small'
    },
    data: Array,
    columns: Array,
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '100%'
    },
    disHover: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Object,
      default: function () {
        return {
          total: 100,
          pageSize: 10,
          currentPage: 1
        }
      }
    }
  },
  /*
  props: [
    'data',
    'columns',
    'stripe',
    'border',
    'showHeader',
    'width',
    'height',
    'disHover',
    'loading',
    'rowClassName',
    'size',
    'pagination'
  ],
  */
  data () {
    return {
      tableHeight: 450
    }
  },
  methods: {
    // 分页切换
    changePage (page) {
      this.$emit('changePage', page)
    },
    // 页码数切换
    changePageSize (pagesize) {
      this.$emit('changePageSize', pagesize)
    },
    // 多选
    selectChange (selection) {
      this.$emit('selectChange', selection)
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.onresize = () => {
        return (() => {
          this.tableHeight = document.body.clientHeight - this.$el.offsetTop - 50
        })()
      }
      // 设置表格高度
      this.tableHeight = window.innerHeight - this.$el.offsetTop - 50
    })
  }
}
</script>
