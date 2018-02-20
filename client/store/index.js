export const state = () => ({
  drawer: true
})

export const mutations = {
  TOGGLE_DRAWER (state) {
    state.drawer = !state.drawer
  }
}

export const actions = {
  nuxtServerInit ({commit}, {req}) {
    if (req.user) commit('auth/SET_USER', req.user)
  }
}
