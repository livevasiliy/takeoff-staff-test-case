export default {
  state: {
    contacts: JSON.parse(localStorage.getItem('contacts')) || [],
  },
  mutations: {
    createContact (state, payload) {
      state.contacts.push(payload)
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
  },
  actions: {
    async createContact ({ commit, getters }, payload) {
      await axios.post(`/users/${getters.user.id}/contacts`, {
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
        throw error
      })
    },
    async updateContact ({ commit, getters }, payload) {
      await axios
      .patch(`/contacts/${payload.id}`, {
        ...payload,
      }).then(() => {
        commit('setMessage', {
          type: 'success',
          text: 'Контакт успешно обновился',
        })
        axios.get(`/users/${getters.user.id}/contacts`)
        .then((response) => {
          localStorage.setItem('contacts', JSON.stringify(response.data))
          commit('updateContact', response.data)
        })
      }).catch((error) => {
        commit('setMessage', {
          type: 'error',
          text: 'Произошла ошибка при обновление',
        })
        throw error
      })
    },
    async deleteContact ({ commit, getters }, payload) {
      await axios.delete(`/contacts/${payload}`)
      .then(() => {
        const contacts = getters.contacts.filter(c => c.id !== payload)
        commit('deleteContact', contacts)
        commit('setMessage', {
          type: 'success',
          text: 'Контакт успешно удален',
        })
      }).catch((error) => {
        commit('setMessage', {
          type: 'error',
          text: 'Произошла ошибка при удаление',
        })
        throw error
      })
    },
    async fetchContacts ({ commit, getters }) {
      await axios.get(`/users/${getters.user.id}/contacts`)
      .then((response) => {
        commit('fetchContacts', response.data)
        commit('setMessage', {
          type: 'success',
          text: 'Список контактов успешно извлечён',
        })
        setTimeout(() => {
          commit('clearMessage')
        }, 2000)
      })
        .catch((error) => {
        commit('setMessage', {
          type: 'error',
          text: 'Произошла ошибка при получение списка контактов',
        })
        throw error
      })
    }
  },
  getters: {
    contacts: s => s.contacts,
    contact: s => id => s.contacts.find(c => c.id === id),
  }
}
