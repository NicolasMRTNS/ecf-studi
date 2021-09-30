<template>
  <div>
    <v-card class="mt-4 text-center">
      <v-card-title class="justify-center">
        Créer votre compte sans plus attendre
      </v-card-title>
      <v-card-text>
        Pour pouvoir créer un compte, c'est très simple : il vous suffit de
        remplir le formulaire ci-dessous. <br />
        <v-btn><nuxt-link exact to="/signin">Créer mon compte</nuxt-link></v-btn
        ><br />
        Une fois votre inscription validée, vous recevrez un email de
        confirmation.
      </v-card-text>
      <v-divider></v-divider>
      <v-card-title class="justify-center"
        >Si vous possédez déjà un compte, connectez-vous.</v-card-title
      >
      <v-card-text
        >Connectez-vous grâce au bouton ci-dessous <br />
        <v-btn><nuxt-link exact to="/login">Connexion</nuxt-link></v-btn
        ><br />
        Une fois connecté, vous pourrez accéder au catalogue de la médiathèque
        et réserver des ouvrages.
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'AppPresentation',
}
</script>

<style></style>
