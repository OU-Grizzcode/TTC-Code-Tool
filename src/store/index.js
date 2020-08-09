import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    challenges: [],
    searchQuery: ""

  },
  mutations: {
    updateSearchQuery(state, val) {
      state.searchQuery = val;
    },
    addChallenge(state, val) {
      state.challenges[val.id] = val;
    }
  },
  actions: {
  },
  modules: {
  }
})
