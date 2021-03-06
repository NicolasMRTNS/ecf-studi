<template>
  <v-container fluid>
    <v-row v-if="bookselection.length !== 0" dense>
      <v-col
        v-for="book in bookselection"
        :key="book.id"
        lg="3"
        md="4"
        sm="6"
        class="d-flex flex-column align-center"
      >
        <v-card width="310px" elevation="18">
          <div class="d-flex">
            <v-img
              :src="book.cover"
              :alt="`Couverture de ${book.title}`"
              :gradient="
                book.available ? '' : 'to top, rgba(0,0,0,.33), rgba(0,0,0,.7)'
              "
              height="200px"
              max-width="150px"
              class="ml-2"
            >
            </v-img>
            <v-spacer></v-spacer>
            <div
              :class="
                book.available
                  ? 'white--text align-end'
                  : 'grey--text align-end'
              "
              class="mr-2"
            >
              <v-card-title
                style="word-break: break-word"
                v-text="book.title"
              ></v-card-title>
              <v-card-subtitle v-text="book.author"></v-card-subtitle>
              <v-card-text v-text="book.category"></v-card-text>
            </div>
          </div>
          <v-card-actions>
            <v-card-text
              v-if="!book.available && borrowedpage === false"
              class="py-0 pl-0 warning--text"
              >Indisponible</v-card-text
            >
            <v-card-text
              v-if="borrowedpage && book.borrowConfirmed"
              :class="
                $moment(book.dueDate).unix() <= $moment().unix()
                  ? 'warning--text'
                  : 'white--text'
              "
              class="pl-0"
              >À rendre avant le
              {{ $moment(book.dueDate).format('LL') }}</v-card-text
            >
            <v-card-text
              v-if="
                borrowedpage &&
                book.borrowedDate != null &&
                !book.borrowConfirmed
              "
              class="pl-0"
            >
              À retirer avant le
              {{ $moment(book.borrowedDate).add(3, 'days').format('LL') }}
            </v-card-text>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <nuxt-link :to="`/books/${book._id}`" class="white--text">
                  <v-btn color="primary" v-bind="attrs" v-on="on">
                    Voir l'ouvrage
                  </v-btn>
                </nuxt-link>
              </template>
              <span>Voir l'ouvrage</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-card v-else-if="bookselection.length === 0 && borrowedpage">
      <v-card-text class="text-center">Aucun emprunt à votre nom.</v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { mapGetters } from 'vuex'

export default {
  name: 'AppBookDisplay',
  props: {
    bookselection: {
      type: Array,
      required: true
    },
    borrowedpage: {
      type: Boolean,
      required: false
    }
  },

  computed: {
    ...mapGetters(['getCurrentUser'])
  }
}
</script>

<style lang="scss" scoped></style>
