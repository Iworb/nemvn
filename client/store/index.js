export const actions = {
  nuxtServerInit ({commit}, {req}) {
    if (req.user) commit('auth/SET_USER', req.user)
  }
}
