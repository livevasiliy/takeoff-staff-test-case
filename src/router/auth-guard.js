import store from '../store'

export default function (to, from, next) {
  if (store.getters.user) {
    next()
  }
  next('/login?loginError=true')
}
