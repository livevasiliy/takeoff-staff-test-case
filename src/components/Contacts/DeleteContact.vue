<template>
  <v-dialog v-if="deleteMode === true" v-model="deleteMode" persistent max-width="350">
    <v-card class="rounded-lg">
      <v-card-title class="headline text-h6">{{ $t('deleteContactTitle') }}</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
                color="gray darken-1"
                text
                @click="$emit('toggle-delete-mode', false)"
        >{{ $t('cancel') }}</v-btn>
        <v-btn color="primary darken-1" text @click="deleteContact">{{ $t('delete') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'DeleteContact',
    props: {
      deleteMode: {
        type: Boolean,
        required: true,
        default: false
      },
      contact: {
        type: Object
      }
    },
    methods: {
      deleteContact() {
        this.$store.dispatch('deleteContact', this.contact.id)
      }
    }
  }
</script>

<style scoped>

</style>
