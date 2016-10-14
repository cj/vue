import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // http://vuex.vuejs.org/en/strict.html
  strict: process.env.NODE_ENV !== 'production',
  state: {}
})

export default store
