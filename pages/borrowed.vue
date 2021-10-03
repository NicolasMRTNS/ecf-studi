<template>
  <v-card>
    <AppBookDisplay :bookselection="selectedBooks" />
  </v-card>
</template>

<script setup>
import { mapGetters } from 'vuex'
import AppBookDisplay from '@/components/AppBookDisplay'

export default {
  middleware: 'auth',

  components: {
    AppBookDisplay,
  },

  data() {
    return {
      selectedBooks: [],
    }
  },

  mounted() {
    this.selectedBooks = this.getBooks
    this.getBorrowedBooks()
  },

  methods: {
    getBorrowedBooks() {
      if (this.getCurrentUser.role === 'employee') {
        this.selectedBooks = this.getBooks.filter(
          (book) => book.available === false
        )
        const booksArray = []
        this.selectedBooks.forEach((book) => {
          if (this.$moment(book.dueDate).unix() <= this.$moment().unix()) {
            booksArray.unshift(book)
          } else {
            booksArray.push(book)
          }
        })
        this.selectedBooks = booksArray
      }
    },
  },

  computed: {
    ...mapGetters(['getUserConnected', 'getCurrentUser', 'getBooks']),
  },
}
</script>

<style lang="scss" scoped></style>
