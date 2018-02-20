module.exports = {
  loading: {color: '#3B8070'},
  srcDir: 'client/',
  build: {
    vendor: [
      'vuetify',
      'axios',
      'roboto-fontface'
    ],
    extractCss: true
  },
  modules: [
    '@nuxtjs/axios',
    'nuxt-material-design-icons'
  ],
  plugins: [
    '~/plugins/axios',
    '~plugins/vuetify.js'
  ],
  css: [
    `~assets/style/app.styl`
  ],
  router: {
    linkActiveClass: 'router-link-active',
    linkExactActiveClass: 'router-link-exact-active',
    middleware: 'auth'
  }
}
