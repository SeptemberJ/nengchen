<template>
  <div class="InquirySheet">
    <div class="OptionsBar">
      <el-button type="primary" size="small" @click="close">关闭</el-button>
      <el-button type="primary" size="small" @click="accept">接受</el-button>
      <el-button type="primary" size="small" @click="refuse">拒绝</el-button>
      <el-button type="primary" size="small" @click="plant">供货计划</el-button>
    </div>
    <div class="ListContent">
      <el-table class="InquiryTable"
        ref="tableSelectedList"
        @select="selectSingle"
        @select-all="selectAll"
        v-loading="loading"
        border
        :height="tableHieght"
        :span-method="cellMerge"
        :data="orderList"
        style="width: 100%;">
        <el-table-column
          type="selection"
          fixed
          :selectable="checkSelectable"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          fixed
          width="50">
        </el-table-column>
        <!-- <el-table-column
          prop="aid"
          label="aid"
          width="100">
        </el-table-column> -->
        <el-table-column
          prop="ddfstatusTxt"
          label="订单状态"
          fixed
          width="100">
        </el-table-column>
        <el-table-column
          prop="fstatusTxt"
          label="订单状态2"
          fixed
          width="100">
        </el-table-column>
        <el-table-column
          prop="fbillno"
          label="采购单号"
          width="130"
          fixed
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="zdr"
          label="制单人"
          fixed
          width="120">
        </el-table-column>
        <el-table-column
          prop="cgtime"
          label="采购日期"
          fixed
          width="110">
        </el-table-column>
        <el-table-column
          prop="gysname"
          label="供应商"
          width="150"
          fixed
          show-overflow-tooltip>
        </el-table-column>
        <!-- <el-table-column
          prop="clnumber"
          label="型号"
          width="100">
        </el-table-column> -->
        <el-table-column
          prop="fmodel"
          label="型号/材料"
          width="150"
          fixed
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="ggxh"
          label="规格型号"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="danwei"
          label="单位"
          width="80">
        </el-table-column>
        <el-table-column
          prop="cangku"
          label="仓库"
          width="100">
        </el-table-column>
        <el-table-column
          prop="ynumber"
          label="原采购数量"
          width="100">
        </el-table-column>
        <el-table-column
          prop="shnumber"
          label="数量"
          width="100">
        </el-table-column>
        <el-table-column
          prop="jqtime"
          label="需要交期"
          width="100">
        </el-table-column>
        <el-table-column
          prop="ftime"
          label="供货计划"
          width="120">
        </el-table-column>
        <el-table-column
          prop="respectarrivedateStatusTxt"
          label="回复到货日期审核状态"
          width="100">
        </el-table-column>
        <el-table-column
          prop="jhtime"
          label="实际到货日期"
          width="160">
        </el-table-column>
        <el-table-column
          prop="checkpeople"
          label="检验人"
          width="100">
        </el-table-column>
        <el-table-column
          prop="checktime"
          label="检验时间"
          width="100">
        </el-table-column>
        <el-table-column
          prop="oldnum"
          label="待收货数量"
          width="100">
        </el-table-column>
        <el-table-column
          prop="newnum"
          label="已收货"
          width="100">
        </el-table-column>
        <el-table-column
          prop="hegenum"
          label="合格"
          width="100">
        </el-table-column>
        <el-table-column
          prop="buhegenum"
          label="不合格"
          width="100">
        </el-table-column>
        <el-table-column
          prop="yqday"
          label="延期天数"
          width="100">
        </el-table-column>
        <el-table-column
          prop="fnote"
          label="备注"
          width="100">
        </el-table-column>
        <el-table-column
          prop="conclusionTxt"
          label="检验结论"
          width="100">
        </el-table-column>
        <el-table-column
          prop="tlnumber"
          label="退料数量"
          width="100">
        </el-table-column>
        <el-table-column
          prop="rbjsnumber"
          label="让步接收数量"
          width="110">
        </el-table-column>
        <el-table-column
          prop="fauxprice"
          label="未税单价"
          width="100">
        </el-table-column>
        <el-table-column
          prop="fallamount"
          label="价税合计"
          width="100">
        </el-table-column>
        <el-table-column
          prop="fcontact"
          label="联系人"
          width="100">
        </el-table-column>
        <el-table-column
          prop="fmobilephone"
          label="联系电话"
          width="100">
        </el-table-column>
        <el-table-column
          prop="ffax"
          label="传真号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="faddress"
          label="地址"
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
    <el-dialog class="WhiteUnable"
      title="供货计划"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="900px">
      <div>
        <el-form :inline="true" :model="formPlant" :rules="AddRules" ref="formPlant" class="demo-form-inline">
          <el-row>
            <el-col :span="8" class="TextAlignL">
              <el-form-item label="采购单号">
                <el-input v-model="formPlant.fbillno" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="TextAlignL">
              <el-form-item label="型号">
                <el-input v-model="formPlant.clnumber" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="TextAlignL">
              <el-form-item label="数量">
                <el-input v-model="formPlant.shnumber" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="TextAlignL MarginB_20">
            <el-button icon="el-icon-plus" type="danger" size="small" @click="addLine">新增</el-button>
          </el-row>
          <el-row v-for="(Order, idx) in formPlant.orderlist" :key="idx" class="TextAlignL">
            <!-- <span style="font-size:16px;margin: 9px 10px;float:left;">{{idx + 1}}</span> -->
            <el-form-item :prop="'orderlist.' + idx + '.shnumber'" :rules="AddRules.shnumber" label="数量">
              <el-input v-model="Order.shnumber" clearable style="width: 150px;" @change="countTotal"></el-input>
            </el-form-item>
            <el-form-item :prop="'orderlist.' + idx + '.ftime'" :rules="AddRules.ftime" label="日期">
              <el-date-picker style="width: 150px;"
                v-model="Order.ftime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item :prop="'orderlist.' + idx + '.fnote'" :rules="AddRules.fnote" label="备注">
              <el-input v-model="Order.fnote" clearable style="width: 250px;"></el-input>
              <i class="el-icon-delete" @click="removeLine(idx)" style="font-size: 20px;margin-left: 20px;cursor: pointer;"></i>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" :loading="btLoading" @click="submit('formPlant')">提 交</el-button>
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
      formPlant: {
        aid: '',
        bid: '',
        sendemail: '',
        sendemail1: '',
        fbillno: '',
        clnumber: '',
        shnumber: '',
        orderlist: [
          {
            shnumber: '',
            ftime: '',
            fnote: ''
          }
        ]
      },
      listTotal: 0,
      AddRules: {
        shnumber: [
          { required: true, message: '请输入数量！', trigger: 'change' }
        ],
        ftime: [
          { required: true, message: '请输入日期！', trigger: 'change' }
        ]
      },
      orderList: [],
      curPage: 1,
      pageSize: 15,
      sum: 0,
      selectedAllList: [],
      selectedUniqueSignList: [],
      spanArr: [],
      pos: 0,
      spanArr2: [],
      pos2: 0
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
      return true
      // return row.isbj2 === '0'
    },
    countTotal () {
      let total = 0
      this.formPlant.orderlist.map(item => {
        total += Number(item.shnumber)
      })
      this.listTotal = total
    },
    cellMerge ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 4 || columnIndex === 6 || columnIndex === 7) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      if (columnIndex === 3 || columnIndex === 12) {
        const _row = this.spanArr2[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    getSpanArr (data) {
      this.spanArr = []
      this.pos = 0
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].fbillno === data[i - 1].fbillno) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.pos = i
          }
        }
      }
    },
    getSpanArr2 (data) {
      this.spanArr2 = []
      this.pos2 = 0
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr2.push(1)
          this.pos2 = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].aid === data[i - 1].aid) {
            this.spanArr2[this.pos2] += 1
            this.spanArr2.push(0)
          } else {
            this.spanArr2.push(1)
            this.pos2 = i
          }
        }
      }
    },
    close () {
      if (this.selectedAllList.length === 0) {
        this.$message({
          message: '请选择要关闭的订单!',
          type: 'warning'
        })
        return false
      }
      let hasNot = false
      this.selectedAllList.map(item => {
        if (item.ddfstatus !== '5') {
          hasNot = true
        }
      })
      if (hasNot) {
        this.$message({
          message: '存在不可以关闭的订单!',
          type: 'warning'
        })
      } else {
        let Data = this.selectedAllList.map(item => {
          let obj = {
            bid: item.bid
          }
          return obj
        })
        this.Http.post('closeorder', {orderlist: Data}
        ).then(res => {
          switch (res.data.code) {
            case '1':
              this.$message({
                message: '采购订单关闭成功!',
                type: 'success'
              })
              this.selectedAllList = []
              this.selectedUniqueSignList = []
              this.handleCurrentChange()
              break
            default:
              this.$message({
                message: '采购订单关闭失败!',
                type: 'error'
              })
          }
        }).catch((error) => {
          console.log(error)
        })
      }
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
        if (item.ddfstatus !== '1') {
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
            bid: item.bid
          }
          return obj
        })
        this.Http.post('updatecgorderjj', {orderlist: Data}
        ).then(res => {
          switch (res.data.code) {
            case '1':
              this.$message({
                message: '采购订单接受成功!',
                type: 'success'
              })
              this.selectedAllList = []
              this.selectedUniqueSignList = []
              this.handleCurrentChange()
              break
            default:
              this.$message({
                message: '采购订单接受失败!',
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
          message: '请选择要拒绝的订单!',
          type: 'warning'
        })
        return false
      }
      let hasNot = false
      this.selectedAllList.map(item => {
        if (item.ddfstatus !== '1') {
          hasNot = true
        }
      })
      if (hasNot) {
        this.$message({
          message: '存在不可以拒绝的订单!',
          type: 'warning'
        })
      } else {
        let Data = this.selectedAllList.map(item => {
          let obj = {
            bid: item.bid
          }
          return obj
        })
        this.Http.post('updatecgorderjs', {orderlist: Data}
        ).then(res => {
          switch (res.data.code) {
            case '1':
              this.$message({
                message: '采购订单拒绝成功!',
                type: 'success'
              })
              this.selectedAllList = []
              this.selectedUniqueSignList = []
              this.handleCurrentChange()
              break
            default:
              this.$message({
                message: '采购订单拒绝失败!',
                type: 'error'
              })
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    plant () {
      if (this.selectedAllList.length === 0) {
        this.$message({
          message: '请选择要供货计划的订单!',
          type: 'warning'
        })
        return false
      }
      if (this.selectedAllList.length > 1) {
        this.$message({
          message: '供货计划只能单张订单进行!',
          type: 'warning'
        })
        return false
      }
      let curPlantOrder = this.selectedAllList[0]
      if (curPlantOrder.ddfstatus !== '2' || curPlantOrder.ftype !== '0') {
        this.$message({
          message: '改订单不能进行供货计划!',
          type: 'warning'
        })
        return false
      }
      this.formPlant.fbillno = curPlantOrder.fbillno
      this.formPlant.clnumber = curPlantOrder.clnumber
      this.formPlant.shnumber = curPlantOrder.shnumber
      this.formPlant.aid = curPlantOrder.aid
      this.formPlant.bid = curPlantOrder.bid
      this.formPlant.sendemail = curPlantOrder.sendemail
      this.formPlant.sendemail1 = curPlantOrder.sendemail1
      this.dialogVisible = true
    },
    addLine () {
      this.formPlant.orderlist.push({
        shnumber: '',
        ftime: '',
        fnote: ''
      })
    },
    removeLine (idx) {
      this.formPlant.orderlist.splice(idx, 1)
      this.countTotal()
    },
    // 单独勾选切换
    selectSingle (selection, row) {
      // console.log('selectSingle', row)
      if (row.checked) { // 取消勾选
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
          // if (!order.checked && order.isbj2 === '0') {
          if (!order.checked) {
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
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (Number(this.formPlant.shnumber) !== Number(this.listTotal)) {
            this.$message({
              message: '数量之和要等于订单总数量!',
              type: 'warning'
            })
            return false
          }
          this.Http.post('updateplan', this.formPlant
          ).then(res => {
            switch (res.data.code) {
              case '1':
                this.$message({
                  message: '供货计划提交成功!',
                  type: 'success'
                })
                this.dialogVisible = false
                this.selectedAllList = []
                this.selectedUniqueSignList = []
                this.btLoading = false
                this.getOrderList()
                break
              default:
                this.$message({
                  message: '供货计划提交失败!',
                  type: 'error'
                })
                this.btLoading = false
            }
          }).catch((error) => {
            this.btLoading = true
            console.log(error)
          })
        } else {
          this.$message({
            message: '请将信息填写完整!',
            type: 'warning'
          })
          this.btLoading = false
          return false
        }
      })
    },
    getOrderList () {
      this.loading = true
      return new Promise((resolve, reject) => {
        this.Http.get('cglist', {page_num: this.curPage, number: this.pageSize, fcode: this.userInfo.fcode}
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
                  default:
                    item.ddfstatusTxt = ''
                }
                switch (item.fstatus) {
                  case 0:
                    item.fstatusTxt = '未完成'
                    break
                  case 1:
                    item.fstatusTxt = '已完成'
                    break
                  case 2:
                    item.fstatusTxt = '手动关闭'
                    break
                  case 3:
                    item.fstatusTxt = '自动关闭'
                    break
                  default:
                    item.fstatusTxt = ''
                }
                switch (item.respectarrivedateStatus) {
                  case '0':
                    item.respectarrivedateStatusTxt = '待审核'
                    break
                  case '1':
                    item.respectarrivedateStatusTxt = '审核不通过'
                    break
                  case '2':
                    item.respectarrivedateStatusTxt = '已通过'
                    break
                  default:
                    item.respectarrivedateStatusTxt = ''
                }
                switch (item.conclusion) {
                  case '0':
                    item.conclusionTxt = '拒收'
                    break
                  case '1':
                    item.conclusionTxt = '让步接收'
                    break
                  case '2':
                    item.conclusionTxt = '报废'
                    break
                  default:
                    item.conclusionTxt = ''
                }
                item.idx = idx
                item.uniqueSign = item.id
                item.checked = false
                return item
              })
              this.sum = res.data.count
              this.getSpanArr(res.data.list)
              this.getSpanArr2(res.data.list)
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
.OptionsBar{
  text-align: right;
  margin-bottom: 10px;
}
.ListContent{
  width: 100%;
  display: block;
  float: left;
  background: #fff;
  padding: 20px 5px;
}
</style>
