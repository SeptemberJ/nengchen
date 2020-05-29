import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
// import vuexAlong from 'vuex-along'
import { Notification, Message } from 'element-ui'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

const state = {
  tableHieght: 0,
  mainContentHeight: null,
  userInfo: {},
  userName: null,
  userCode: null,
  userId: null,
  zdrName: null,
  pathName: null,
  btLoading: false,
  menuIdx: '0',
  moduleIdx: 0
}
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
// actions dispatch触发
const actions = {
  unitUserInfo ({commit, state}, Info) {
    commit('setUserInfo', Info)
  },
  changePath ({commit, state}, PATH) {
    commit('setPath', PATH)
  },
  toggleLoadingBt ({commit, state}, STATUS) {
    commit('setLoadingBt', STATUS)
  },
  changeMenuIdx ({commit, state}, IDX) {
    commit('setMenu', IDX)
  },
  changeModuleIdx ({commit, state}, IDX) {
    commit('setModuleIdx', IDX)
  },
  initTableHeight ({commit, state}, HEIGHT) {
    commit('setTableHeight', HEIGHT)
  },
  showNotice ({commit, state}, Info) {
    const h = Info._this.$createElement
    Message.closeAll()
    Message({
      showClose: true,
      message: h('div', null, [
        h('p', { style: 'font-weight: bold' }, '请及时修改如下证件的有效期：'),
        h('div', null, Info.wiilOverDateStr === '' ? '' : Info.wiilOverDateStr + '即将到期，请及时更新!'),
        h('div', null, Info.overDateStr === '' ? '' : Info.overDateStr + Info.overDateStr + '已到期，请立即更新!')
      ]),
      type: 'warning',
      duration: 0
    })
  },
  hideNotice  ({commit, state}) {
    Message.closeAll()
    Notification.closeAll()
  },
  changeMainContentHeight ({commit, state}, HEIGHT) {
    commit('setMainContentHeight', HEIGHT)
  }
}

const mutations = {
  setUserInfo (state, Info) {
    state.userInfo = Info
    // state.userCode = Info.code
    state.userName = Info.name
    state.userId = Info.id
    // state.zdrName = Info.zdrName
  },
  setPath (state, PATH) {
    state.pathName = PATH
  },
  setLoadingBt (state, STATUS) {
    state.btLoading = STATUS
  },
  setMenu (state, IDX) {
    state.menuIdx = IDX
  },
  setModuleIdx (state, IDX) {
    state.moduleIdx = IDX
  },
  setMainContentHeight (state, HEIGHT) {
    state.mainContentHeight = HEIGHT
  },
  setTableHeight (state, HEIGHT) {
    state.tableHieght = HEIGHT
  }
}

export default new Vuex.Store({
  state,
  modules: {
  },
  // getters,
  actions,
  mutations,
  // strict: debug,
  plugins: [vuexLocal.plugin]
  // plugins: debug ? [createLogger()] : []
})
