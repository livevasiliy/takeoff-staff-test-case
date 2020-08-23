import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import './plugins/axios'
import vuetify from './plugins/vuetify'

Vue.use(VueI18n)

const messages = {
  en: {
    authFormTitle: 'Login form',
    account: "Login",
    password: "Password",
    signin: 'Sign in',
    firstName: 'First Name',
    lastName: 'Last name',
    company: 'Company',
    position: 'Position',
    email: 'E-mail',
    phone: 'Phone',
    notes: 'Notes',
    search: 'Search',
    createContactTitle: 'Create contact',
    editContactTitle: 'Edit contact',
    deleteContactTitle: 'Delete this contact?',
    cancel: 'Cancel',
    create: 'Create',
    save: 'Save',
    update: 'Update',
    delete: 'Delete',
    searchPlaceholder: "Enter name contact"
  },
  ru: {
    authFormTitle: 'Авторизация',
    account: "Аккаунт",
    password: "Пароль",
    signin: 'Войти',
    firstName: 'Имя',
    lastName: 'Фамилия',
    company: 'Компания',
    position: 'Должность',
    email: 'E-mail',
    phone: 'Телефон',
    notes: 'Заметки',
    search: 'Поиск',
    createContactTitle: 'Создание контакта',
    editContactTitle: 'Редактирование контакта',
    deleteContactTitle: 'Удалить этот контакт?',
    cancel: 'Отмена',
    create: 'Создать',
    save: 'Сохранить',
    update: 'Обновить',
    delete: 'Удалить',
    searchPlaceholder: "Введите название контакта"
  },
}

const i18n = new VueI18n({
  locale: 'ru',
  messages,
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
