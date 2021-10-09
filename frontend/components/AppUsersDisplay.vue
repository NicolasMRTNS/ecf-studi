<template>
  <v-container fluid>
    <v-row dense>
      <v-col
        v-for="user in users"
        :key="user._id"
        lg="3"
        md="4"
        sm="6"
        class="d-flex flex-column align-center"
      >
        <v-card width="310px" elevation="18" class="text-center"
          ><v-card-title
            style="word-break: break-word"
            class="justify-center"
            v-text="`${user.firstname} ${user.lastname}`"
          ></v-card-title>
          <v-card-subtitle v-text="user.email"></v-card-subtitle>
          <v-card-text v-text="user.address"></v-card-text>
          <v-card-text
            class="pt-0"
            v-text="$moment(user.birthDate).format('LL')"
          ></v-card-text>
          <div class="d-flex justify-center">
            <v-card-actions
              ><v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    @click="validateSignin(user._id)"
                  >
                    Valider
                  </v-btn>
                </template>
                <span>Valider l'inscription</span>
              </v-tooltip></v-card-actions
            >
            <v-card-actions>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    color="error"
                    v-bind="attrs"
                    v-on="on"
                    @click="deleteUser(user._id)"
                  >
                    Supprimer
                  </v-btn>
                </template>
                <span>Supprimer l'inscription</span>
              </v-tooltip></v-card-actions
            >
          </div>
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
      const payload = {
        userIdConfirmed: userId
      }
      this.$store.dispatch('validateSignin', payload)
    },
    deleteUser(userId) {
      const payload = {
        userIdDeleted: userId
      }
      this.$store.dispatch('deleteUser', payload)
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
