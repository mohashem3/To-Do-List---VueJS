import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('authToken')
  },
  mutations: {
    login(state) {
      state.isLoggedIn = true
    },
    logout(state) {
      state.isLoggedIn = false
    }
  },
  actions: {
    login({ commit }) {
      localStorage.setItem('authToken', 'your-token') // Simulate login
      commit('login')
    },
    logout({ commit }) {
      localStorage.removeItem('authToken')
      commit('logout')
    }
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn
  }
})
