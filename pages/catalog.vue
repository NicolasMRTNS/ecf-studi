<template>
  <v-card>
    <v-card-title class="justify-center">
      Voici les livres que nous proposons :
    </v-card-title>
    <v-row class="d-flex align-center">
      <v-col class="d-flex align-center" cols="12" sm="6">
        <v-select
          :items="categories"
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
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="book in bookSelection"
          :key="book.id"
          lg="3"
          md="6"
          sm="6"
        >
          <v-card>
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              :class="
                book.available
                  ? 'white--text align-end'
                  : 'grey--text align-end'
              "
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="book.title"></v-card-title>
              <v-card-subtitle v-text="book.author"></v-card-subtitle>
              <v-card-text v-text="book.category"></v-card-text>
            </v-img>
            <v-card-actions>
              <v-card-text v-if="!book.available" class="py-0 warning--text"
                >Livre indisponible</v-card-text
              >
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn color="primary" v-bind="attrs" v-on="on"
                    ><nuxt-link :to="`/catalog/${book.id}`" class="white--text">
                      Voir l'ouvrage
                    </nuxt-link>
                  </v-btn>
                </template>
                <span>Voir l'ouvrage</span>
              </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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

    deleteTitleSearch() {
      this.titleSearch = ''
      this.bookSelection = this.books
      return this.bookSelection
    },

    deleteCategorySearch() {
      this.category = ''
      this.bookSelection = this.books
      return this.bookSelection
    },
  },

  computed: {
    ...mapState(['categories', 'books']),
  },
}
</script>

<style lang="scss" scoped>
.icon {
  font-size: 2.2em;
}
</style>
