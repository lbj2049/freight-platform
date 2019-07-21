<template>
  <div class="score-btn-con-btn-con">
    <Tooltip :content="'系统评分明细'" placement="bottom">
      <!--<Icon @click.native="toHandleDetail()" :type="'md-return-left'" :size="23"></Icon>-->
      <Button type="dashed" @click="showDetail()">查看成绩</Button>
    </Tooltip>
    <div>
      <Modal v-model="showDetailModel" title="系统评分" @on-ok="showDetailModel = false" width="780" :transfer="true">
        <table-paging :columns="columns1" :data="list1" @changePageNum="changePageNum1" @changePageSize="changePageSize1" :pagination="pagination1">

        </table-paging>
      </Modal>
    </div>
  </div>
</template>

<script>
import {
  getScoreDetail
} from '@/api/teacher.data'
import TablePaging from '@/components/table-paging/table-paging'
export default {
  components: {
    TablePaging
  },
  name: 'Score',
  data () {
    return {
      showDetailModel: false,
      list1: [],
      columns1: [
        { type: 'index', width: 60, align: 'center' },
        { key: 'waybillNo', title: '运单号', width: 150 },
        { key: 'explains', title: '得分项说明' },
        { key: 'score', title: '得分', width: 60 },
        { key: 'cTime', title: '操作时间', width: 160 }
      ],
      pagination1: {
        total: 0,
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  created () {
    // console.log(this.$store.state.user.experimentId)
  },
  computed: {
    getUserId () {
      return this.$store.state.user.userId
    },
    getCompyId () {
      return this.$store.state.user.compyId
    }
  },
  mounted: function () {
    this.toHandleDetail()
  },
  methods: {
    // 切换页面
    changePageNum1 (pageNum) {
      this.pagination1.pageNum = pageNum
      this.toHandleDetail()
    },
    // 切换页面size
    changePageSize1 (pageSize) {
      this.pagination1.pageSize = pageSize
      this.toHandleDetail()
    },
    // 详情
    showDetail () {
      this.showDetailModel = true
      this.toHandleDetail()
    },
    toHandleDetail () {
      const teaUUID = this.getUserId
      const compyID = this.getCompyId
      let params = { teaUUID, compyID, ...this.pagination1 }
      // let params = { teaUUID, userid, ...this.pagination1 }
      console.log(params)
      getScoreDetail(params).then(res => {
        const body = res.data
        const data = body.Data
        if (body.Status === 2000) {
          this.list1 = data.datas || []
          this.pagination1 = {
            total: data.total,
            pageSize: data.pageSize,
            pageNum: data.page
          }
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
    }
  }
}
</script>

<style lang="less">
  .score-btn-con .ivu-tooltip-rel{
    height: 64px;
    line-height: 56px;
    i{
      cursor: pointer;
    }
  }
</style>
