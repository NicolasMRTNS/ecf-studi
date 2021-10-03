<template>
  <v-card v-if="!getUserConnected" class="mt-4 text-center">
    <v-card-title
      class="justify-center text-center"
      style="word-break: break-word"
    >
      Créer votre compte sans plus attendre
    </v-card-title>
    <v-card-text>
      Pour pouvoir créer un compte, c'est très simple : il vous suffit de
      remplir le formulaire ci-dessous. <br />
      <v-btn color="primary"
        ><nuxt-link exact to="/signin" class="white--text"
          >Créer mon compte</nuxt-link
        ></v-btn
      ><br />
      Une fois votre inscription validée, vous recevrez un email de
      confirmation.
    </v-card-text>
    <v-divider></v-divider>
    <v-card-title
      class="justify-center text-center"
      style="word-break: break-word"
    >
      Si vous possédez déjà un compte, connectez-vous.</v-card-title
    >
    <v-card-text
      >Connectez-vous grâce au bouton ci-dessous <br />
      <v-btn color="primary"
        ><nuxt-link exact to="/login" class="white--text"
          >Connexion</nuxt-link
        ></v-btn
      ><br />
      Une fois connecté, vous pourrez accéder au catalogue de la médiathèque et
      réserver des ouvrages.
    </v-card-text>
  </v-card>
  <v-card v-else class="mt-4 text-center">
    Commencez sans plus attendre par consulter notre
    <nuxt-link
      exact
      to="/catalog"
      class="white--text text-decoration-underline hover-link"
      >catalogue</nuxt-link
    >. Vous pourrez ainsi commencer à emprunter des ouvrages. <br />
    Une fois l'ouvrage emprunté en ligne, vous pouvez venir le récupérer à la
    médiathèque. Vous avez jusqu'à trois jours pour récupérer votre emprunt. Une
    fois ce délai dépassé, votre livre sera à nouveau disponible et un autre
    usager pourra alors l'emprunter.
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppPresentation',

  computed: {
    ...mapGetters(['getUserConnected']),
  },
}
</script>

<style lang="scss" scoped></style>
