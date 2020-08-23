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
      <span class="hidden-sm-and-down">Vue Contacts</span>
    </v-toolbar-title>
    <Search
            :placeholder="$t('searchPlaceholder')"
            :search="search"
            @input="setSearch($event)"
    />
    <v-spacer></v-spacer>
    <v-btn
            icon
            large
            v-if="user !== null"
            @click="logout()"
    >
        <v-icon>mdi-exit-to-app</v-icon>
    </v-btn>
    <router-link
            tag="v-btn"
            to="/login"
            exact
            icon
            large
            v-else
    >
      <v-icon>mdi-login</v-icon>
    </router-link>
  </v-app-bar>
</template>

<script>
  import Search from '@/components/Shared/Search'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'Navbar',
    components: {
      Search
    },
    computed: {
      ...mapGetters(['user', 'search']),
    },
    methods: {
      ...mapActions(['setSearch']),
      logout() {
        this.$store.dispatch('logout')
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>

</style>
