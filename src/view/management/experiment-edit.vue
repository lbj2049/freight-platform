<template>
  <div>
    <Modal :value="editable" :mask-closable="false" :footer-hide="true" :title="getTitle()" @on-visible-change="watchEditableChange" :styles="{top: '16%'}" width="880">
      <Form ref="editItemForm" :model="itemInfo" :rules="rules" :label-width="120">
        <Row>
          <Col span="24">
            <FormItem label="实验名称" prop="expName">
              <Input v-model="itemInfo.expName" placeholder="请输入实验名称"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem>
            <Card>
              <div class="drag-box-card">
                <!-- 切记设置list1和list2属性时，一定要添加.sync修饰符 -->
                <drag-list :list1.sync="list1" :list2.sync="list2" :dropConClass="dropConClass" @on-change="handleChange">
                  <h3 slot="left-title">待选班级</h3>
                  <Card class="drag-item" slot="left" slot-scope="left">{{ left.itemLeft.className }}</Card>
                  <h3 slot="right-title">参与班级</h3>
                  <Card class="drag-item" slot="right" slot-scope="right">{{ right.itemRight.className }}</Card>
                </drag-list>
              </div>
            </Card>
            </FormItem>
          </Col>
        </Row>

        <FormItem>
          <Button type="primary" :loading="loading" @click="handleSubmit('editItemForm')">提交</Button>
          <Button @click="handleReset('editItemForm')" style="margin-left: 8px">清空</Button>
        </FormItem>
      </Form>
      <!--提交时加载动画-->
      <Spin size="large" fix v-if="loading"></Spin>
    </Modal>
  </div>
</template>
<script>
import {
  getClassSel
} from '@/api/teacher.data'
import DragList from '_c/drag-list'
export default {
  components: {
    DragList
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isAdd: true,
      itemInfo: {
        UUID: null,
        classIDs: '',
        expID: null,
        expName: null
      },
      rules: {
        expName: [
          { required: true, message: '实验名称不能为空', trigger: 'blur' }
        ]
      },
      list1: [],
      list2: [],
      dropConClass: {
        left: ['drop-box', 'left-drop-box'],
        right: ['drop-box', 'right-drop-box']
      },
      handleList: [],
      defaultInfo: {

      },
      defaultList: []
    }
  },
  created () {
    // 保留初始值
    this.defaultInfo = this.itemInfo
  },
  computed: {
    getUserId () {
      return this.$store.state.user.userId
    }
  },
  mounted () {
    this.getClassList()
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
            this.defaultList = data
          }
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
    },
    getTitle () {
      return (this.isAdd ? '添加' : '修改') + '实验'
    },
    handleChange ({ src, target, oldIndex, newIndex }) {
      this.handleList.push(`${src} => ${target}, ${oldIndex} => ${newIndex}`)
    },
    // 弹出层的事件
    formConfirmEvent () {
      this.$emit('formConfirmEvent')
    },
    formCancelEvent () {
      this.$emit('formCancelEvent')
    },
    watchEditableChange (e) {
      this.$emit('watchEditableChange', e)
    },
    editFormData (itemInfo) {
      this.list1 = []
      this.list2 = []
      this.itemInfo = { ...itemInfo }
      this.isAdd = true
      if (this.itemInfo.expID) {
        this.isAdd = false
        if (this.itemInfo.classIDs) {
          this.defaultList.forEach((l, i) => {
            if (!this.itemInfo.classIDs.includes(l.classID)) {
              this.list1.push(l)
            } else {
              this.list2.push(l)
            }
          })
        }
      }
    },
    handleSubmit (name) {
      if (!this.expID) {
        this.itemInfo.UUID = this.$store.state.user.userId
      }
      if (this.list2) {
        let itemIds = []
        this.list2.forEach((v, i) => {
          itemIds.push(v.classID)
        })
        this.itemInfo.classIDs = itemIds.join(',')
      } else {
        this.$Message.error('请选择班级')
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('onSuccessValid', this.itemInfo)
        }
      })
    },
    handleReset (name) {
      this.itemInfo = this.defaultInfo
      this.list1 = this.defaultList
      this.list2 = []
      this.$refs[name].resetFields()
    }
  }
}
</script>
<style lang="less">
  .drag-box-card {
    display: inline-block;
    width: 100%;
    .drag-item {
      margin: 10px;
      line-height: 14px;
      .ivu-card {
        padding: 0 5px;
      }
      .ivu-card-body {
        padding: 6px;
      }
    }
    h3 {
      padding: 10px 15px;
    }
    .drop-box {
      border: 1px solid #eeeeee;
      height: 455px;
      border-radius: 5px;
    }
    .left-drop-box {
      margin-right: 10px;
    }
    .right-drop-box {
      //
    }
  }
</style>
