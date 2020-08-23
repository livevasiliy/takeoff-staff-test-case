<template>
  <v-dialog
          v-model="edit"
          @click:outside="$emit('toggle-edit-mode', false)"
          width="800px"
  >
    <v-card class="rounded-lg" v-if="edit === true && editContact !== null">
      <v-card-title class="grey lighten-5">
        {{ $t('editContactTitle') }}
      </v-card-title>
      <v-container>
        <v-row class="mx-2">
          <v-col
                  class="align-center justify-space-between"
                  cols="12"
          >
            <v-row
                    align="center"
                    class="mr-0"
            >
              <v-avatar
                      size="40px"
                      class="mx-3"
              >
                <img
                        src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                        alt="avatar"
                >
              </v-avatar>
              <v-text-field
                      class="mr-3"
                      :placeholder="$t('firstName')"
                      v-model.trim="editContact.firstName"
              ></v-text-field>
              <v-text-field
                      class="ml-3"
                      :placeholder="$t('lastName')"
                      v-model.trim="editContact.lastName"
              ></v-text-field>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-text-field
                    prepend-icon="mdi-domain"
                    :placeholder="$t('company')"
                    v-model.trim="editContact.company"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
                    :placeholder="$t('position')"
                    v-model.trim="editContact.position"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
                    prepend-icon="mdi-mail"
                    :placeholder="$t('email')"
                    v-model.trim="editContact.email"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
                    type="tel"
                    prepend-icon="mdi-phone"
                    placeholder="+7 (000) 000 - 0000"
                    v-model.trim="editContact.phone"
                    :error-messages="phoneErrors"
                    required
                    @input="$v.editContact.phone.$touch()"
                    @blur="$v.editContact.phone.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
                    prepend-icon="mdi-text"
                    :placeholder="$t('notes')"
                    v-model.trim="editContact.notes"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
                text
                color="primary"
                @click="$emit('toggle-edit-mode', false)"
        >{{ $t('cancel') }}
        </v-btn>
        <v-btn
                text
                :disabled="this.$v.$invalid"
                class="success--text"
                @click="updateContact()"
        >{{ $t('save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'
  import phone from '@/utils/phoneRule'

  export default {
    name: 'EditContact',
    mixins: [validationMixin],
    validations: {
      editContact: {
        phone: { required, phone },
        email: { email },
      }
    },
    props: {
      edit: {
        type: Boolean,
        required: true,
        default: false
      },
      contact: {
        type: Object,
      }
    },
    data: function() {
      return {
        editContact: { ...this.contact }
      }
    },
    computed: {
      emailErrors () {
        const errors = []
        if (!this.$v.editContact.email.$dirty) return errors
        !this.$v.editContact.email.email && errors.push('Email должен быть действительным')
        return errors
      },
      phoneErrors () {
        const errors = []
        if (!this.$v.editContact.phone.$dirty) return errors
        !this.$v.editContact.phone.required && errors.push('Номер обязателен.')
        !this.$v.editContact.phone.phone && errors.push('Номер указан в не правильном формате')
        return errors
      },
    },
    methods: {
      updateContact() {
        this.$store.dispatch('updateContact', this.editContact)
        this.$emit('toggle-edit-mode', false)
      }
    }
  }
</script>

<style scoped>

</style>
