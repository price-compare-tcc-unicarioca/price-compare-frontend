const state = {
  toasts: []
}

const getters = {
}

const actions = {
}

const mutations = {
  addToast (state, toast) {
    state.toasts.push(toast)
  },
  clearToast (state, title) {
    const idx = state.toasts.findIndex((toast) => toast.title === title)
    state.toasts.splice(idx, 1)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
