import { createStore } from 'vuex'
import authentication from './modules/authentication'
import sale from './modules/sale'
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
    sale,
    toast
  }
})

export default store
