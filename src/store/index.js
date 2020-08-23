import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    contacts: JSON.parse(localStorage.getItem('contacts')) || [],
    message: {
      type: '',
      text: '',
    },
    search: ''
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
    createContact (state, payload) {
      state.contacts.concat(payload)
      localStorage.setItem('contacts', JSON.stringify(state.contacts))
    },
    updateContact (state, payload) {
      state.contacts = payload
    },
    deleteContact (state, payload) {
      state.contacts = payload
    },
    fetchContacts (state, payload) {
      state.contacts = payload
      localStorage.setItem('contacts', JSON.stringify(state.contacts))
    },
    setMessage (state, payload) {
      state.message = payload
    },
    clearMessage (state) {
      state.message = {
        type: '',
        text: '',
      }
    },
    filterContacts(state, payload) {
      state.contacts.filter(c => c.includes(payload))
    },
    setSearch (state, payload) {
      state.search = payload
    },
    clearSearch (state) {
      state.search = ''
    }
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
    createContact ({ commit }, payload) {
      axios.post('/users/1/contacts', {
        ...payload,
      }).then((response) => {
        commit('setMessage', {
          type: 'success',
          text: 'Контакт успешно добавлен',
        })
        commit('createContact', response.data)
      }).catch((error) => {
        commit('setMessage', {
          type: 'error',
          text: 'Контакт не был добавлен',
        })
      })
    },
    updateContact ({ commit }, payload) {
      axios.patch(`/users/1/contacts/${payload.id}`, {
        ...payload,
      }).then(() => {
        commit('setMessage', {
          type: 'success',
          text: 'Контакт успешно обновился',
        })
        axios.get('/users/1/contacts').then((response) => {
          localStorage.setItem('contacts', JSON.stringify(response.data))
          commit('updateContact', response.data)
        })
      }).catch((error) => {
        commit('setMessage', {
          type: 'error',
          text: 'Произошла ошибка при обновление',
        })
      })
    },
    deleteContact ({ commit }, payload) {
      axios.delete(`/users/1/contacts/${payload}`).then(() => {
        const contacts = state.contacts.filter(c => c.id !== payload)
        commit('deleteContact', contacts)
        commit('setMessage', {
          type: 'success',
          text: 'Контакт успешно удален',
        })
      }).catch(() => {
        commit('setMessage', {
          type: 'success',
          text: 'Произошла ошибка при удаление',
        })
      })
    },
    fetchContacts ({ commit }) {
      axios.get('/users/1/contacts').then((response) => {
        commit('fetchContacts', response.data)
        commit('setMessage', {
          type: 'success',
          text: 'Список контактов успешно извлечён',
        })
        setTimeout(() => {
          commit('clearMessage')
        }, 5000)
      })
    },
    setMessage({ commit }, payload) {
      commit('setMessage', payload)
    },
    clearMessage({ commit }) {
      commit('clearMessage')
    },
    filterContacts({commit}) {
      commit('filterContacts')
    },
    setSearch({ commit }, payload) {
      commit('setSearch', payload)
    },
    clearSearch({ commit }) {
      commit('clearSearch')
    }
  },
  getters: {
    user: s => s.user,
    contacts: s => s.contacts,
    contact: s => id => s.contacts.find(c => c.id === id),
    message: s => s.message,
    search: s => s.search
  },
})
