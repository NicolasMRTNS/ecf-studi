<template>
  <v-container fluid>
    <v-card class="text-center">
      <h1 v-if="error">Une erreur est survenue.</h1>
      <v-card-text
        >Une erreur est survenue, vous pouvez revenir à la page d'accueil en
        cliquant sur le lien suivant :
        <nuxt-link exact to="/"> Page d'accueil. </nuxt-link><br />
        Vous serez automatiquement redirigé vers la page d'accueil dans quelques
        secondes.
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  layout: 'AppLayout',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  mounted() {
    setTimeout(
      function () {
        this.$router.push('/')
      }.bind(this),
      5000
    )
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
