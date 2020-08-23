export default {
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  mutations: {
    login (state, payload) {
      state.user = payload
      localStorage.setItem('user', JSON.stringify(payload))
    },
    logout(state) {
      state.user = null
      localStorage.removeItem('user')
    },
  },
  actions: {
    login ({ commit }, payload) {
      commit('login', payload)
    },
    logout({ commit }) {
      commit('logout')
      commit('setMessage', {
        type: 'success',
        text: 'Вы успешно покинули аккаунт',
      })
    },
  },
  getters: {
    user: s => s.user,
  }
}
