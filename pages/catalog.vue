<template>
  <v-card>
    <v-card-title
      class="justify-center text-center"
      style="word-break: break-word"
    >
      Voici les livres que nous proposons :
    </v-card-title>
    <v-row class="d-flex align-center">
      <v-col class="d-flex align-center" cols="12" sm="6">
        <v-select
          :items="getCategories"
          label="Catégories"
          dense
          outlined
          class="mb-n6 ml-2"
          @change="changeCategory($event)"
        ></v-select>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <span
              type="button"
              class="material-icons ml-2 mr-6 icon error--text"
              v-bind="attrs"
              v-on="on"
              @click="deleteCategorySearch()"
            >
              highlight_off
            </span>
          </template>
          <span>Supprimer le filtre</span>
        </v-tooltip>
      </v-col>
      <v-col class="d-flex align-center" cols="12" sm="6">
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
    <AppBookDisplay :bookselection="bookSelection" />
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

  data: () => ({
    category: '',
    titleSearch: '',
    bookSelection: []
  }),

  mounted() {
    this.bookSelection = this.getBooks
  },

  methods: {
    changeCategory(option) {
      this.category = option
      this.filterBookSelection()
    },

    filterBookSelection() {
      const newBookSelection = []
      this.getBooks.forEach((book) => {
        if (book.category === this.category) {
          newBookSelection.push(book)
        }
      })
      this.bookSelection = newBookSelection
      return this.bookSelection
    },

    searchByTitle() {
      const newBookSelection = []
      this.getBooks.forEach((book) => {
        if (book.title.toLowerCase().includes(this.titleSearch.toLowerCase())) {
          newBookSelection.push(book)
        }
      })
      this.bookSelection = newBookSelection
      return this.bookSelection
    },

    deleteTitleSearch() {
      this.titleSearch = ''
      this.bookSelection = this.getBooks
      return this.bookSelection
    },

    deleteCategorySearch() {
      this.category = ''
      this.bookSelection = this.getBooks
      return this.bookSelection
    }
  },

  computed: {
    ...mapGetters(['getCategories', 'getBooks'])
  }
}
</script>

<style lang="scss" scoped>
.icon {
  font-size: 2.2em;
}
</style>
