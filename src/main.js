import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import VueGrid from '@liqueflies/vue-flex-grid'
import ChallengeCard from "./components/ChallengeCard.vue";
import VueCodemirror from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/clike/clike.js';

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(VueGrid);
Vue.use(VueCodemirror);
Vue.component("challenge-card", ChallengeCard);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
