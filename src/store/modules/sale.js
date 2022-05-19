import axios from 'axios'

const client = axios.create({
  baseURL: 'http://127.0.0.1:8080/'
})

const state = {
  salesNear: null
}

const getters = {
}

const actions = {
  searchNear (context, { ean, longitude, latitude }) {
    context.commit('updateSalesNear', null)

    client.get('/sale/search', {
      params: {
        longitude,
        latitude,
        ean
      }
    }).then(({ data }) => {
      context.commit('updateSalesNear', data)
    })
  }
}

const mutations = {
  updateSalesNear (state, salesNear) {
    state.salesNear = salesNear
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
