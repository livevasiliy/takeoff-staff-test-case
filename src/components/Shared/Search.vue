<template>
  <v-text-field
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          :label="$t('search')"
          class="hidden-sm-and-down"
          v-model="searchValue"
          :placeholder="placeholder"
  ></v-text-field>
</template>

<script>
  export default {
    name: 'Search',
    props: {
      search: {
        type: String,
        required: true,
      },
      placeholder: {
        type: String,
        required: true,
      },
    },
    computed: {
      searchValue: {
        get() {
          return this.search;
        },
        set(val) {
          this.$emit('input', val);
        },
      },
    },
  }
</script>

<style scoped>

</style>
