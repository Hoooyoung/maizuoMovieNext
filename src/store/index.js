import http from '@/util/http'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import { mapState, mapActions, mapMutations } from 'vuex'// 可以用mapState/mapMutation/mapAction来

Vue.use(Vuex)
// 1.应用层级的状态应该集中到单个store对象中
// 2.提交mutation是更改状态的唯一方法，并且这个过程是同步的
// 3.异步逻辑都应该封装到action里面
export default new Vuex.Store({
  plugins: [createPersistedState({
    reducer: state => {
      return {
        cityId: state.cityId,
        cityName: state.cityName
      }
    }
  })],
  // 公共状态
  state: {
    cityName: '北京',
    cityId: 110100,
    cinemaList: [],
    isShowTab: true
  },
  // 可以用mapState/mapMutation/mapAction来
  mutations: {
    changeCity (state, cityName) {
      state.cityName = cityName
    },
    changeCityId (state, cityId) {
      state.cityId = cityId
    },
    changeCinemaList (state, datalist) {
      state.cinemaList = datalist
    },
    removeCache (state) {
      state.cinemaList = []
    },
    showTab (state) {
      state.isShowTab = true
    },
    hideTab (state) {
      state.isShowTab = false
    }
  },
  actions: {
    getCinemaData (store) {
      return http({
        url: `gateway?cityId=${store.state.cityId}&ticketFlag=1&k=371055`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        // console.log(res.data.data)
        store.commit('changeCinemaList', res.data.data.cinemas)
      })
    }
  }
})
