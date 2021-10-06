<template>
  <v-card v-if="getUserConnected && getCurrentUser.role === 'employee'">
    <v-card-title
      class="justify-center text-center"
      style="word-break: break-word"
      >Enregistrer un nouvel ouvrage</v-card-title
    >
    <v-card-text class="text-center"
      >Pour ajouter un ouvrage au catalogue de la médiathèque, merci de remplir
      ce formulaire.</v-card-text
    >
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="title"
              :rules="titleRules"
              label="Titre"
              type="text"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="author"
              :rules="authorRules"
              label="Auteur"
              type="text"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-select
              :items="getCategories"
              label="Catégorie"
              @change="categorySelected($event)"
            ></v-select>
          </v-col>

          <v-col cols="12" md="4">
            <v-textarea
              v-model="description"
              :rules="descriptionRules"
              name="input-7-4"
              label="Description de l'ouvrage"
              required
            ></v-textarea>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="publishingDate"
              :rules="publishingDateRules"
              label="Date de publication (JJ/MM/AAAA)"
              type="date"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-file-input
              v-model="image"
              :rules="imageRules"
              small-chips
              label="Ajouter une image"
              show-size
              truncate-length="50"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col cols="12" md="4" class="text-center">
            <v-btn
              :disabled="!valid"
              color="success"
              @click.prevent="registerNewBook()"
            >
              Valider
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col cols="12" md="4" class="text-center">
            <v-btn color="error" @click="reset()"
              >Réinitialiser formulaire</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script setup>
import { mapGetters } from 'vuex'

export default {
  middleware: 'employee',

  data() {
    return {
      valid: false,
      title: '',
      titleRules: [(v) => !!v || 'Le titre est obligatoire.'],
      author: '',
      authorRules: [(v) => !!v || "Le nom de l'auteur est obligatoire."],
      description: '',
      descriptionRules: [(v) => !!v || 'La description est obligatoire.'],
      publishingDate: '',
      publishingDateRules: [
        (v) => !!v || 'La date de publication est obligatoire.',
        (v) =>
          /^\d{4}-\d{2}-\d{2}$/.test(v) ||
          'La date de publication est invalide.'
      ],
      category: '',
      image: null,
      imageFileExtensions: ['jpg', 'jpeg', 'png', 'gif'],
      imageRules: [
        (v) => !!v || "L'image est obligatoire.",
        (v) =>
          this.imageFileExtensions.includes(v?.name.split('.').pop()) ||
          "L'image doit être au format jpg, jpeg, png ou gif."
      ]
    }
  },

  methods: {
    categorySelected(option) {
      this.category = option
    },

    reset() {
      this.title = ''
      this.author = ''
      this.description = ''
      this.publishingDate = ''
      this.category = ''
      this.image = null
    },

    registerNewBook() {
      if (this.valid) {
        const payload = {
          title: this.title,
          author: this.author,
          description: this.description,
          publishingDate: this.publishingDate,
          category: this.category,
          cover: this.image
        }
        this.$store.dispatch('registerNewBook', payload)
      }
    }
  },

  computed: {
    ...mapGetters(['getCategories', 'getCurrentUser', 'getUserConnected'])
  }
}
</script>

<style lang="scss" scoped></style>
