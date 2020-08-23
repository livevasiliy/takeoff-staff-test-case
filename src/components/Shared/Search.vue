<template>
  <v-text-field
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          :label="$t('search')"
          class="hidden-sm-and-down"
  ></v-text-field>
</template>

<script>
  export default {
    name: 'Search',
  }
</script>

<style scoped>

</style>
