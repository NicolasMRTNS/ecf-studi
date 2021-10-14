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
  bookRegisteredMessage: '',
  borrowBookMessage: '',
  retrievedBookMessage: '',
  returnedBookMessage: '',
  userDeletedMessage: ''
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
  getBookRegistered: (state) => !!state.bookRegisteredMessage,
  getBorrowBookMessage: (state) => state.borrowBookMessage,
  getBorrowBook: (state) => !!state.borrowBookMessage,
  getRetrievedBookMessage: (state) => state.retrievedBookMessage,
  getRetrievedBook: (state) => !!state.retrievedBookMessage,
  getReturnedBookMessage: (state) => state.returnedBookMessage,
  getReturnedBook: (state) => !!state.returnedBookMessage,
  getUserDeletedMessage: (state) => state.userDeletedMessage,
  getUserDeleted: (state) => !!state.userDeletedMessage
}

export const mutations = {
  setBooks(state, response) {
    state.books = response.data
  },
  setBookRegistered(state, response) {
    state.bookRegisteredMessage = response.data.message
  },
  setBorrowBookConfirmed(state, response) {
    state.borrowBookMessage = response.data.message
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
    state.borrowBookMessage = ''
    state.retrievedBookMessage = ''
    state.returnedBookMessage = ''
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
  setBorrowBookRetrieved(state, response) {
    state.retrievedBookMessage = response.data.message
  },
  setBorrowBookReturned(state, response) {
    state.returnedBookMessage = response.data.message
  },
  setUserDeleted(state, response) {
    state.userDeletedMessage = response.data.message
  },
  newUserSignin(state) {
    state.signinSuccess = true
  },
  disconnect(state) {
    state.isConnected = false
    state.token = null
    state.currentUser = {}
    state.signinSuccess = false
  }
}

export const actions = {
  // GET routes
  async getAllBooks({ commit }) {
    if (this.getters.getAuthenticated) {
      await this.$axios
        .get(booksAPI, {
          headers: {
            Authorization: `Bearer ${this.getters.getToken}`,
            uid: this.getters.getCurrentUser._id
          }
        })
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
        .get(`${usersAPI}/notvalidatedusers`, {
          headers: {
            Authorization: `Bearer ${this.getters.getToken}`,
            uid: this.getters.getCurrentUser._id
          }
        })
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
        .post(booksAPI, payload, {
          headers: {
            Authorization: `Bearer ${this.getters.getToken}`,
            uid: this.getters.getCurrentUser._id
          }
        })
        .then((response) => {
          commit('setBookRegistered', response)
          dispatch('getAllBooks')
        })
        .catch((error) => {
          commit('errorLog', error)
        })
    }
  },
  async login({ commit, dispatch }, payload) {
    commit('resetErrorLog')
    await this.$axios
      .post(`${usersAPI}/login`, payload)
      .then((userData) => {
        commit('setCurrentUser', userData)
        dispatch('getAllBooks')
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
  async injectToDatabase({ commit, dispatch }, payload) {
    if (
      this.getters.getAuthenticated &&
      this.getters.getCurrentUser.role === 'employee' &&
      process.env.env === 'DEV'
    ) {
      commit('resetErrorLog')
      await this.$axios
        .post(`${booksAPI}/inject`, payload, {
          headers: {
            Authorization: `Bearer ${this.getters.getToken}`,
            uid: this.getters.getCurrentUser._id
          }
        })
        .then((response) => {
          dispatch('getAllBooks', response)
        })
        .catch((error) => {
          commit('errorLog', error)
        })
    }
  },

  // PUT routes
  async validateSignin({ commit, dispatch }, payload) {
    if (
      this.getters.getAuthenticated &&
      this.getters.getCurrentUser.role === 'employee'
    ) {
      commit('resetErrorLog')
      await this.$axios
        .put(`${usersAPI}/${payload.userIdConfirmed}/update`, payload, {
          headers: {
            Authorization: `Bearer ${this.getters.getToken}`,
            uid: this.getters.getCurrentUser._id
          }
        })
        .then((response) => {
          dispatch('getNotValidatedUsers')
          commit('setUserValidated', response)
        })
        .catch((error) => {
          commit('errorLog', error.response.data.message)
        })
    }
  },
  async borrowBook({ commit, dispatch }, payload) {
    if (this.getters.getAuthenticated) {
      commit('resetErrorLog')
      await this.$axios
        .put(`${booksAPI}/${payload.bookId}/borrow`, payload, {
          headers: {
            Authorization: `Bearer ${this.getters.getToken}`,
            uid: this.getters.getCurrentUser._id
          }
        })
        .then((response) => {
          dispatch('getAllBooks')
          commit('setBorrowBookConfirmed', response)
        })
        .catch((error) => {
          commit('errorLog', error.response.data.message)
        })
    }
  },
  async confirmBorrowBook({ commit, dispatch }, payload) {
    if (
      this.getters.getAuthenticated &&
      this.getters.getCurrentUser.role === 'employee'
    ) {
      commit('resetErrorLog')
      await this.$axios
        .put(`${booksAPI}/${payload.bookId}/retrieve`, payload, {
          headers: {
            Authorization: `Bearer ${this.getters.getToken}`,
            uid: this.getters.getCurrentUser._id
          }
        })
        .then((response) => {
          dispatch('getAllBooks')
          commit('setBorrowBookRetrieved', response)
        })
        .catch((error) => {
          commit('errorLog', error.response.data.message)
        })
    }
  },
  async confirmBookReturned({ commit, dispatch }, payload) {
    if (
      this.getters.getAuthenticated &&
      this.getters.getCurrentUser.role === 'employee'
    ) {
      commit('resetErrorLog')
      await this.$axios
        .put(`${booksAPI}/${payload.bookId}/return`, payload, {
          headers: {
            Authorization: `Bearer ${this.getters.getToken}`,
            uid: this.getters.getCurrentUser._id
          }
        })
        .then((response) => {
          dispatch('getAllBooks')
          commit('setBorrowBookReturned', response)
        })
        .catch((error) => {
          commit('errorLog', error.response.data.message)
        })
    }
  },
  // DELETE routes
  async deleteUser({ commit, dispatch }, payload) {
    if (
      this.getters.getAuthenticated &&
      this.getters.getCurrentUser.role === 'employee'
    ) {
      commit('resetErrorLog')
      await this.$axios
        .delete(`${usersAPI}/${payload.userIdDeleted}/delete`, {
          headers: {
            Authorization: `Bearer ${this.getters.getToken}`,
            uid: this.getters.getCurrentUser._id
          },
          data: {
            userIdDeleted: payload.userIdDeleted
          }
        })
        .then((response) => {
          dispatch('getNotValidatedUsers')
          commit('setUserDeleted', response)
        })
        .catch((error) => {
          commit('errorLog', error.response.data.message)
        })
    }
  }
}
