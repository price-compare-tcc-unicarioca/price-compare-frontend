import { createStore } from 'vuex'
import authentication from './modules/authentication'
import toast from './modules/toast'

const store = createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authentication,
    toast
  }
})

export default store
