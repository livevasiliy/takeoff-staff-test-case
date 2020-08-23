<template>
  <v-alert :type="type" v-if="text.length > 0">
    {{ text }}
  </v-alert>
</template>

<script>
  export default {
    name: 'Notification',
    props: {
      type: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>
