<template>
  <div class="main-data">
    <Spin size="large" fix v-if="loading"></Spin>
    <Table :size="size" :data="data" :columns="columns" :stripe="stripe" :border="border" :show-header="showHeader" :width="width" :height="height" :disabled-hover="disHover" @on-selection-change="selectChange"></Table>
    <Row v-if="pagination" type="flex" justify="end" :style="{marginTop:'10px',width:width?width+'px':'100%'}">
      <Col>
        <Page size="small" :pageSize="pagination.pageSize" :total="pagination.total" :current="pagination.currentPage" show-total show-sizer show-elevator @on-change="changePage" @on-page-size-change="changePageSize" :page-size-opts="[10, 50, 100]"></Page>
      </Col>
    </Row>
  </div>
</template>
<script>
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
    height: {
      type: String,
      default: ''
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
    return {}
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
  }
}
</script>
