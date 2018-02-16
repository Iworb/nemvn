<template>
    <div class="container">
        <h1>Please login to see the secret content</h1>
        <form v-if="!$store.state.auth.user" @submit.prevent="login">
            <p class="error" v-if="formError">{{ formError }}</p>
            <p><i>To login, use <b>demo</b> as username and <b>demo</b> as password.</i></p>
            <p>Username: <input type="text" v-model="formUsername" name="username" /></p>
            <p>Password: <input type="password" v-model="formPassword" name="password" /></p>
            <button type="submit">Login</button>
        </form>
        <div v-else>
            Hello {{ $store.state.auth.user.username }}!
            <pre>I am the secret content, I am shown only when the use is connected.</pre>
            <p><i>You can also refresh this page, you'll still be connected!</i></p>
            <button @click="logout">Logout</button>
        </div>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          formError: null,
          formUsername: '',
          formPassword: ''
        }
      },
      methods: {
        async login() {
          try {
            await this.$store.dispatch('auth/login', {
              username: this.formUsername,
              password: this.formPassword
            })
            this.formUsername = ''
            this.formPassword = ''
            this.formError = null
          } catch (e) {
            this.formError = e.message
          }
        },
        async logout() {
          try {
            await this.$store.dispatch('auth/logout')
          } catch (e) {
            this.formError = e.message
          }
        }
      }
    }
</script>

<style lang="stylus">
    .container
        padding 100px
    .error
        color red
</style>