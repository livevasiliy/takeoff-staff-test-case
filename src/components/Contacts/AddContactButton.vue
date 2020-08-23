<template>
  <v-btn
          bottom
          color="primary"
          dark
          fab
          fixed
          right
          @click="$emit('toggle-add-mode', true)"
  >
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>

<script>
  export default {
    name: 'AddContactButton',
  }
</script>

<style scoped>

</style>
