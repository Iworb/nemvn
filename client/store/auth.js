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
    try {
      const data = await this.$axios.$post('/login', {username, password})
      commit('SET_USER', data)
    } catch (err) {
      throw err
    }
  },
  async logout ({commit}) {
    this.$axios.post('/logout')
    commit('SET_USER', null)
  }
}
