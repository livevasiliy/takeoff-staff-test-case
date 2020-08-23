<template>
  <v-dialog
          v-model="edit"
          width="800px"
  >
    <v-card class="rounded-lg" v-if="edit === true">
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
                      v-model.trim="contact.firstName"
              ></v-text-field>
              <v-text-field
                      class="ml-3"
                      :placeholder="$t('lastName')"
                      v-model.trim="contact.lastName"
              ></v-text-field>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-text-field
                    prepend-icon="mdi-domain"
                    :placeholder="$t('company')"
                    v-model.trim="contact.company"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
                    :placeholder="$t('position')"
                    v-model.trim="contact.position"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
                    prepend-icon="mdi-mail"
                    :placeholder="$t('email')"
                    v-model.trim="contact.email"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
                    type="tel"
                    prepend-icon="mdi-phone"
                    placeholder="+7 (000) 000 - 0000"
                    v-model.trim="contact.phone"
                    :error-messages="phoneErrors"
                    required
                    @input="$v.contact.phone.$touch()"
                    @blur="$v.contact.phone.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
                    prepend-icon="mdi-text"
                    :placeholder="$t('notes')"
                    v-model.trim="contact.notes"
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
        >{{ $t('save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'

  const phone = (value) => RegExp(
    '^(\\+7|7|8)?[\\s\\-]?\\(?[489][0-9]{2}\\)?[\\s\\-]?[0-9]{3}[\\s\\-]?[0-9]{2}[\\s\\-]?[0-9]{2}$').test(value)
  export default {
    name: 'EditContact',
    mixins: [validationMixin],
    validations: {
      contact: {
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
    computed: {
      emailErrors () {
        const errors = []
        if (!this.$v.contact.email.$dirty) return errors
        !this.$v.contact.email.email && errors.push('Email должен быть действительным')
        return errors
      },
      phoneErrors () {
        const errors = []
        if (!this.$v.contact.phone.$dirty) return errors
        !this.$v.contact.phone.required && errors.push('Номер обязателен.')
        !this.$v.contact.phone.phone && errors.push('Номер указан в не правильном формате')
        return errors
      },
    }
  }
</script>

<style scoped>

</style>
