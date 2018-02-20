<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-form @submit.prevent="login">
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Sign In</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>

                                <v-text-field
                                        prepend-icon="person"
                                        v-model="form.login.values.username"
                                        label="Username"
                                        type="text"
                                        :error-messages="form.login.errors.username"
                                ></v-text-field>
                                <v-text-field
                                        prepend-icon="lock"
                                        v-model="form.login.values.password"
                                        label="Password"
                                        :append-icon="e1 ? 'visibility' : 'visibility_off'"
                                        :append-icon-cb="() => (e1 = !e1)"
                                        :type="e1 ? 'password' : 'text'"
                                        :error-messages="form.login.errors.password"
                                ></v-text-field>

                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" type="submit">Sign In</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
  import {resetFormErrors, catchFormErrors} from '../mixins'

  export default {
    layout: 'clean',
    middleware: [],
    mixins: [resetFormErrors, catchFormErrors],
    data () {
      return {
        e1: true,
        form: {
          login: {
            values: {
              username: '',
              password: ''
            },
            errors: {
              username: [],
              password: []
            }
          }
        }
      }
    },
    methods: {
      async login () {
        try {
          this.resetFormErrors(this.form.login)
          await this.$store.dispatch('auth/login', this.form.login.values)
        } catch (e) {
          this.catchFormErrors(this.form.login, e)
        }
      }
    }
  }
</script>