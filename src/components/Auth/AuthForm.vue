<template>
  <v-card class="elevation-12">
    <AuthFormTitle :title="$t('authFormTitle')" />
    <v-card-text>
      <v-form>
        <v-text-field
                :label="$t('account')"
                name="email"
                prepend-icon="mdi-account"
                type="text"
                v-model.trim="email"
                :error-messages="emailErrors"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
        ></v-text-field>

        <v-text-field
                id="password"
                :label="$t('password')"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model.trim="password"
                :error-messages="passwordErrors"
                :counter="10"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <AuthFormAction :submit-handle="submit" />
  </v-card>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { email, maxLength, minLength, required } from 'vuelidate/lib/validators'
  import AuthFormAction from './AuthFormAction'
  import AuthFormTitle from './AuthFormTitle'

  export default {
    name: 'AuthForm',
    components: { AuthFormTitle, AuthFormAction },
    mixins: [validationMixin],
    validations: {
      email: {required, email},
      password: {required, minLength: minLength(6), maxLength: maxLength(10)},
    },
    data: () => ({
      email: '',
      password: '',
    }),
    computed: {
      emailErrors() {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.required && errors.push('Email обязателен')
        !this.$v.email.email && errors.push('Email должен быть действительным')
        return errors
      },
      passwordErrors() {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('Пароль должен быть не менее чем 6 символов')
        !this.$v.password.maxLength && errors.push('Пароль не должен превышать чем 10 символов')
        !this.$v.password.required && errors.push('Пароль обязателен.')
        return errors
      }
    },
    methods: {
      async submit() {
        this.$v.$touch()
        const user = await this.getUserByAuthCredentials(this.$v.email.$model)
        if (user.length > 0) {
          if (user[0].password === this.$v.password.$model) {
            await this.$store.dispatch('login', user[0])
            await this.$router.push('/')
          } else {
            await this.$store.dispatch(
              'setMessage',
              {
                type: 'error',
                text: 'Не правильный email или пароль'
              }
            )
          }
        }
        if (user.length === 0) {
          await this.$store.dispatch('setMessage',
            {
              type: 'error',
              text: 'Пользователь с таким email не найден'
            }
          )
        }
      },
      async getUserByAuthCredentials(email) {
        return await axios.get(`/users?email=${email}`)
        .then((response) => {
          return response.data
        }).catch((error) => {
          return error.response.data
        })
      },
    }
  }
</script>

<style scoped>

</style>
