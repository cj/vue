import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HomeView from 'views/Home.vue'
import selfieLoad from 'views/Selfie/load'

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    // Selfie
    { path: '/selfie/:claimID/:token', component: selfieLoad('claim')},
    // Root
    { path: '/', component: HomeView }
  ]
})
