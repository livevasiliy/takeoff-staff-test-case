<template>
    <v-app id="inspire">
        <v-main>
            <v-container
                    class="fill-height"
                    fluid
            >
                <v-row
                        align="center"
                        justify="center"
                >
                    <v-col
                            cols="12"
                            sm="8"
                            md="4"
                    >
                        <Notification />
                        <AuthForm />
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
  import Notification from '@/components/Shared/Notification'
  import AuthForm from '@/components/Auth/AuthForm'
  export default {
    name: "Login",
    components: { Notification, AuthForm },
  }
</script>
