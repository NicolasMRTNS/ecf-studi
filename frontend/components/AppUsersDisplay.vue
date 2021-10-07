<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="user in users" :key="user._id" lg="3" md="6" sm="6">
        <v-card
          ><v-card-title
            style="word-break: break-word"
            v-text="`${user.firstname} ${user.lastname}`"
          ></v-card-title>
          <v-card-subtitle v-text="user.email"></v-card-subtitle>
          <v-card-text v-text="user.address"></v-card-text>
          <v-card-text
            class="pt-0"
            v-text="$moment(user.birthDate).format('LL')"
          ></v-card-text>
          <v-card-actions
            ><v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                  @click="validateSignin(user._id)"
                >
                  Valider l'inscription
                </v-btn>
              </template>
              <span>Valider l'inscription</span>
            </v-tooltip></v-card-actions
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
export default {
  name: 'AppUsersDisplay',

  props: {
    users: {
      type: Array,
      required: true
    }
  },

  methods: {
    validateSignin(userId) {
      this.$store.dispatch('validateSignin', userId)
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 455px) {
  .v-card {
    text-align: center;
  }
  .v-card__title,
  .v-card__actions {
    justify-content: center;
  }
}
</style>
