<template>
  <div class="Home">
    <el-container class="">
      <el-aside :class="[isCollapse ? 'asideBarS asideBarSlow' : 'asideBarB asideBarFast', '']" style="overflow-x: hidden;min-height: 850px;box-shadow: 2px 0 6px rgba(0,21,41,.35);background: #001529;display: table-cell;vertical-align: top;text-align: center;">
        <SideBar :isCollapse="isCollapse"/>
      </el-aside>
      <el-container :class="[isCollapse ? 'containerB' : 'containerS']" style="display: table-cell;vertical-align: top;text-align: center;">
        <el-header>
          <TopBar @toggleAside="toggleAside" :isCollapse="isCollapse" :isMobile="isMobile"/>
        </el-header>
        <el-main class="MainContent">
          <!-- Breadcrumb -->
          <Breadcrumb/>
          <!-- main content -->
          <OrderList v-if="menuIdx == '1-1'"/>
          <Purchase v-if="menuIdx == '1-2'"/>
          <Delivery v-if="menuIdx == '1-3'"/>
          <!-- 个人页 -->
          <BasicInfo v-if="menuIdx == '2-1'"/>
          <Certificates v-if="menuIdx == '2-2'" @refreshOverDate="getOverDateCertificates"/>
          <Index v-if="menuIdx == '0'"/>
        </el-main>
        <!-- <el-footer>Copyright  2019 上海旺策尔信息科技有限公司 版权所有</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TopBar from '../components/TopBar.vue'
import SideBar from '../components/SideBar.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import OrderList from './Order/OrderList.vue'
import Purchase from './Order/Purchase.vue'
import Delivery from './Order/Delivery.vue'
import BasicInfo from './Center/BasicInfo.vue'
import Certificates from './Center/Certificates.vue'
import Index from './Index.vue'
export default {
  name: 'Home',
  data () {
    return {
      width: '200px',
      isCollapse: false,
      isMobile: false
    }
  },
  computed: {
    ...mapState({
      menuIdx: state => state.menuIdx,
      userId: state => state.userId
    })
  },
  watch: {
    isCollapse: function (newVal) {
      if (!newVal) {
        this.width = '200px'
      } else {
        this.width = '64px'
      }
    }
  },
  created () {
    this.getOverDateCertificates()
    this.hideToggleIcon()
    window.onresize = () => {
      this.hideToggleIcon()
    }
  },
  components: {
    TopBar,
    SideBar,
    Breadcrumb,
    OrderList,
    Purchase,
    Delivery,
    BasicInfo,
    Certificates,
    Index
  },
  methods: {
    ...mapActions([
      'showNotice'
    ]),
    toggleAside (STATUS) {
      this.isCollapse = STATUS
    },
    getOverDateCertificates () {
      this.Http.get('serzhengjian', {gysid: this.userId}
      ).then(res => {
        let result = res.data.arr[0].zjlist
        if (result.length > 0) {
          this.checkOverDate(result)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    checkOverDate (List) {
      let overDateStr = ''
      let wiilOverDateStr = ''
      List.map((item, idx) => {
        // 1-过期 2-即将过期 3-正常
        if (item.ftype === 1) {
          overDateStr = overDateStr + '"' + item.imagename + '"、'
        }
        if (item.ftype === 2) {
          wiilOverDateStr = wiilOverDateStr + '"' + item.imagename + '"、'
        }
        // if (item.ftype !== 3) {
        //   overDateStr = overDateStr + item.imagename + '、'
        // }
      })
      this.showNotice({_this: this, overDateStr: overDateStr.substr(0, overDateStr.length - 1), wiilOverDateStr: wiilOverDateStr.substr(0, wiilOverDateStr.length - 1)})
      // this.showNotice(overDateStr.substr(0, overDateStr.length - 1), 'pp')
    },
    hideToggleIcon () {
      if (document.body.clientWidth < 768) {
        this.isCollapse = true
        this.isMobile = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
@Height: 850px;
@footerHeight: 64px;
@OpenWidth: 200px;
@CloseWidth: 64px;
.Home{
  height: 100vh;
  overflow: hidden;
  /*min-height: @Height;*/
  background: #f0f2f5;
  .HomeWrap{
    display: table-cell;
    vertical-align: top;
    background: pink;
  }
  .el-header{
    padding: 0 !important;
  }
  .MainContent{
    width: 100%;
    height: calc(100% - 24px);
    background: pink;
    /*min-height: calc(@Height - @footerHeight);*/
    overflow: hidden;
  }
  .asideBarB{
    width: @OpenWidth !important;
  }
  .asideBarS{
    width: @CloseWidth !important;
  }
  .asideBarSlow{
    transition:width 0.2s;
    -moz-transition:width 0.2s; /* Firefox 4 */
    -webkit-transition:width 0.2s; /* Safari and Chrome */
    -o-transition:width 0.2s; /* Opera */
  }
  .asideBarFast{
    transition:width 0.5s;
    -moz-transition:width 0.5s; /* Firefox 4 */
    -webkit-transition:width 0.5s; /* Safari and Chrome */
    -o-transition:width 0.5s; /* Opera */
  }
  .containerB{
    width: calc(100vw - @CloseWidth) !important;
  }
  .containerS{
    width: calc(100vw - @OpenWidth) !important;
  }
}
</style>
