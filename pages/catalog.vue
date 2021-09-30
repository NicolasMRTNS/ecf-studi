<template>
  <v-card>
    <v-card-title class="justify-center">
      Voici les livres que nous proposons :
    </v-card-title>
    <v-row class="d-flex justify-center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="categories"
          label="Catégories"
          dense
          outlined
          @change="changeCategory($event)"
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="12" sm="6">
        <v-text-field
          v-model="titleSearch"
          label="Rechercher par titre"
          outlined
          dense
        ></v-text-field>
        <v-btn color="primary" @click="searchByTitle()">Rechercher</v-btn>
      </v-col>
    </v-row>
    <div class="d-flex">
      <div v-for="book in bookSelection" :key="book.id">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item two-line>
            <v-list-item-content>
              <div class="text-overline mb-4">{{ book.category }}</div>
              <v-list-item-title class="text-h5 mb-1">
                {{ book.title }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ book.author }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="250px"
          ></v-img>

          <v-card-actions>
            <v-btn outlined rounded text> Voir l'ouvrage </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { mapState } from 'vuex'

export default {
  data: () => ({
    category: '',
    titleSearch: '',
    bookSelection: [],
  }),

  mounted() {
    this.bookSelection = this.$store.state.books
  },

  methods: {
    changeCategory(option) {
      this.category = option
      this.filterBookSelection()
    },

    filterBookSelection() {
      const newBookSelection = []
      this.books.forEach((book) => {
        if (book.category === this.category) {
          newBookSelection.push(book)
        }
      })
      this.bookSelection = newBookSelection
      return this.bookSelection
    },

    searchByTitle() {
      const newBookSelection = []
      this.books.forEach((book) => {
        if (book.title.toLowerCase().includes(this.titleSearch.toLowerCase())) {
          newBookSelection.push(book)
        }
      })
      this.bookSelection = newBookSelection
      return this.bookSelection
    },
  },

  computed: {
    ...mapState(['categories', 'books']),
  },
}
</script>

<style lang="scss" scoped></style>
