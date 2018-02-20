import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme:
    {
      primary: colors.purple.base,
      secondary: colors.grey.lighten1,
      accent: colors.purple.lighten3,
      error: colors.red.darken4,
      warning: colors.amber.darken1,
      info: colors.blue.darken4,
      success: colors.green.darken3
    }
})
