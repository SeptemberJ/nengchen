<template>
  <div  id="table">
      <table style="width: 100%;">
        <tbody style="background: #fff;padding: 5px 0;margin-top: 10px;">
          <tr>
            <td>
              <!-- topInfo -->
              <el-row style="background: #eee;padding: 5px 0;margin-top: 10px;">
                <el-form id="AddDeliveryForm" :model="Form" :rules="rules" ref="Form" label-width="150px" label-position="right">
                  <el-col :span="12" class="TextAlignL">
                    <el-form-item label="制单人: " prop="zdrName" size="mini">
                      <el-input v-model="Form.zdrName" size="mini" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" class="TextAlignL">
                    <el-form-item label="制单时间: " prop="zdDate" size="mini">
                      <el-date-picker
                        v-model="Form.zdDate"
                        size="mini"
                        type="date"
                        value-format="yyyy-MM-dd"
                        disabled
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-divider></el-divider>
                  </el-col>

                  <el-col :span="12" class="TextAlignL">
                    <el-form-item label="送货单号: " prop="shorderno" size="mini">
                      <el-input v-model="Form.shorderno" size="mini" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" class="TextAlignL">
                    <el-form-item label="供应商代码: " prop="providercode" size="mini">
                      <el-input v-model="Form.providercode" size="mini" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-divider></el-divider>
                  </el-col>

                  <el-col :span="12" class="TextAlignL">
                    <el-form-item label="供应商: " prop="supplierFullName" size="mini">
                      <el-input v-model="Form.supplierFullName" size="mini" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" class="TextAlignL">
                    <el-form-item label="联系人: " prop="contacts" size="mini">
                      <el-input v-model="Form.contacts" size="mini" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-divider></el-divider>
                  </el-col>

                  <el-col :span="12" class="TextAlignL">
                    <el-form-item label="联系地址: " prop="address" size="mini">
                      <el-input v-model="Form.address" size="mini" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" class="TextAlignL">
                    <el-form-item label="联系电话: " prop="tel" size="mini">
                      <el-input v-model="Form.tel" size="mini" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-divider></el-divider>
                  </el-col>

                  <el-col :span="12" class="TextAlignL">
                    <el-form-item label="收货联系人: " prop="shlxr" size="mini">
                      <el-input v-model="Form.shlxr" size="mini" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" class="TextAlignL">
                    <el-form-item label="收货地址 : " prop="shaddress" size="mini">
                      <el-input v-model="Form.shaddress" size="mini" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-divider></el-divider>
                  </el-col>

                  <el-col :span="12" class="TextAlignL">
                    <el-form-item label="联系电话: " prop="shtel" size="mini">
                      <el-input v-model="Form.shtel" size="mini" disabled></el-input>
                    </el-form-item>
                  </el-col>

                </el-form>
              </el-row>
              <el-row class="AddListBlock">
                <el-col :span="24" class="ListColumnHead">
                  <span style="width:50px;float:left;">序号</span>
                  <!-- <span>操作 </span> -->
                  <span style="width:120px;float:left;">采购单号</span>
                  <span style="width:120px;float:left;">订单交期</span>
                  <span style="width:120px;float:left;">物料代码</span>
                  <span style="width:120px;float:left;">物料名称</span>
                  <span style="width:120px;float:left;">规格型号</span>
                  <span style="width:120px;float:left;">单位</span>
                  <span style="width:120px;float:left;">订单数量</span>
                  <span style="width:120px;float:left;">送货时间</span>
                  <span style="width:120px;float:left;">送货数量</span>
                </el-col>
                <el-col :span="24" class="ListItem" v-for="(item, idx) in addList" :key="idx">
                  <span style="width:50px;float:left;">{{idx + 1}}</span>
                  <!-- <span><el-checkbox v-model="item.checked"></el-checkbox></span> -->
                  <span><el-input v-model="item.cgfbillno" size="mini" disabled style="width:115px;"></el-input></span>
                  <span><el-input v-model="item.jqtime" size="mini" disabled style="width:115px;"></el-input></span>
                  <span><el-input v-model="item.fnumber" size="mini" disabled style="width:115px;"></el-input></span>
                  <span><el-input v-model="item.clnumber" size="mini" disabled style="width:115px;"></el-input></span>
                  <span><el-input v-model="item.ggxh" size="mini" disabled style="width:115px;"></el-input></span>
                  <span><el-input v-model="item.danwei" size="mini" disabled style="width:115px;"></el-input></span>
                  <span><el-input v-model="item.shnumber" size="mini" disabled style="width:115px;"></el-input></span>
                  <span><el-input v-model="item.songhuotime" size="mini" disabled style="width:115px;"></el-input></span>
                  <span><el-input v-model="item.songhuonumber" size="mini" disabled style="width:115px;"></el-input></span>
                </el-col>
              </el-row>
            </td>
          </tr>
        </tbody>
      </table>
    <!-- 采购单选择列表 -->
    <CgList v-if="ifShowCgList" :copySelectedAllList="copySelectedAllList" @toggleCgListDialog="toggleCgListDialog" @updateCgList="updateCgList"/>
  </div>
