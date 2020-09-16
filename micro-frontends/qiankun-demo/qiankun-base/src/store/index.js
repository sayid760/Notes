import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
*/

const modules = {
  appStore,
  userStore
}

export const mainModules = modules;

export const store = new Vuex.Store({
  modules
})