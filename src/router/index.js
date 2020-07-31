import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ChallengeView from '../views/ChallengeView.vue'
import Tutorial from '../views/Tutorial.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/:crn',
    name: 'Home',
    component: Home,
    props: true
  },
  {
    path: '/:crn/challenge/:id',
    name: 'Challenge',
    component: ChallengeView,
    props: true
  },
  {
    path: '/:crn/tutorial',
    name: 'Tutorial',
    component: Tutorial,
  }
]

const router = new VueRouter({
  routes
})

export default router
