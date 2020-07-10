import Vue from "vue";
import Vuex from "vuex";
import challengesJSON from "../assets/Challenges.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    challenges: challengesJSON
  },
  mutations: {},
  actions: {},
  modules: {}
});
