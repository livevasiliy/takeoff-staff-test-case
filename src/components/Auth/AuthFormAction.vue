<template>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="primary" @click.prevent="submitHandle">{{ $t('signin') }}</v-btn>
  </v-card-actions>
</template>

<script>
  export default {
    name: 'AuthFormAction',
    props: {
      submitHandle: {
        type: Function,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>
