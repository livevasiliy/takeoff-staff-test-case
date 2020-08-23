<template>
  <v-app-bar
          :clipped-left="$vuetify.breakpoint.lgAndUp"
          app
          color="blue darken-3"
          dark
  >
    <v-toolbar-title
            style="width: 300px"
            class="ml-0 pl-4"
    >
      <span class="hidden-sm-and-down">Contacts</span>
    </v-toolbar-title>
    <Search />
    <v-spacer></v-spacer>
    <v-btn
            icon
            large
    >
      <v-btn icon>
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-btn>
  </v-app-bar>
</template>

<script>
  import Search from '@/components/Shared/Search'
  export default {
    name: 'Navbar',
    components: {
      Search
    }
  }
</script>

<style scoped>

</style>
