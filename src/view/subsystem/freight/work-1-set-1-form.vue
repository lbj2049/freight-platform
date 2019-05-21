<template>
    <div>
      <Modal :value="editable" :mask-closable="false" :styles="{top: '16%'}" width="880" @on-visible-change="getEditableChange">
        <Form ref="searchForm" :model="search" inline>
          <FormItem prop="user">
            <Input type="text" v-model="search.carCard" placeholder="车号"></Input>
          </FormItem>
          <FormItem prop="isusv">
            <Checkbox v-model="search.isusv">显示所有车</Checkbox>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="doHandleSearch('searchForm')">查询</Button>
          </FormItem>
        </Form>

        <Table size="small" stripe :columns="columns" :data="list" @on-row-click="toHandleEdit"></Table>

        <!--提交时加载动画-->
        <Spin size="large" fix v-if="loading"></Spin>

        <div slot="footer">
          <div>
            <Button type="primary" @click="doSubmit">确定</Button>
            <Button @click="doCancel">关闭</Button>
          </div>
        </div>
      </Modal>
    </div>
</template>

<script>
import {
  getCarPlaceList,
  setCarPlace
} from '@/api/freight.data'
export default {
  name: 'work-1-set-1-form',
  data () {
    return {
      loading: false,
      editable: false,
      search: {
        carCard: '',
        isused: '',
        isusv: false
      },
      currData: {
        wbID: '',
        cgycID: '',
        carPlace: ''
      },
      list: [],
      columns: [
        // { type: 'index', width: 38, align: 'center', fixed: 'left' },
        { key: 'yardName', title: '股道' },
        { key: 'carPlace',
          title: '车位',
          render: (h, params) => {
            let _this = this
            if (params.row.$isEdit) {
              return h('input', {
                style: {
                  width: '80%',
                  padding: '4px 2px',
                  borderRadius: '4px',
                  border: '1px solid #e9eaec',
                  textAlign: 'center'
                },
                attrs: {
                  maxlength: 20
                },
                domProps: {
                  value: params.row.carPlace
                },
                on: {
                  input: function (event) {
                    params.row.carPlace = event.target.value
                    _this.currData.cgycID = params.row.cgycID
                    _this.currData.carPlace = params.row.carPlace
                  }
                }
              })
            } else {
              return h('div', params.row.carPlace)
            }
          }
        },
        { key: 'carVersion', title: '车型' },
        { key: 'carCard', title: '车号' },
        { key: '', title: '品名' }
      ],
      defaultInfo: {

      }
    }
  },
  created () {
    // 保留初始值
    this.defaultInfo = { ...this.search }
  },
  mounted: function () {
  },
  computed: {
    getUserId () {
      return this.$store.state.user.userId
    },
    getCompyId () {
      return this.$store.state.user.compyId
    }
  },
  methods: {
    show (wbID) {
      // console.log('set1 form show')
      this.currData.wbID = wbID
      this.editable = true
      this.search = { ...this.defaultInfo }
      this.doHandleSearch()
    },
    doHandleSearch (name) {
      // console.log(this.search)
      const UUID = this.getUserId
      const compyID = this.getCompyId
      if (this.search.isusv) {
        this.search.isused = 2
      } else {
        this.search.isused = 0
      }
      let params = { UUID, compyID, ...this.search }
      getCarPlaceList(params).then(res => {
        const body = res.data
        const data = body.Data
        if (body.Status === 2000) {
          this.list = data || []
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
    },
    handleSubmit (name) {

    },
    getEditableChange (enable) {
      this.editable = enable
    },
    doSubmit () {
      console.log(this.currData, this.list)
      if (!this.currData.cgycID && !this.currData.cgycID) {
        this.$Message.error('请填写车位')
        return
      }
      const UUID = this.getUserId
      let params = { UUID, ...this.currData }
      setCarPlace(params).then(res => {
        const body = res.data
        const data = body.Data
        if (body.Status === 2000) {
          this.$Message.success(data.Result)
          this.$emit('handleFormSubmit')
          this.doCancel()
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
    },
    doCancel () {
      this.editable = !this.editable
    },
    toHandleEdit (row, index) {
      if (this.list.length > 0) {
        this.list.forEach((rv, i) => {
          if (i === index) {
            if (!rv.$isEdit) {
              this.$set(rv, '$isEdit', true)
            }
          } else {
            this.$set(rv, '$isEdit', false)
          }
        })
      }
    }
  }
}
</script>
