export default {
  state: {
    contacts: JSON.parse(localStorage.getItem('contacts')) || [],
  },
  mutations: {
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
    filterContacts(state, payload) {
      state.contacts.filter(c => c.includes(payload))
    },
  },
  actions: {
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
    filterContacts({commit}) {
      commit('filterContacts')
    },
  },
  getters: {
    contacts: s => s.contacts,
    contact: s => id => s.contacts.find(c => c.id === id),
  }
}
