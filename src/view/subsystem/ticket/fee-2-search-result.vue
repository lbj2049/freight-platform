<template>

  <div>
    <div style="padding: 0 10px;">
      <Table size="small" stripe :columns="columns" :data="list" height="148"></Table>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
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
          key: 'key1', combine: true, title: '工作日期', fixed: 'left', width: 120
        },
        {
          key: 'key2', combine: true, title: '票符票号', width: 120
        },
        {
          key: 'key3', combine: true, title: '票种', width: 120
        },
        {
          key: 'key1', combine: true, title: '作废标记', width: 120
        },
        {
          key: 'key1', combine: true, title: '发展名称', width: 120
        },
        {
          key: 'key1', combine: true, title: '到站名称', width: 120
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

<style scoped>

</style>
