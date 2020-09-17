import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    password: '',
    username: ''
  },
  getters: {},
  mutations: {
    saveCurrent(state, data) {
      let { password, username } = data
      console.log('hh', data)
      state.password = password
      state.username = username
    }
  },
  actions: {
    login({ commit }, data) {
      commit('saveCurrent', data)
    }
  }
}
