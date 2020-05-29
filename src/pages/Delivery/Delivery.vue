<template>
  <div class="Delivery">
    <div class="OptionsBar">
      <el-button type="primary" size="small" @click="accept">接受</el-button>
      <el-button type="primary" size="small" @click="refuse">拒绝</el-button>
    </div>
    <div class="ListContent">
      <el-table class="InquiryTable"
        ref="tableSelectedList"
        v-loading="loading"
        @select="selectSingle"
        @select-all="selectAll"
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
          prop="fstatusTxt"
          label="订单状态"
          width="100">
        </el-table-column>
        <el-table-column
          prop="zdr"
          label="制单人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="ftime"
          label="制单日期"
          width="100">
        </el-table-column>
        <el-table-column
          prop="fbillno"
          label="送货单号"
          width="130">
        </el-table-column>
        <el-table-column
          prop="gyscode"
          label="供应商代码"
          width="110">
        </el-table-column>
        <el-table-column
          prop="gysname"
          label="供应商"
          width="150">
        </el-table-column>
        <el-table-column
          prop="fcontact"
          label="联系人"
          width="100">
        </el-table-column>
        <el-table-column
          prop="faddress"
          label="联系地址"
          width="150">
        </el-table-column>
        <el-table-column
          prop="fmobilephone"
          label="联系电话"
          width="120">
        </el-table-column>
        <el-table-column
          prop="fpeople"
          label="送货联系人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="songhuoaddress"
          label="送货地址"
          width="100">
        </el-table-column>
        <el-table-column
          prop="fphone"
          label="联系电话"
          width="100">
        </el-table-column>
        <el-table-column
          prop="cgfbillno"
          label="采购单号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="jqtime"
          label="订单交期"
          width="100">
        </el-table-column>
        <el-table-column
          prop="fnumber"
          label="物料代码"
          width="120">
        </el-table-column>
        <el-table-column
          prop="clnumber"
          label="物料名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="ggxh"
          label="规格型号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="danwei"
          label="单位"
          width="80">
        </el-table-column>
        <el-table-column
          prop="songhuotime"
          label="送货时间"
          width="110">
        </el-table-column>
        <el-table-column
          prop="songhuonumber"
          label="送货数量"
          width="100">
        </el-table-column>
        <!-- <el-table-column
          prop="oldnum"
          label="待收货数量"
          width="100">
        </el-table-column> -->
        <el-table-column
          prop="fnote"
          label="备注"
          width="150">
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="80">
          <template slot-scope="scope">
            <el-button type="text" @click="detail(scope.row.songhuoid)">查看</el-button>
          </template>
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
      title="拒绝送货单"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="80%">
      <el-table class="InquiryTable"
        v-loading="loading"
        height="450px"
        :data="choosedList"
        style="width: 100%;">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="fstatusTxt"
          label="订单状态"
          width="100">
        </el-table-column>
        <el-table-column
          prop="zdr"
          label="制单人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="ftime"
          label="制单日期"
          width="100">
        </el-table-column>
        <el-table-column
          prop="fbillno"
          label="送货单号"
          width="130">
        </el-table-column>
        <el-table-column
          prop="gyscode"
          label="供应商代码"
          width="110">
        </el-table-column>
        <el-table-column
          prop="gysname"
          label="供应商"
          width="150">
        </el-table-column>
        <el-table-column
          prop="fcontact"
          label="联系人"
          width="100">
        </el-table-column>
        <el-table-column
          prop="faddress"
          label="联系地址"
          width="150">
        </el-table-column>
        <el-table-column
          prop="fmobilephone"
          label="联系电话"
          width="120">
        </el-table-column>
        <el-table-column
          prop="fpeople"
          label="送货联系人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="songhuoaddress"
          label="送货地址"
          width="100">
        </el-table-column>
        <el-table-column
          prop="fphone"
          label="联系电话"
          width="100">
        </el-table-column>
        <el-table-column
          prop="cgfbillno"
          label="采购单号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="jqtime"
          label="订单交期"
          width="100">
        </el-table-column>
        <el-table-column
          prop="fnumber"
          label="型号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="ggxh"
          label="规格型号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="danwei"
          label="单位"
          width="80">
        </el-table-column>
        <el-table-column
          prop="songhuotime"
          label="送货时间"
          width="110">
        </el-table-column>
        <el-table-column
          prop="songhuonumber"
          label="送货数量"
          width="100">
        </el-table-column>
        <el-table-column
          prop="oldnum"
          label="待收货数量"
          width="100">
        </el-table-column>
        <el-table-column label="备注" fixed="right" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.fnote" placeholder="请输入备注"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" :loading="btLoading" @click="submitRefuse">提 交</el-button>
      </span>
    </el-dialog>
    <!-- 查看 -->
    <el-dialog class="AddDialog" title="送货单详情" :visible.sync="ifSeeDetail" fullscreen @close="toggleDetailDialog">
      <Detail ref="childDetail" :curSongHuoId="curSongHuoId" :curTimestamp="curTimestampD"></Detail>
      <div slot="footer" class="dialog-footer TextAlignC">
        <el-button type="primary" size="mini" v-print="'#table'">打 印</el-button>
      </div>
    </el-dialog>
    <!-- <Detail v-if="ifSeeDetail" :curSongHuoId="curSongHuoId" @toggleDetailDialog="toggleDetailDialog" :curTimestamp="curTimestampD"></Detail> -->
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {objDeepCopy} from '../../util/utils'
import Detail from '../../components/Delivery/Detail'
export default {
  name: 'Delivery',
  data () {
    return {
      loading: false,
      dialogVisible: false,
      btLoading: false,
      ifSeeDetail: false,
      orderList: [],
      curPage: 1,
      pageSize: 15,
      sum: 0,
      selectedAllList: [],
      selectedUniqueSignList: [],
      choosedList: [],
      curSongHuoId: null,
      curTimestampD: null
    }
  },
  components: {
    Detail
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
      return row.fstatus === '1'
    },
    detail (songhuoid) {
      this.ifSeeDetail = true
      this.curSongHuoId = songhuoid
      this.curTimestampD = new Date().getTime()
    },
    toggleDetailDialog (val) {
      this.ifSeeDetail = val
    },
    accept () {
      if (this.selectedAllList.length === 0) {
        this.$message({
          message: '请选择要接受的订单!',
          type: 'warning'
        })
        return false
      }
      let hasNot = false
      this.selectedAllList.map(item => {
        if (item.fstatus !== '1') {
          hasNot = true
        }
      })
      if (hasNot) {
        this.$message({
          message: '存在不可以接受的订单!',
          type: 'warning'
        })
      } else {
        let Data = this.selectedAllList.map(item => {
          let obj = {
            id: item.id
          }
          return obj
        })
        this.Http.post('updatesonghuojs', {orderlist: Data}
        ).then(res => {
          switch (res.data.code) {
            case '1':
              this.$message({
                message: '送货单接受成功!',
                type: 'success'
              })
              this.selectedAllList = []
              this.selectedUniqueSignList = []
              this.handleCurrentChange()
              break
            default:
              this.$message({
                message: '送货单接受失败!',
                type: 'error'
              })
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    refuse () {
      if (this.selectedAllList.length === 0) {
        this.$message({
          message: '请先选择要拒绝的单子!',
          type: 'warning'
        })
      } else {
        this.choosedList = objDeepCopy(this.selectedAllList)
        this.dialogVisible = true
      }
    },
    submitRefuse () {
      this.btLoading = true
      let Data = this.choosedList.map(item => {
        let obj = {
          id: item.id,
          fnote: item.fnote
        }
        return obj
      })
      this.Http.post('updatesonghuojj', {orderlist: Data}
      ).then(res => {
        switch (res.data.code) {
          case '1':
            this.$message({
              message: '送货单拒绝提交成功!',
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
              message: '送货单拒绝提交失败!',
              type: 'error'
            })
            this.btLoading = false
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    // 单独勾选切换
    selectSingle (selection, row) {
      // console.log('selectSingle', row)
      if (row.checked || row.fstatus !== '1') { // 取消勾选
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
          if (!order.checked && order.fstatus === '1') {
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
    getOrderList () {
      this.loading = true
      return new Promise((resolve, reject) => {
        this.Http.get('songhuolist', {page_num: this.curPage, number: this.pageSize, fcode: this.userInfo.fcode}
        ).then(res => {
          switch (res.data.code) {
            case '1':
              this.orderList = res.data.list.map((item, idx) => {
                switch (item.ddfstatus) {
                  case '0':
                    item.ddfstatusTxt = '未开始'
                    break
                  case '1':
                    item.ddfstatusTxt = '待接单'
                    break
                  case '2':
                    item.ddfstatusTxt = '确认接单'
                    break
                  case '3':
                    item.ddfstatusTxt = '确认不接单'
                    break
                  case '4':
                    item.ddfstatusTxt = '完成'
                    break
                  case '5':
                    item.ddfstatusTxt = '待取消'
                    break
                  case '6':
                    item.ddfstatusTxt = '已取消'
                    break
                }
                switch (item.fstatus) {
                  case '0':
                    item.fstatusTxt = '未开始'
                    break
                  case '1':
                    item.fstatusTxt = '待接单'
                    break
                  case '2':
                    item.fstatusTxt = '确认接单'
                    break
                  case '3':
                    item.fstatusTxt = '确认不接单'
                    break
                  case '4':
                    item.fstatusTxt = '完成'
                    break
                  case '5':
                    item.fstatusTxt = '待取消'
                    break
                  case '6':
                    item.fstatusTxt = '已取消'
                    break
                }
                item.conclusionTxt = item.conclusion === '0' ? '拒收' : (item.conclusion === '1' ? '让步接收' : '报废')
                item.respectarrivedateStatusTxt = item.respectarrivedateStatus === '0' ? '待审核' : (item.respectarrivedateStatus === '1' ? '审核不通过' : '已通过')
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

<style>
.Delivery{
  width: 100%;
  /* background: #fff; */
  padding: 10px 0;
  margin-top: 60px;
}
.OptionsBar{
  margin-bottom: 10px;
  text-align: right;
}
.ListContent{
  width: 100%;
  display: block;
  float: left;
  background: #fff;
  padding: 20px 5px;
}
</style>
