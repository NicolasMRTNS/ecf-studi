<template>
  <v-card>
    <v-card-title
      class="justify-center text-center"
      style="word-break: break-word"
    >
      Connexion
    </v-card-title>
    <v-form v-model="valid">
      <v-container>
        <v-row class="d-flex justify-center">
          <v-col cols="12" md="4" class="text-center">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              type="email"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col cols="12" md="4" class="text-center">
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Mot de passe"
              type="password"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col cols="12" md="4" class="text-center">
            <v-btn :disabled="!valid" color="success" @click.prevent="validate">
              Valider
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-card-title
      class="justify-center text-center"
      style="word-break: break-word"
      >Pas encore inscrit ?</v-card-title
    >
    <div class="text-center pb-5">
      <v-btn class="primary"
        ><nuxt-link exact to="/signin" class="white--text"
          >Se créer un compte</nuxt-link
        ></v-btn
      >
    </div>
  </v-card>
</template>

<script setup>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    valid: false,
    email: '',
    emailRules: [
      (v) => !!v || "L'e-mail est obligatoire.",
      (v) => /.+@.+/.test(v) || 'Format invalide'
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'Le mot de passe est obligatoire',
      (v) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v) ||
        'Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre'
    ]
  }),

  methods: {
    validate() {
      if (this.valid) {
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })
        setTimeout(
          function () {
            this.redirect()
          }.bind(this),
          1000
        )
      }
    },

    redirect() {
      if (this.getUserConnected) {
        this.$router.push('/catalog')
      }
    }
  },

  computed: {
    ...mapGetters(['getUserConnected'])
  }
}
</script>

<style lang="scss" scoped></style>
