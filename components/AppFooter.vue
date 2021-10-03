<template>
  <v-footer>
    <v-card flat tile width="100%" class="text-center">
      <v-card-text class="white--text">
        {{ $moment().year() }} —
        <strong>Médiathèque La Chapelle-Curreaux</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script setup>
export default {
  name: 'AppFooter',
}
</script>

<style lang="scss" scoped></style>
