<template>
  <v-container fluid>
    <v-row dense>
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
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
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
              class="py-0 warning--text"
              >Ouvrage indisponible</v-card-text
            >
            <v-card-text
              v-if="borrowedpage && book.borrowConfirmed"
              :class="
                $moment(book.dueDate).unix() <= $moment().unix()
                  ? 'warning--text'
                  : 'white--text'
              "
              >À rendre le {{ $moment(book.dueDate).format('LL') }}</v-card-text
            >
            <v-card-text v-if="borrowedpage && book.borrowedDate != null">
              À récupérer avant le
              {{ $moment(book.borrowedDate).add(3, 'days').format('LL') }}
            </v-card-text>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn color="primary" v-bind="attrs" v-on="on"
                  ><nuxt-link :to="`/books/${book._id}`" class="white--text">
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
