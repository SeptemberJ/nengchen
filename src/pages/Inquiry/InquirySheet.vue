<template>
  <div class="InquirySheet">
    <el-button type="primary" size="small" @click="sureInquiry" style="float:right;margin-right:10px;margin-bottom:10px;">报 价</el-button>
    <div class="ListContent">
      <el-table class="InquiryTable"
        ref="tableSelectedList"
        @select="selectSingle"
        @select-all="selectAll"
        v-loading="loading"
        :height="tableHieght"
        :data="orderList"
        style="width: 100%;">
        <el-table-column
          type="selection"
          :selectable="checkSelectable"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="fbillno"
          label="询价单号"
          width="150"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="fdate"
          label="询价日期"
          width="120">
        </el-table-column>
        <el-table-column
          prop="fbiller"
          label="制单人"
          width="100">
        </el-table-column>
        <!-- <el-table-column
          prop="supplier"
          label="供应商"
          width="150"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="fcontact"
          label="联系人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="fphone"
          label="联系电话"
          show-overflow-tooltip>
        </el-table-column> -->
        <el-table-column
          prop="fail_date"
          label="失效时间"
          width="170">
        </el-table-column>
        <el-table-column
          prop="wlcode"
          label="物料代码"
          width="100">
        </el-table-column>
        <el-table-column
          prop="wlname"
          label="物料名称"
          width="150"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="fmodel"
          label="规格型号"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="fqty"
          label="需求数量"
          width="100">
        </el-table-column>
        <el-table-column
          prop="requestDate"
          label="交货日期"
          width="100">
        </el-table-column>
        <el-table-column
          prop="packKind"
          label="包装方式"
          width="100">
        </el-table-column>
        <el-table-column
          prop="transportKind"
          label="运输方式"
          width="100">
        </el-table-column>
        <el-table-column
          prop="otherRequest"
          label="其他需求"
          width="100">
        </el-table-column>
        <el-table-column
          prop="funit"
          label="单位"
          width="80">
        </el-table-column>
        <el-table-column
          prop="isbjTxt"
          label="是否报价"
          width="100">
        </el-table-column>
        <el-table-column
          prop="bjtime"
          label="报价日期"
          width="160">
        </el-table-column>
        <el-table-column
          prop="wsprice"
          label="未税单价"
          width="100">
        </el-table-column>
      </el-table>
      <el-pagination v-if="orderList.length > 0" style="margin: 10px 0;"
        @current-change="handleCurrentChange"
        :current-page.sync="curPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="sum">
      </el-pagination>
    </div>
    <el-dialog
      title="报价"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="80%">
      <el-table
        :data="choosedList"
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column label="价格">
          <template slot-scope="scope">
            <el-input v-model="scope.row.wsprice" placeholder="请输入价格"></el-input>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="fbillno"
          label="询价单号"
          width="150"
          show-overflow-tooltip>
        </el-table-column> -->
        <el-table-column
          prop="wlcode"
          label="物料代码"
          width="100">
        </el-table-column>
        <el-table-column
          prop="wlname"
          label="物料名称"
          width="150"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="fmodel"
          label="规格型号"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="fqty"
          label="需求数量"
          width="100">
        </el-table-column>
        <el-table-column
          prop="requestDate"
          label="交货日期"
          width="100">
        </el-table-column>
        <el-table-column
          prop="packKind"
          label="包装方式"
          width="100">
        </el-table-column>
        <el-table-column
          prop="transportKind"
          label="运输方式"
          width="100">
        </el-table-column>
        <el-table-column
          prop="otherRequest"
          label="其他需求"
          width="100">
        </el-table-column>
        <el-table-column
          prop="funit"
          label="单位"
          width="80">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" :loading="btLoading" @click="submit">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {objDeepCopy} from '../../util/utils'
