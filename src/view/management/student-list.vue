<template>
  <div slot="content">
    <form-create ref="fc" v-model="searchApi" :rule="searchRule" :option="searchOption" class="qib-form"></form-create>
    <!--<search-form ref="searchForm" btnName="搜索" :searchData="searchData" :labelShow="true" :labelWidth="90" @handleFormSubmit="doHandleSearch" ></search-form>-->
    <table-paging :columns="columns" :data="list" :distance="distance" @selectChange="selectChange" @changePageNum="changePageNum" @changePageSize="changePageSize" :pagination="pagination">
      <div slot="topTools">
        <!--<Button type="text" @click="doRePass">密码初始化</Button>-->
        <Button type="default" @click="downloadTpl">下载模版</Button>
        <Button type="default" @click="doImport">批量导入</Button>
        <Button type="primary" @click="toAdd">新增</Button>
        <!--<Button type="error" @click="doBatchDelete">批量删除</Button>-->
        <Poptip confirm title="确定删除?" @on-ok="doBatchDelete" style="text-align: left">
          <Button type="error">批量删除</Button>
        </Poptip>
        <Poptip confirm title="确定审核?" @on-ok="doBatchAuth" style="text-align: left">
          <Button type="warning">审核</Button>
        </Poptip>
      </div>
    </table-paging>
    <student-edit ref="editUserForm" :editable="editable" @formConfirmEvent="formConfirmEvent" @formCancelEvent="formCancelEvent" @watchEditableChange="watchEditableChange" @onSuccessValid="handleSubmit"/>

    <Modal v-model="importable" width="240" @on-cancel="doImportCancel">
      <p slot="header" style="color:#f60;text-align:center">
        <span>批量导入</span>
      </p>
      <div style="text-align:center">
        <Upload :before-upload="handleBeforeUpload" action="/userInfo/importStuInfo">
          <Button icon="ios-cloud-upload-outline">{{ file === null ? '上传': '已上传' }}</Button>
        </Upload>
        <div v-if="file !== null" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">文件: {{ file.name }}</div>
      </div>
      <div slot="footer">
        <Button @click="doImportCancel">取消</Button><Button type="primary" @click="doImportOk" :disabled="file === null">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import {
  getClassSel,
  getStudentList,
  editUserInfo,
  delUserInfo,
  setState,
  getStuModelURL,
  importStuInfo
} from '@/api/teacher.data'
import axios from 'axios'
import SearchForm from '../../components/search-from/search-from'
import TablePaging from '../../components/table-paging/table-paging'
import StudentEdit from './student-edit'
import { maker } from 'form-create'
export default {
  components: {
    TablePaging, SearchForm, StudentEdit
  },
  data () {
    return {
      loading: false,
      editable: false,
      importable: false,
      file: null,
      fileable: !this.file,
      multItem: [],
      searchApi: {},
      searchModel: {},
      // 表单生成规则
      searchRule: [
        maker.select('班级', 'classID').props({ placeholder: '请选择班级' }).col({ span: 6, labelWidth: 40 }),
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
      distance: '282px',
      list: [],
      columns: [
        {
          type: 'selection', width: 60, align: 'center'
        },
        {
          key: 'loginName', combine: true, title: '用户名'
        },
        {
          key: 'userName', combine: true, title: '姓名'
        },
        {
          key: 'userNo', title: '学号'
        },
        {
          key: 'userSex',
          combine: true,
          title: '性别',
          render: (h, params) => {
            // 状态：0 未审核 1 正常 2 禁用
            let userSex = params.row.userSex
            let userSexTxt = '男'
            if (userSex === 2) {
              userSexTxt = '女'
            }
            return h('div', userSexTxt)
          }
        },
        {
          key: 'state',
          combine: true,
          title: '状态',
          render: (h, params) => {
            // 状态：0 未审核 1 正常 2 禁用
            let state = params.row.state
            let stateTxt = '禁用'
            if (state === 0) {
              stateTxt = '未审核'
            } else if (state === 1) {
              stateTxt = '正常'
            }
            return h('div', stateTxt)
          }
        },
        {
          title: '操作',
          key: 'action',
          // fixed: 'right',
          className: 'btn-ops',
          align: 'center',
          width: 180,
          render: (btn, params) => {
            return btn('div', [
              btn('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                on: {
                  click: () => {
                    const _this = this
                    _this.doAuth(params.row)
                  }
                }
              }, '审核'),
              btn('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  click: () => {
                    const _this = this
                    _this.toEdit(params.row)
                  }
                }
              }, '修改'),
              btn('Poptip', {
                props: {
                  transfer: true,
                  confirm: true,
                  type: 'error',
                  size: 'large',
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    const _this = this
                    _this.doDelete(params.row)
                  }
                }
              }, [
                btn('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  }
                }, '删除')
              ])
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
    }
  },
  created: function () {
  },
  mounted: function () {
    this.getClassList()
    this.searchModel = this.searchApi.model()
  },
  methods: {
    getClassList () {
      const UUID = this.getUserId
      let params = { UUID }
      getClassSel(params).then(res => {
        const body = res.data
        const data = body.Data
        if (body.Status === 2000) {
          let classes = []
          if (data) {
            data.forEach(({ classID, className }) => classes.push({ value: classID, label: className }))
            this.searchModel.classID.options = classes
            this.searchApi.changeField('classID', classes[ 0 ].value)
            this.searchApi.submit((formData) => {
              // 提交表单
              this.toHandleSearch()
            })
          }
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
    },
    toHandleSearch () {
      this.doHandleSearch(this.searchApi.formData())
    },
    // 搜索
    doHandleSearch (search) {
      let params = search ? Object.assign(search, this.pagination) : { ...this.pagination }
      getStudentList(params).then(res => {
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
    // 列表方法
    doRePass () {
      this.$Message.success('密码初始化完成')
    },
    // 添加
    toAdd () {
      this.editable = true
      this.$refs.editUserForm.handleReset('editUserForm')
    },
    // 编辑
    toEdit (item) {
      this.editable = true
      this.$refs.editUserForm.editFormData(item)
    },
    getBatchIds () {
      if (this.multItem && this.multItem.length > 0) {
        const itemIds = []
        this.multItem.forEach((k, v) => {
          itemIds.push(k.UUID)
        })
        return itemIds
      } else {
        this.$Message.error('请选择数据')
      }
    },
    // 删除
    doDelete (item) {
      delUserInfo({ UUIDs: item.UUID }).then(res => {
        this.resultHandler(res)
      })
    },
    // 批量删除
    doBatchDelete () {
      const userIds = this.getBatchIds()
      delUserInfo({ UUIDs: userIds }).then(res => {
        this.resultHandler(res)
      })
    },
    // 审核
    doAuth (item) {
      let state = item.state
      this.$Modal.confirm({
        title: '审核',
        render: (h) => {
          return h('RadioGroup', {
            props: {
              value: 1
            },
            on: {
              'on-change': (val) => {
                state = val
              }
            },
            style: {
              marginLeft: '120px'
            }
          }, [
            h('Radio', {
              props: {
                label: 0
              }
            }, '未审核'),
            h('Radio', {
              props: {
                label: 1
              }
            }, '正常'),
            h('Radio', {
              props: {
                label: 2
              }
            }, '禁用')]
          )
        },
        onOk: () => {
          setState({ UUIDs: item.UUID, state: state }).then(res => {
            this.resultHandler(res)
          })
        }
      })
    },
    // 批量审核
    doBatchAuth () {
      const userIds = this.getBatchIds()
      this.$Modal.confirm({
        title: '审核',
        render: (h) => {
          return h('RadioGroup', {
            props: {
              value: 1
            },
            on: {
              'on-change': (val) => {
                state = val
              }
            }
          }, [
            h('Radio', {
              props: {
                label: 0
              }
            }, '未审核'),
            h('Radio', {
              props: {
                label: 1
              }
            }, '正常'),
            h('Radio', {
              props: {
                label: 2
              }
            }, '禁用')]
          )
        },
        onOk: () => {
          setState({ UUIDs: userIds, state: state }).then(res => {
            this.resultHandler(res)
          })
        }
      })
    },
    handleSubmit (userInfo) {
      let classID = this.searchModel.classID.value

      const userType = 1
      let u = { ...userInfo, classID, userType }
      // userInfo.classID = this.searchModel.classID.value
      editUserInfo(u).then(res => {
        this.resultHandler(res)
      })
    },
    resultHandler (res) {
      const body = res.data
      const data = body.Data
      if (body.Status === 2000) {
        this.formCancelEvent()
        this.toHandleSearch()
        this.multItem = []
        this.$Message.success(data.Result)
      } else {
        this.$Message.error(data.ErrorDes)
      }
    },
    // 表单弹窗的状态
    watchEditableChange (e) {
      if (e === false) {
        this.editable = false
      };
    },
    // 弹出事件
    formConfirmEvent () {
      this.editable = false
    },
    // 弹窗消失⌚
    formCancelEvent () {
      this.editable = false
    },
    // 审核或者禁用
    auditOrDisable () {

    },
    downloadTpl () {
      getStuModelURL({}).then(res => {
        const body = res.data
        const data = body.Data
        if (body.Status === 2000) {
          window.open(data.url, '_blank')
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
    },
    doImport () {
      this.importable = true
      /*
      let classID = this.searchModel.classID.value
      const UUID = this.getUserId
      this.$Modal.confirm({
        width: 180,
        render: (h) => {
          return h('Upload', {
            props: {
              'show-upload-list': false,
              type: 'select',
              format: ['xlsx', 'xls'],
              name: 'file',
              action: '/userInfo/importStuInfo?classID=' + classID + '&UUID=' + UUID,
              'before-upload': this.handleBeforeUpload
            }
          }, [h('Button', !this.file ? '上传' : '已选择')])
        },
        onOk: () => {
          if (!this.file) {
            this.$Message.error('请选择文件')
            return false
          }
          this.doImport()
        }
      })
      */
    },
    doImportOk () {
      let classID = this.searchModel.classID.value
      const UUID = this.getUserId
      let formData = new FormData()
      formData.append('classID', classID)
      formData.append('UUID', UUID)
      formData.append('file', this.file)

      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      // 添加请求头
      axios.post('/userInfo/importStuInfo', formData, config)
        .then(res => {
          const body = res.data
          const data = body.Data
          if (body.Status === 2000) {
            this.$Message.success(data.Result)
            this.file = null
            this.importable = false
            this.toHandleSearch()
          } else {
            this.$Message.error(data.ErrorDes)
          }
        })
    },
    doImportCancel () {
      this.file = null
      this.importable = false
    },
    handleBeforeUpload (file) {
      this.file = file
      return false
    }
  }
}
</script>
