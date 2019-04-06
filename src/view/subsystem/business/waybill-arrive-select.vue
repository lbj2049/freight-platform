<!-- 运单受理 -->

<template>
  <div slot="content">
    <Card :dis-hover="true">
      <p slot="title">查询</p>
      <waybill-arrive-search-form @handleFormSubmit="handleSearch"/>
    </Card>
    <table-paging :columns="columns" :data="list" :distance="distance" @selectChange="selectChange" @changePageNum="changePageNum" @changePageSize="changePageSize"></table-paging>
  </div>
</template>
<script>
import TablePaging from '@/components/table-paging/table-paging'
import WaybillArriveSearchForm from './waybill-arrive-select-form'
export default {
  components: {
    WaybillArriveSearchForm,
    TablePaging
  },
  data () {
    return {
      distance: '462px',
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
        }
      ],
      columns: [
        {
          key: 'key1', combine: true, title: '托运信息'
        },
        {
          key: 'key1', combine: true, title: '搬运日期'
        },
        {
          title: '操作',
          key: 'action',
          // fixed: 'right',
          width: 120,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: { type: 'error', size: 'small' }
              }, [
                h('Poptip', {
                  props: { confirm: true, transfer: true, placement: 'left-end', title: '确定要删除吗！', type: 'error', size: 'small', width: '300' },
                  on: {
                    'on-ok': () => {
                      this.$Message.info('点击了确定')
                    },
                    'on-cancel': () => {
                      this.$Message.info('点击了取消')
                    }
                  }
                }, '删除')
              ]),
              h('Button', {
                props: { type: 'info', size: 'small' },
                on: {
                  click: () => {
                    this.edit(params)
                  }
                }
              }, '修改')
            ])
          }

        }
      ]
    }
  },
  methods: {
    remove (value) {
      console.log('remove', value)
    },
    edit (value) {
      console.log('edit', value)
    },
    handleSearch (search) {
      console.log('search', search)
    },
    selectChange (value) {
      this.multItem = value
      console.log('selectChange', value)
    },
    changePageNum (page) {
      console.log('page', page)
    },
    changePageSize (pageSize) {
      console.log('pageSize', pageSize)
    }
  }
}
</script>
