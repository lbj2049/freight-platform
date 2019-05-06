<template>
  <div>
    <div class="topToolGroup">
      <slot name="topTools"></slot>
    </div>
    <Spin size="large" fix v-if="loading"></Spin>
    <div>
      <Table :size="size" :data="data" :columns="columns" :stripe="stripe" :border="border" :show-header="showHeader" :width="width" :disabled-hover="disHover" @on-selection-change="selectChange"></Table>
    </div>
    <Affix :offset-bottom="0">
      <Col span="8">
        <div class="bottomToolGroup">
          <slot name="bottomTools"></slot>
        </div>
      </Col>
      <Col span="16">
        <Row v-if="pagination" type="flex" justify="end" :style="{marginTop:'10px',width: width}">
          <Col>
            <Page :pageSize="pagination.pageSize" :total="pagination.total" :current="pagination.pageNum" show-total @on-change="changePageNum" @on-page-size-change="changePageSize" :page-size-opts="[10, 50, 100]"></Page>
          </Col>
        </Row>
      </Col>
    </Affix>
  </div>
</template>
<script>
// https://github.com/AqingCyan/iView_Test
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
    distance: {
      type: String,
      default: '290px'
    },
    width: {
      type: String,
      default: '100%'
    },
    dataStyle: {
      type: Object,
      default: function () {
        return {
          height: 'calc(100vh - ' + this.distance + ')',
          overflow: 'auto'
        }
      }
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
          pageNum: 1
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
    changePageNum (pageNum) {
      this.$emit('changePageNum', pageNum)
    },
    // 页码数切换
    changePageSize (pagesize) {
      this.$emit('changePageSize', pagesize)
    },
    // 多选
    selectChange (selection) {
      this.$emit('selectChange', selection)
    }
  }
}
</script>
