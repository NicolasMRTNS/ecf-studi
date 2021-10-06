const booksAPI = '/api/books'
const usersAPI = '/api/users'

export const state = () => ({
  categories: ['Roman', 'Bande dessinés', 'Manga', 'Comics'],
  books: [],
  currentUser: {},
  isConnected: false,
  token: null,
  error: false,
  errorMessage: null,
  signinSuccess: false
})

export const getters = {
  getBooks: (state) => state.books,
  getCategories: (state) => state.categories,
  getCurrentUser: (state) => state.currentUser,
  getUserConnected: (state) => state.isConnected,
  getToken: (state) => state.token,
  getError: (state) => state.error,
  getErrorMessage: (state) => state.errorMessage,
  getSigninSuccess: (state) => state.signinSuccess
}

export const mutations = {
  setBooks(state, data) {
    state.books = data
  },
  errorLog(state, error) {
    state.error = true
    state.errorMessage = error
  },
  resetErrorLog(state) {
    state.error = false
    state.errorMessage = null
  },
  setCurrentUser(state, data) {
    state.currentUser = data.user
    state.token = data.token
    state.isConnected = true
  },
  newUserSignin(state) {
    state.signinSuccess = true
  }
}

export const actions = {
  // GET routes
  async getAllBooks({ commit }) {
    commit('resetErrorLog')
    await this.$axios
      .get(booksAPI)
      .then((data) => {
        commit('setBooks', data)
      })
      .catch((error) => {
        commit('errorLog', error)
      })
  },
  // POST routes
  async registerNewBook({ dispatch, commit }, payload) {
    commit('resetErrorLog')
    await this.$axios
      .post(booksAPI, payload)
      .then(() => {
        dispatch('getAllBooks')
      })
      .catch((error) => {
        commit('errorLog', error)
      })
  },
  async login({ commit }, payload) {
    commit('resetErrorLog')
    await this.$axios
      .post(`${usersAPI}/login`, payload)
      .then((userData) => {
        commit('setCurrentUser', userData)
      })
      .catch((error) => {
        commit('errorLog', error)
      })
  },
  async signin({ commit }, payload) {
    commit('resetErrorLog')
    await this.$axios
      .post(`${usersAPI}/signin`, payload)
      .then(() => {
        commit('newUserSignin')
      })
      .catch((error) => {
        if (error.response.data.message.includes('User validation failed')) {
          commit('errorLog', 'E-mail déjà utilisé par un autre utilisateur')
        } else {
          commit('errorLog', error.response.data.message)
        }
      })
  }
  // PUT routes
}
