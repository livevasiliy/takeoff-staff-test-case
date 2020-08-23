<template>
  <v-alert :type="message.type" v-if="message.text.length > 0">
    {{ message.text }}
  </v-alert>

  <v-alert type="warning" v-else-if="this.$route.query.loginError === 'true'">
    Для просмотра этой страницы, нужно сначала авторизоваться
  </v-alert>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Notification',
    computed: {
      ...mapGetters(['message'])
    }
  }
</script>

<style scoped>

</style>
