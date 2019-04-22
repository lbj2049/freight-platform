<template>
  <Card :bordered="false">
    <form-create ref="fc" v-model="searchApi" :rule="searchRule" :option="searchOption" class="qib-form"></form-create>
    <table-paging :columns="columns" :data="list" @selectChange="selectChange" @changePageNum="changePageNum" @changePageSize="changePageSize">
    </table-paging>
  </Card>
</template>
<script>
import {
  getExpList
} from '@/api/student.data'
import SearchForm from '../../components/search-from/search-from'
import TablePaging from '../../components/table-paging/table-paging'
import { maker } from 'form-create'
import { mapActions } from 'vuex'
export default {
  components: {
    TablePaging, SearchForm
  },
  data () {
    return {
      searchApi: {},
      searchModel: {},
      // 表单生成规则
      searchRule: [
        maker.input('关键词', 'keyword').col({ span: 6, labelWidth: 64 }),
        maker.create('i-button')
          .props({ type: 'primary', size: 'default', shape: undefined, long: false, htmlType: 'button', disabled: false, icon: 'ios-upload', loading: false, show: true })
          .col({ span: 2 })
          .on({
            'click': () => {
              this.toHandleSearch()
            }
          })
          .children([ '查询' ])
      ],
      // 组件参数配置
      searchOption: {
        // submitBtn: { innerText: '查询', size: 'small', col: { span: 2 } }
        submitBtn: false

      },
      stateMap: { 0: '未初始化', 1: '完成初始化', 2: '开始', 3: '暂停', 4: '关闭' },
      list: [],
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center',
          title: '序号'
        },
        {
          key: 'expName', combine: true, title: '实验名称'
        },
        {
          key: 'isopen', combine: true, title: '状态', render: (h, params) => { let state = params.row.state; return h('div', this.stateMap[state]) }
        },
        {
          key: 'upTime', combine: true, title: '更新时间'
        },
        {
          title: '操作',
          key: 'action',
          // fixed: 'right',
          width: 120,
          render: (btn, params) => {
            const toSubsystem = params.row.state === 2
            return btn('div', [
              btn('Button', {
                props: {
                  type: 'primary',
                  disabled: !toSubsystem
                },
                on: {
                  click: () => {
                    if (toSubsystem) {
                      this.toSubsystem(params.row)
                    } else {
                      this.$Message.error('该实验暂未开启')
                    }
                  }
                }
              }, '进入实验')
            ])
          }
        }
      ],
      pagination: {
        total: 0,
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  computed: {
    getUserId () {
      return this.$store.state.user.userId
    },
    getClassId () {
      return this.$store.state.user.userInfo.classID
    }
  },
  created: function () {

  },
  mounted: function () {
    this.searchModel = this.searchApi.model()
    this.toHandleSearch()
  },
  methods: {
    ...mapActions([
      'handleExperiment'
    ]),
    toHandleSearch () {
      this.doHandleSearch(this.searchApi.formData())
    },
    // 搜索
    doHandleSearch (search) {
      const UUID = this.getUserId
      const classID = this.getClassId
      const params = { ...search, ...this.pagination, UUID, classID }
      getExpList(params).then(res => {
        const body = res.data
        const data = body.Data
        if (body.Status === 2000) {
          this.list = data.datas || []
          this.pagination = {
            total: data.total,
            pageSize: data.pageSize,
            pageNum: data.page
          }
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
    },
    toSubsystem (item) {
      const UUID = this.getUserId
      const param = { ...item, UUID }
      this.handleExperiment(param).then(res => {
        this.$router.push('/front/guide')
      })
    },
    // 选中对象切换
    selectChange (value) {
      this.multItem = value
    },
    // 切换页面
    changePageNum (pageNum) {
      this.pagination.pageNum = pageNum
      this.toHandleSearch()
    },
    // 切换页面size
    changePageSize (pageSize) {
      this.pagination.pageSize = pageSize
      this.toHandleSearch()
    },
  }
}
</script>
