import router from '@/router'
import axios from 'axios'
import moment from 'moment'

const client = axios.create({
  baseURL: 'http://127.0.0.1:8080/'
})

const state = {
  accessToken: null,
  expirationDate: null,
  userInfo: null,
  renewToken: null
}

const getters = {
  isAuthenticated (state) {
    return state.token !== null && moment().isBefore(state.expirationDate)
  },
  getAuthenticatedUser () {
    return state.userInfo
  }
}

const actions = {
  async signIn (context, { email, password }) {
    try {
      const { data } = await client.post('/user/sign-in', {
        email,
        password
      })

      context.commit('setCredentials', data)
      await context.dispatch('getUserInfo')

      state.renewToken = setInterval(() => {
        context.dispatch('renewCredentials')
      }, 1000 * 60 * 1)

      router.push({
        name: 'home'
      })
    } catch (error) {
      if (context.state.accessToken) {
        context.commit('eraseCredentials')
      }

      context.commit('toast/addToast', {
        title: 'SignUp error',
        payload: error?.response?.data?.message || error.message
      }, {
        root: true
      })

      throw new Error(error?.response?.data?.message || error.message)
    }
  },
  async signUp (context, payload) {
    try {
      await client.post('/user/sign-up', payload)

      router.push({
        name: 'sign-in'
      })
    } catch (error) {
      context.commit('toast/addToast', {
        title: 'SignUp error',
        payload: error?.response?.data?.message || error.message
      }, {
        root: true
      })
    }
  },
  async signOut (context) {
    context.commit('eraseCredentials')
  },
  async renewCredentials (context) {
    try {
      const { data } = await client.post('/user/renew', {}, {
        headers: {
          Authorization: `Bearer ${state.accessToken}`
        }
      })

      context.commit('setCredentials', data)
      await context.dispatch('getUserInfo')
    } catch (error) {
      if (context.state.accessToken) {
        context.commit('eraseCredentials')
      }
    }
  },
  async getUserInfo () {
    const { data } = await client.get('/user/current', {
      headers: {
        Authorization: `Bearer ${state.accessToken}`
      }
    })

    state.userInfo = data
  }
}

const mutations = {
  setCredentials (state, { token, expirationDate }) {
    state.accessToken = token
    state.expirationDate = moment(expirationDate)
  },
  eraseCredentials (state) {
    state.accessToken = null
    state.expirationDate = null
    state.userInfo = null
    if (state.renewToken) {
      clearInterval(state.renewToken)
    }

    router.push({
      name: 'sign-in'
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
