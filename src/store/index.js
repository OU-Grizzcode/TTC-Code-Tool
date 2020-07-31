import Vue from 'vue'
import Vuex from 'vuex'
import challengesJSON from "../assets/Challenges.json";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    challenges: challengesJSON,
    searchQuery: ""

  },
  mutations: {
    updateSearchQuery(state, val) {
      state.searchQuery = val;
    }
  },
  actions: {
  },
  modules: {
  }
})
