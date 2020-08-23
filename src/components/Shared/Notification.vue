<template>
  <v-alert
    :type="message.type"
    v-if="message.text.length > 0"
    dismissible
    @close="this.clearMessage"
  >
    {{ message.text }}
  </v-alert>

  <v-alert
    type="warning"
    v-else-if="this.$route.query.loginError === 'true'"
    dismissible
    @close="this.clearMessage"
  >
    Для просмотра этой страницы, нужно сначала авторизоваться
  </v-alert>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Notification',
    computed: {
      ...mapGetters(['message']),
    },
    methods: {
      ...mapActions(['clearMessage'])
    }
  }
</script>

<style scoped>

</style>
