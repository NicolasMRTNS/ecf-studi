<template>
  <v-card>
    <v-row v-if="getCurrentUser.role === 'employee'">
      <v-col class="d-flex align-center" cols="12">
        <v-text-field
          v-model="titleSearch"
          label="Rechercher par titre"
          outlined
          dense
          class="mb-n6 ml-2"
        ></v-text-field>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <span
              type="button"
              class="material-icons mx-2 icon primary--text"
              v-bind="attrs"
              v-on="on"
              @click="searchByTitle()"
            >
              search
            </span>
          </template>
          <span>Rechercher par titre</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <span
              type="button"
              class="material-icons ml-2 mr-6 icon error--text"
              v-bind="attrs"
              v-on="on"
              @click="deleteTitleSearch()"
            >
              highlight_off
            </span>
          </template>
          <span>Supprimer le filtre</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <AppBookDisplay :bookselection="selectedBooks" :borrowedpage="true" />
  </v-card>
</template>

<script setup>
import { mapGetters } from 'vuex'
import AppBookDisplay from '@/components/AppBookDisplay'

export default {
  middleware: 'auth',

  components: {
    AppBookDisplay
  },

  data() {
    return {
      selectedBooks: [],
      titleSearch: ''
    }
  },

  mounted() {
    this.selectedBooks = this.getBooks
    this.getBorrowedBooks()
  },

  methods: {
    searchByTitle() {
      const newBookSelection = []
      this.selectedBooks.forEach((book) => {
        if (book.title.toLowerCase().includes(this.titleSearch.toLowerCase())) {
          newBookSelection.push(book)
        }
      })
      this.selectedBooks = newBookSelection
      return this.selectedBooks
    },

    deleteTitleSearch() {
      this.titleSearch = ''
      this.getBorrowedBooks()
      return this.selectedBooks
    },

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
      } else if (this.getCurrentUser.role === 'user') {
        this.selectedBooks = this.getBooks.filter(
          (book) =>
            book.available === false &&
            book.borrowedBy === this.getCurrentUser._id
        )
      }
    }
  },

  computed: {
    ...mapGetters(['getUserConnected', 'getCurrentUser', 'getBooks'])
  }
}
</script>

<style lang="scss" scoped></style>
