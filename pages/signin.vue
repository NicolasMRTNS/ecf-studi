<template>
  <v-card>
    <v-card-title
      class="justify-center text-center"
      style="word-break: break-word"
      >Création de compte</v-card-title
    >
    <v-card-text class="text-center"
      >Merci de bien vouloir remplir le formulaire ci-dessous pour vous
      inscrire</v-card-text
    >
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              label="Prénom"
              type="text"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="lastname"
              :rules="nameRules"
              label="Nom"
              type="text"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              type="email"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="birthDate"
              :rules="birthDateRules"
              label="Date de naissance (JJ/MM/AAAA)"
              type="date"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="address"
              :rules="addressRules"
              label="Adresse"
              type="text"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
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
            <v-text-field
              v-model="passwordConfirmation"
              :rules="
                passwordConfirmationRules.concat(passwordConfirmationRule)
              "
              label="Confirmation du mot de passe"
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
        <v-row class="d-flex justify-center">
          <v-col cols="12" md="4" class="text-center">
            <v-btn color="error" @click="reset">Réinitialiser formulaire</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-card-title
      class="justify-center text-center"
      style="word-break: break-word"
      >Déjà inscrit ?</v-card-title
    >
    <div class="text-center pb-5">
      <v-btn class="primary"
        ><nuxt-link exact to="/login" class="white--text"
          >Se connecter</nuxt-link
        ></v-btn
      >
    </div>
  </v-card>
</template>

<script setup>
export default {
  data: () => ({
    valid: false,
    firstname: '',
    lastname: '',
    nameRules: [
      (v) => !!v || 'Le nom est obligatoire',
      (v) => /^[A-Z]+$/i.test(v) || 'Le nom ne peut contenir que des lettres'
    ],
    email: '',
    emailRules: [
      (v) => !!v || "L'e-mail est obligatoire.",
      (v) => /.+@.+/.test(v) || 'Format invalide'
    ],
    birthDate: '',
    birthDateRules: [
      (v) => !!v || 'La date de naissance est obligatoire',
      (v) => /^\d{4}-\d{2}-\d{2}$/.test(v) || 'Format invalide (JJ/MM/AAAA)'
    ],
    address: '',
    addressRules: [
      (v) => !!v || "L'adresse est obligatoire.",
      (v) =>
        /.+\d{5}.+/.test(v) ||
        "L'adresse doit contenir un code postal de 5 chiffres"
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'Le mot de passe est obligatoire',
      (v) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v) ||
        'Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre'
    ],
    passwordConfirmation: '',
    passwordConfirmationRules: [
      (v) => !!v || 'La confirmation du mot de passe est obligatoire'
    ]
  }),

  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.passwordConfirmation ||
        'Les mots de passes doivent être identiques'
    }
  },

  methods: {
    validate() {
      if (this.valid) {
        const payload = {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          birthDate: this.birthDate,
          address: this.address,
          password: this.password
        }
        this.$store.dispatch('register', payload)
      }
    },
    reset() {
      this.firstname = ''
      this.lastname = ''
      this.email = ''
      this.birthDate = ''
      this.address = ''
      this.password = ''
      this.passwordConfirmation = ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
