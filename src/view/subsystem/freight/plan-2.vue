<!-- 装车计划 -->

<template>
  <div>
    <Row>
      <Col span="24">
        <Card :dis-hover="true">
          <plan-1-search-form @handleFormSubmit="handleSearch" @handlePlan="handlePlan" @handleExport="handleExport"/>
        </Card>
      </Col>
    </Row>


    <div class="list-split">
      <Split v-model="split1">
        <div slot="left" class="list-split-pane no-padding">
          <Split v-model="split2" mode="vertical">
            <div slot="top" class="demo-split-pane">
              Top Pane
            </div>
            <div slot="bottom" class="demo-split-pane">
              Bottom Pane
            </div>
          </Split>
        </div>
        <div slot="right" class="list-split-pane">
          Right Pane
        </div>
      </Split>
    </div>

  </div>
</template>
<script>
import Plan1SearchForm from './plan-1-search-form'
export default {
  components: {
    Plan1SearchForm
  },
  data () {
    return {
      split1: 0.5,
      split2: 0.5,
      split3: 0.5,
      split4: 0.5,
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
        { type: 'index', width: 38, align: 'center' },
        // { type: 'selection', width: 45, align: 'center' },
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
    handlePlan () {
      console.log('handlePlan')
    },
    handleExport () {
      console.log('handleExport')
    },
    selectChange (value) {
      this.multItem = value
      console.log('selectChange', value)
    },
    changePage (page) {
      console.log('page', page)
    },
    changePageSize (pageSize) {
      console.log('pageSize', pageSize)
    }
  }
}
</script>
