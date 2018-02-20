export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER: (state, user) => {
    state.user = user
  }
}

export const actions = {
  async login ({commit}, {username, password}) {
    const data = await this.$axios.$post('/login', {username, password})
    commit('SET_USER', data)
    this.$router.push({path: '/'})
  },
  async logout ({commit}) {
    await this.$axios.post('/logout')
    commit('SET_USER', null)
    this.$router.push({path: '/login'})
  }
}
