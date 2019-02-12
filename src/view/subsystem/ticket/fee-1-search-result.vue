<template>

  <div>
    <Table size="small" stripe :columns="columns" :data="list"></Table>
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
        // { type: 'index', width: 38, align: 'center' },
        // { type: 'selection', width: 45, align: 'center' },
        {
          key: 'key1', combine: true, title: '需求单号', fixed: 'left', width: 120
        },
        {
          key: 'key2', combine: true, title: '车/箱号', width: 120
        },
        {
          key: 'key3', combine: true, title: '开装日期', width: 120
        },
        {
          key: 'key1', combine: true, title: '托运人', width: 120
        },
        {
          key: 'key1', combine: true, title: '收货人', width: 120
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
