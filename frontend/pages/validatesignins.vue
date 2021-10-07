<template>
  <v-card>
    <AppUsersDisplay
      v-if="getNotValidatedUsers.length !== 0"
      :users="getNotValidatedUsers"
    />
    <v-card-text v-else class="text-center">
      Aucune inscription en attente de validation.
    </v-card-text>
  </v-card>
</template>

<script setup>
import { mapGetters } from 'vuex'
import AppUsersDisplay from '@/components/AppUsersDisplay'

export default {
  middleware: 'employee',

  components: {
    AppUsersDisplay
  },

  mounted() {
    this.$store.dispatch('getNotValidatedUsers')
  },

  computed: {
    ...mapGetters(['getNotValidatedUsers'])
  }
}
</script>

<style lang="scss" scoped></style>