</template>

<script>
import CgList from '../../components/Delivery/CgList'
import { mapState, mapActions } from 'vuex'
// import {secondToFormat} from '../../util/utils'
export default {
  name: 'AddPurchase',
  props: ['curSongHuoId', 'curTimestamp'],
  data () {
    return {
      addDialogVisible: true,
      ifShowCgList: false,
      checked: true,
      Form: {
        zdDate: '', // secondToFormat(topInfo.lrsj.time),
        zdrName: '',
        shorderno: '',
        providercode: '',
        supplierFullName: '',
        contacts: '',
        address: '',
        tel: '',
        shlxr: '',
        shaddress: '',
        shtel: ''
      },
      rules: {
        // shDate: [
        //   { required: true, message: ' ', trigger: 'blur' }
        // ]
      },
      copySelectedAllList: [], // 之前更新过来的所有选择的项
      addList: [],
      inputAmountList: [], // 输入数量
      selectedList: []
    }
  },
  computed: {
    ...mapState({
      userId: state => state.userId
      // zdrName: state => state.zdrName
    })
  },
  components: {
    CgList
  },
  created () {
    this.getDetail()
  },
  watch: {
    curTimestamp: function (val) {
      this.getDetail()
    }
  },
  methods: {
    ...mapActions([
      'toggleLoadingBt'
    ]),
    toggleCgListDialog (val) {
      this.ifShowCgList = val
    },
    updateCgList (val) {
      // this.copySelectedAllList = val.slice(0)
      let temp = []
      val.map(Outer => {
        Outer.map(item => {
          this.inputAmountList.push('')
          temp.push(item)
          this.addList.push(item)
        })
      })
      if (temp.length > 0) {
        // this.Form.cgorderno = temp[0].cgorderno
        this.Form.supplierFullName = temp[0].providerfullname
        this.Form.supplierShortName = temp[0].providername
        this.Form.providercode = temp[0].providercode
        this.Form.contacts = temp[0].providerproxy
        this.Form.tel = temp[0].tel
        this.Form.fax = temp[0].fax
        this.Form.address = temp[0].address
        this.Form.shlxr = temp[0].shlxr
        this.Form.shfax = temp[0].shfax
        this.Form.shtel = temp[0].shtel
        this.Form.shaddress = temp[0].shaddress
      }
    },
    toChoose () {
      this.ifShowCgList = true
    },
    deleteLine () {
      let selected = this.addList.filter((item) => {
        return item.checked
      })
      if (selected.length === 0) {
        this.$message({
          message: '请选择要删除的项!',
          type: 'warning'
        })
      } else {
        this.addList.map((item, idx) => {
          if (item.checked) {
            this.addList.splice(idx, 1)
          }
        })
      }
    },
    close () {
      this.$emit('toggleDetailDialog', false)
    },
    Submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.addList.length === 0) {
            this.$message({
              message: '至少添加一条采购信息!',
              type: 'warning'
            })
            return false
          }
          // 输入数量为空校验
          for (let i = 0; i < this.addList.length; i++) {
            if (!this.inputAmountList[i]) {
              this.$message({
                message: '请将送货数量不能为空!',
                type: 'warning'
              })
              return false
              // break
            }
            if (this.inputAmountList[i] > this.addList[i].wshnum) {
              this.$message({
                message: '送货数量不能大于未收货数量!',
                type: 'warning'
              })
              return false
            }
          }
          let detailTemp = []
          this.addList.map((item, idx) => {
            detailTemp.push({
              shid: item.shid ? item.shid : 0,
              cgorderentryid: item.cgorderentryid ? item.cgorderentryid : item.entryid,
              cgorderid: item.cgorderid ? item.cgorderid : item.id,
              matcode: item.matcode,
              matname: item.matname,
              version: item.version,
              units: item.units,
              stuff: item.stuff,
              shnum: this.inputAmountList[idx],
              norms: item.norms,
              fnote: item.fnote
            })
          })
          let DATA = {
            id: this.curSongHuoId,
            songhuodate: this.Form.shDate,
            providerfullname: this.Form.supplierFullName,
            providername: this.Form.supplierShortName,
            providercode: this.Form.providercode,
            providerproxy: this.Form.contacts,
            shlxr: this.Form.shlxr,
            shfax: this.Form.shfax,
            shtel: this.Form.shtel,
            shaddress: this.Form.shaddress,
            faddress: this.Form.address,
            fax: this.Form.fax,
            tel: this.Form.tel,
            fnote: this.Form.note,
            orderdetaillist: detailTemp
          }
          console.log(DATA)
          this.sureSend(JSON.stringify(DATA))
        } else {
          this.$message({
            message: '请选择送货时间!',
            type: 'warning'
          })
        }
      })
    },
    sureSend (DATA) {
      this.Http.post('updatetOrder', DATA
      ).then(res => {
        switch (res.data.code) {
          case 0:
            this.$message({
              message: '送货单编辑成功!',
              type: 'success'
            })
            // 刷新信息
            this.close()
            this.$emit('refreshDeliveryOrders')
            break
          default:
            this.$message({
              message: res.data.message + '!',
              type: 'error'
            })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    getDetail () {
      this.addList = []
      this.Http.get('songhuodetail', {songhuoid: this.curSongHuoId}
      ).then(res => {
        if (res.data.code === '1') {
          let topInfo = res.data.list
          this.Form = {
            zdDate: topInfo.ftime, // secondToFormat(topInfo.lrsj.time),
            zdrName: topInfo.zdr,
            shorderno: topInfo.fbillno,
            providercode: topInfo.gyscode,
            supplierFullName: topInfo.gysname,
            contacts: topInfo.fcontact,
            address: topInfo.faddress,
            tel: topInfo.fmobilephone,
            shlxr: topInfo.fpeople,
            shaddress: topInfo.songhuoaddress,
            shtel: topInfo.fphone
          }
          res.data.entrylist.map(item => {
            this.inputAmountList.push(item.shnum)
            this.addList.push({
              id: item.id,
              cgfbillno: item.cgfbillno,
              jqtime: item.jqtime,
              fnumber: item.fnumber,
              clnumber: item.clnumber,
              ggxh: item.ggxh,
              danwei: item.danwei,
              shnumber: item.shnumber,
              units: item.units,
              songhuotime: item.songhuotime,
              songhuonumber: item.songhuonumber
            })
          })
        } else {
          this.$message({
            message: '获取采购单失败!',
            type: 'error'
          })
        }
      }).catch((error) => {
        console.log(error)
        this.$message({
          message: 'interface error!',
          type: 'error'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.AddDialog{
  #AddDeliveryForm{
    .el-input{
      width: 50%;
    }
    .el-form-item{
      margin-bottom: 0px;
    }
    .el-divider--horizontal{
      margin: 5px 0;
    }
  }
  .AddListBlock{
    // width: 1375px; /*50 + 30 + 200 + 200 + 80 + 80+ 80 + 200 + 100 + 100 + 200 + (5 * 11)*/
    font-size: 12px;
    .ListColumnHead{
      background: #eee;
      margin: 2px 0;
      span{
        text-align: left;
        float: left;
        width: 120px;
        height: 30px;
        line-height: 30px;
        padding-left: 5px;
      }
      span:nth-of-type(1){
        width: 50px;
      }
      // span:nth-of-type(2){
      //   width: 30px;
      // }
      // span:nth-of-type(4){
      //   width: 80px;
      // }
      // span:nth-of-type(5){
      //   width: 80px;
      // }
      // span:nth-of-type(6){
      //   width: 80px;
      // }
      // span:nth-of-type(8){
      //   width: 100px;
      // }
      // span:nth-of-type(9){
      //   width: 100px;
      // }
    }
    .ListItem{
      span{
        text-align: left;
        float: left;
        width: 120px;
        height: 30px;
        line-height: 30px;
        padding-left: 5px;
      }
      span:nth-of-type(1){
        width: 50px;
      }
      // span:nth-of-type(2){
      //   width: 30px;
      // }
      // span:nth-of-type(4){
      //   width: 80px;
      // }
      // span:nth-of-type(5){
      //   width: 80px;
      // }
      // span:nth-of-type(6){
      //   width: 80px;
      // }
      // span:nth-of-type(8){
      //   width: 100px;
      // }
      // span:nth-of-type(9){
      //   width: 100px;
      // }
    }
  }
}
</style>