export default {
  name: 'InquirySheet',
  data () {
    return {
      loading: false,
      btLoading: false,
      dialogVisible: false,
      orderList: [],
      curPage: 1,
      pageSize: 15,
      sum: 0,
      selectedAllList: [],
      selectedUniqueSignList: [],
      choosedList: []
    }
  },
  computed: {
    ...mapState({
      tableHieght: state => state.tableHieght,
      userInfo: state => state.userInfo
    })
  },
  created () {
    this.getOrderList()
  },
  methods: {
    checkSelectable (row) {
      return row.isbj2 === '0'
    },
    // 单独勾选切换
    selectSingle (selection, row) {
      // console.log('selectSingle', row)
      if (row.checked || row.isbj2 !== '0') { // 取消勾选
        let temp = objDeepCopy(this.selectedAllList)
        temp.map((item, idx) => {
          if (item.uniqueSign === row.uniqueSign) {
            this.orderList[row.idx].checked = false
            this.selectedAllList.splice(idx, 1)
            let index = this.selectedUniqueSignList.indexOf(row.uniqueSign)
            if (index > -1) {
              this.selectedUniqueSignList.splice(index, 1)
            }
          }
        })
      } else { // 加入勾选
        // 再次检查重复
        let index = this.selectedUniqueSignList.indexOf(row.uniqueSign)
        if (index === -1) {
          row.checked = true
          this.selectedUniqueSignList.push(row.uniqueSign)
          this.selectedAllList.push(row)
        }
      }
    },
    selectAll (selection) {
      if (selection.length === this.orderList.length || selection.length === 0) { // 本页全部取消勾选
        this.orderList.map(order => {
          this.selectSingle([], order)
        })
      } else { // 本页全部加入勾选
        this.orderList.map(order => {
          if (!order.checked && order.isbj2 === '0') {
            this.selectSingle([], order)
          }
        })
      }
    },
    async handleCurrentChange () {
      let curList = await this.getOrderList()
      if (this.selectedAllList.length > 0) {
        this.selectedAllList.map((itemS) => {
          curList.map((item, idx) => {
            if (item.uniqueSign === itemS.uniqueSign) {
              this.$refs.tableSelectedList.toggleRowSelection(curList[idx], true)
              this.orderList[idx].checked = true
            }
          })
        })
      }
    },
    sureInquiry () {
      // console.log(this.selectedAllList)
      if (this.selectedAllList.length === 0) {
        this.$message({
          message: '请先选择要询价的单子!',
          type: 'warning'
        })
      } else {
        this.choosedList = objDeepCopy(this.selectedAllList)
        this.dialogVisible = true
      }
    },
    submit () {
      this.btLoading = true
      // console.log(this.choosedList)
      let Data = this.choosedList.map(item => {
        let obj = {
          id: item.id,
          wsprice: item.wsprice
        }
        return obj
      })
      this.Http.post('updatexjorder', {orderlist: Data}
      ).then(res => {
        switch (res.data.code) {
          case '1':
            this.$message({
              message: '询价提交成功!',
              type: 'success'
            })
            this.dialogVisible = false
            this.selectedAllList = []
            this.selectedUniqueSignList = []
            this.choosedList = []
            this.btLoading = false
            this.handleCurrentChange()
            break
          default:
            this.$message({
              message: '询价提交失败!',
              type: 'error'
            })
            this.btLoading = false
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    getOrderList () {
      this.loading = true
      return new Promise((resolve, reject) => {
        this.Http.get('xjlist', {page_num: this.curPage, number: this.pageSize, fcode: this.userInfo.fcode}
        ).then(res => {
          switch (res.data.code) {
            case '1':
              this.orderList = res.data.list.map((item, idx) => {
                item.isbjTxt = item.isbj === '1' ? '是' : '否'
                item.idx = idx
                item.uniqueSign = item.id
                item.checked = false
                return item
              })
              this.sum = res.data.count
              resolve(res.data.list)
              this.loading = false
              break
            default:
              this.orderList = []
              this.sum = []
              this.loading = false
          }
        }).catch((error) => {
          console.log(error)
        })
      })
    }
  }
}
</script>

<style scoped>
.InquirySheet{
  width: 100%;
  /* background: #fff; */
  padding: 10px 0;
  margin-top: 60px;
}
.ListContent{
  width: 100%;
  display: block;
  float: left;
  background: #fff;
  padding: 20px 5px;
}
</style>
