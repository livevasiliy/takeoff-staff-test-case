export default {
  state: {
    message: {
      type: '',
      text: '',
    },
    search: ''
  },
  mutations: {
    setMessage (state, payload) {
      state.message = payload
    },
    clearMessage (state) {
      state.message = {
        type: '',
        text: '',
      }
    },
    setSearch (state, payload) {
      state.search = payload
    },
    clearSearch (state) {
      state.search = ''
    },

  },
  actions: {
    setMessage({ commit }, payload) {
      commit('setMessage', payload)
    },
    clearMessage({ commit }) {
      commit('clearMessage')
    },
    setSearch({ commit }, payload) {
      commit('setSearch', payload)
    },
    clearSearch({ commit }) {
      commit('clearSearch')
    }
  },
  getters: {
    message: s => s.message,
    search: s => s.search
  }
}
