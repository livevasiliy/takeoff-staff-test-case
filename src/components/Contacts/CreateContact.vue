<template>
    <v-dialog
            v-model="create"
            width="800px"
            @click:outside="$emit('toggle-add-mode', false)"
    >
        <v-card class="rounded-lg">
            <v-card-title class="grey lighten-5">
                {{ $t('createContactTitle') }}
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
                                    v-model.trim="firstName"
                            ></v-text-field>
                            <v-text-field
                                    class="ml-3"
                                    :placeholder="$t('lastName')"
                                    v-model.trim="lastName"
                            ></v-text-field>
                        </v-row>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                                prepend-icon="mdi-domain"
                                :placeholder="$t('company')"
                                v-model.trim="company"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                                :placeholder="$t('position')"
                                v-model.trim="position"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                                prepend-icon="mdi-mail"
                                :placeholder="$t('email')"
                                v-model.trim="email"
                                :error-messages="emailErrors"
                                required
                                @input="$v.email.$touch()"
                                @blur="$v.email.$touch()"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                                type="tel"
                                prepend-icon="mdi-phone"
                                placeholder="+7 (000) 000 - 0000"
                                v-model.trim="phone"
                                :error-messages="phoneErrors"
                                required
                                @input="$v.phone.$touch()"
                                @blur="$v.phone.$touch()"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                                prepend-icon="mdi-text"
                                :placeholder="$t('notes')"
                                v-model.trim="notes"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        text
                        color="primary"
                        @click="$emit('toggle-add-mode',false)"
                >{{ $t('cancel') }}
                </v-btn>
                <v-btn
                        text
                        :disabled="this.$v.$invalid"
                        class="success--text"
                        @click="submit"
                >{{ $t('create') }}
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
    name: 'CreateContact',
    mixins: [validationMixin],
    validations: {
      phone: { required, phone },
      email: { email },
    },
    props: {
      create: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    data: () => ({
      firstName: '',
      lastName: '',
      company: '',
      position: '',
      email: '',
      phone: '',
      notes: '',
    }),
    computed: {
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Email должен быть действительным')
        return errors
      },
      phoneErrors () {
        const errors = []
        if (!this.$v.phone.$dirty) return errors
        !this.$v.phone.required && errors.push('Номер обязателен.')
        !this.$v.phone.phone && errors.push('Номер указан в не правильном формате')
        return errors
      },
    },
    methods: {
      submit () {
        this.$v.$touch()
        const contact = {
          firstName: this.firstName,
          lastName: this.lastName,
          company: this.company,
          position: this.position,
          email: this.$v.email.$model,
          phone: this.$v.phone.$model,
          notes: this.notes,
          userId: this.$store.getters.user.id,
        }
        this.$store.dispatch('createContact', contact)
        this.clearForm()
        this.$emit('toggle-add-mode',false)
      },
      clearForm () {
        {
          this.firstName = ''
          this.lastName = ''
          this.company = ''
          this.position = ''
          this.email = ''
          this.phone = ''
          this.notes = ''
        }
      },
    },
  }
</script>

<style scoped>

</style>
