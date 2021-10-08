<template>
  <v-container class="mb-6">
    <v-row class="justify-center">
      <h1 class="text-center my-6">
        Informations concernant {{ currentBook.title }}
      </h1>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-row class="align-center text-center">
            <v-col cols="12" md="6">
              <v-card-title
                class="justify-center"
                style="word-break: break-word"
                ><h2>
                  Titre :
                  {{ currentBook.title }}
                </h2>
              </v-card-title>
              <v-card-subtitle
                ><h3>
                  Auteur :
                  {{ currentBook.author }}
                </h3>
              </v-card-subtitle>
              <v-card-text>
                Date de parution :
                {{ $moment(currentBook.publishingDate).format('LL') }}<br />
                Genre :
                {{ currentBook.category }}<br />
                Disponibilité :
                <span
                  :class="
                    currentBook.available ? 'success--text' : 'error--text'
                  "
                >
                  {{
                    currentBook.available ? 'Disponible' : 'Indisponible'
                  }} </span
                ><br />
                Description :
                {{ currentBook.description }}<br />
                Ajouté à la Médiathèque le
                {{ $moment(currentBook.createdAt).format('LL') }}<br />
                <span
                  v-if="!currentBook.available && currentBook.dueDate != null"
                  class="font-italic"
                  >Retour d'emprunt le
                  {{ $moment(currentBook.dueDate).format('LL') }}</span
                >
              </v-card-text>
            </v-col>
            <v-col cols="12" md="6">
              <v-img
                :src="currentBook.cover"
                :alt="`Couverture de ${currentBook.title}`"
                class="book-cover mx-auto"
              ></v-img>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              v-if="getCurrentUser.role === 'user'"
              cols="12"
              class="text-center"
            >
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    :disabled="!currentBook.available"
                    v-bind="attrs"
                    v-on="on"
                    @click="borrowBook()"
                    v-text="
                      currentBook.available ? 'Emprunter' : 'Indisponible'
                    "
                  >
                  </v-btn>
                </template>
                <span>Emprunter cet ouvrage</span>
              </v-tooltip>
            </v-col>
            <v-col
              v-if="
                getCurrentUser.role === 'employee' &&
                !currentBook.available &&
                !currentBook.borrowConfirmed
              "
              cols="12"
              class="text-center"
            >
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    color="success"
                    v-bind="attrs"
                    v-on="on"
                    @click="confirmBorrowBook()"
                  >
                    Confirmer l'emprunt
                  </v-btn>
                </template>
                <span>Confirmer l'emprunt</span>
              </v-tooltip>
            </v-col>
            <v-col
              v-if="
                getCurrentUser.role === 'employee' &&
                !currentBook.available &&
                currentBook.borrowConfirmed
              "
              cols="12"
              class="text-center"
            >
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    color="warning"
                    v-bind="attrs"
                    v-on="on"
                    @click="confirmBookReturned()"
                  >
                    Confirmer le retour
                  </v-btn>
                </template>
                <span>Confirmer le retour</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { mapGetters } from 'vuex'

export default {
  middleware: 'auth',

  data() {
    return {
      id: this.$route.params.id
    }
  },

  computed: {
    ...mapGetters(['getBooks', 'getCurrentUser', 'getAuthenticated']),

    currentBook() {
      let result
      // Using a for loop so we can break once we find the book
      for (let i = 0; i < this.getBooks.length; i++) {
        if (this.getBooks[i]._id === this.id) {
          result = this.getBooks[i]
          break
        }
      }
      return result
    }
  },

  methods: {
    borrowBook() {
      if (this.getAuthenticated && this.getCurrentUser.role === 'user') {
        const payload = {
          bookId: this.id,
          userId: this.getCurrentUser._id
        }
        this.$store.dispatch('borrowBook', payload)
        setTimeout(
          function () {
            this.redirect('catalog')
          }.bind(this),
          1000
        )
      }
    },

    confirmBorrowBook() {
      if (this.getAuthenticated && this.getCurrentUser.role === 'employee') {
        const payload = {
          bookId: this.id,
          employeeId: this.getCurrentUser._id
        }
        this.$store.dispatch('confirmBorrowBook', payload)
        setTimeout(
          function () {
            this.redirect('borrowed')
          }.bind(this),
          1000
        )
      }
    },

    confirmBookReturned() {
      if (this.getAuthenticated && this.getCurrentUser.role === 'employee') {
        const payload = {
          bookId: this.id
        }
        this.$store.dispatch('confirmBookReturned', payload)
        setTimeout(
          function () {
            this.redirect('borrowed')
          }.bind(this),
          1000
        )
      }
    },

    redirect(page) {
      this.$router.push(`/${page}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.book-cover {
  width: 400px;
  height: 500px;
}

@media screen and (max-width: 600px) {
  .book-cover {
    justify-content: center;
  }
}
</style>
