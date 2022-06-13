import client from '@/clients/backend-api'
import router from '@/router'

const state = {
  authenticatedUser: localStorage.getItem('authenticated_user')
    ? JSON.parse(localStorage.getItem('authenticated_user'))
    : null
}

const getters = {
  isAuthenticated (state) {
    return state.authenticatedUser && client.isAuthenticated()
  },
  getAuthenticatedUser () {
    return state.authenticatedUser
  }
}

const actions = {
  async signIn (context, { email, password }) {
    try {
      await client.signIn({ email, password })
      context.commit('setAuthenticatedUser', await client.getCurrentUser())

      router.push({
        name: 'home'
      })
    } catch (error) {
      context.commit('toast/addToast', {
        title: 'Error',
        payload: error?.response?.data?.message || error.message
      }, {
        root: true
      })
    }
  },
  async signUp (context, { firstName, lastName, email, password }) {
    try {
      await client.signUp({
        firstName,
        lastName,
        email,
        password
      })

      router.push({
        name: 'sign-in'
      })
    } catch (error) {
      context.commit('toast/addToast', {
        title: 'Error',
        payload: error?.response?.data?.message || error.message
      }, {
        root: true
      })
    }
  },
  async signOut (context) {
    client.signOut()
    context.commit('setAuthenticatedUser', null)

    router.push({
      name: 'home'
    })
  }
}

const mutations = {
  setAuthenticatedUser (state, user) {
    state.authenticatedUser = user
    localStorage.setItem('authenticated_user', JSON.stringify(user))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
