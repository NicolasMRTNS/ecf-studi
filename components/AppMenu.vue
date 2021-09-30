<template>
  <v-card flat tile width="100%" class="text-center">
    <v-card-text class="white--text">
      <nuxt-link class="brand" exact to="/">Accueil Médiathèque</nuxt-link>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AppMenu',
}
</script>

<style scss scoped>
.brand {
  font-size: 1.5rem;
}
</style>
