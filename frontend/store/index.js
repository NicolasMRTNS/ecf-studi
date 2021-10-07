const booksAPI = '/api/books'
const usersAPI = '/api/users'

export const state = () => ({
  categories: ['Roman', 'Bande dessinés', 'Manga', 'Comics'],
  books: [],
  currentUser: {},
  notValidatedUsers: [],
  userValidatedMessage: '',
  isConnected: false,
  token: null,
  error: false,
  errorMessage: null,
  signinSuccess: false,
  bookRegisteredMessage: ''
})

export const getters = {
  getBooks: (state) => state.books,
  getCategories: (state) => state.categories,
  getCurrentUser: (state) => state.currentUser,
  getUserConnected: (state) => state.isConnected,
  getNotValidatedUsers: (state) => state.notValidatedUsers,
  getUserValidatedMessage: (state) => state.userValidatedMessage,
  getUserValidated: (state) => !!state.userValidatedMessage,
  getToken: (state) => state.token,
  getAuthenticated: (state) => !!state.token,
  getError: (state) => state.error,
  getErrorMessage: (state) => state.errorMessage,
  getSigninSuccess: (state) => state.signinSuccess,
  getBookRegisteredMessage: (state) => state.bookRegisteredMessage,
  getBookRegistered: (state) => !!state.bookRegisteredMessage
}

export const mutations = {
  setBooks(state, response) {
    state.books = response.data
  },
  setBookRegistered(state, response) {
    state.bookRegisteredMessage = response.data.message
  },
  errorLog(state, error) {
    state.error = true
    state.errorMessage = error
  },
  resetErrorLog(state) {
    state.error = false
    state.errorMessage = null
    state.userValidatedMessage = ''
    state.bookRegisteredMessage = ''
  },
  setCurrentUser(state, response) {
    state.currentUser = response.data.user
    state.token = response.data.token
    state.isConnected = true
  },
  setNotValidatedUsers(state, response) {
    state.notValidatedUsers = response.data.users
  },
  setUserValidated(state, response) {
    state.userValidatedMessage = response.data.message
  },
  newUserSignin(state) {
    state.signinSuccess = true
  }
}

export const actions = {
  // GET routes
  async getAllBooks({ commit }) {
    if (this.getters.getAuthenticated) {
      commit('resetErrorLog')
      await this.$axios
        .get(booksAPI)
        .then((data) => {
          commit('setBooks', data)
        })
        .catch((error) => {
          commit('errorLog', error)
        })
    }
  },
  async getNotValidatedUsers({ commit }) {
    if (
      this.getters.getAuthenticated &&
      this.getters.getCurrentUser.role === 'employee'
    ) {
      commit('resetErrorLog')
      await this.$axios
        .get(`${usersAPI}/notvalidatedusers`)
        .then((data) => {
          commit('setNotValidatedUsers', data)
        })
        .catch((error) => {
          commit('errorLog', error)
        })
    }
  },

  // POST routes
  async registerNewBook({ dispatch, commit }, payload) {
    if (
      this.getters.getAuthenticated &&
      this.getters.getCurrentUser.role === 'employee'
    ) {
      commit('resetErrorLog')
      await this.$axios
        .post(booksAPI, payload)
        .then((response) => {
          commit('setBookRegistered', response)
          dispatch('getAllBooks')
        })
        .catch((error) => {
          commit('errorLog', error)
        })
    }
  },
  async login({ commit }, payload) {
    commit('resetErrorLog')
    await this.$axios
      .post(`${usersAPI}/login`, payload)
      .then((userData) => {
        commit('setCurrentUser', userData)
      })
      .catch((error) => {
        commit('errorLog', error.response.data.message)
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
  },
  // PUT routes
  async validateSignin({ commit, dispatch }, userId) {
    if (
      this.getters.getAuthenticated &&
      this.getters.getCurrentUser.role === 'employee'
    ) {
      commit('resetErrorLog')
      await this.$axios
        .put(`${usersAPI}/${userId}/update`, { userId })
        .then((response) => {
          dispatch('getNotValidatedUsers')
          commit('setUserValidated', response)
        })
        .catch((error) => {
          commit('errorLog', error.response.data.message)
        })
    }
  }
}
