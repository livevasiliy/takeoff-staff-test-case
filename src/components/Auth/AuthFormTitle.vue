<template>
  <v-toolbar
          color="primary"
          dark
          flat
  >
    <v-toolbar-title>{{ title }}</v-toolbar-title>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'AuthFormTitle',
    props: {
      title: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>
