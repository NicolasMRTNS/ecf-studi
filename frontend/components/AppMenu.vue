<template>
  <v-card flat tile width="100%" class="text-center my-2 py-5">
    <v-menu transition="slide-y-transition" bottom>
      <template #activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Menu Médiathèque
        </v-btn>
      </template>
      <v-list class="text-center">
        <v-list-item
          v-for="(link, i) in getUserConnected
            ? connectedLinks
            : notConnectedLinks"
          :key="i"
        >
          <v-list-item-title
            ><nuxt-link
              exact
              :to="link.page"
              class="white--text text-decoration-underline"
              >{{ link.name }}</nuxt-link
            ></v-list-item-title
          >
        </v-list-item>
        <v-list-item v-if="getCurrentUser.role === 'employee'">
          <v-list-item-title
            ><nuxt-link
              exact
              to="/registerbook"
              class="white--text text-decoration-underline"
              >Enregistrer un ouvrage</nuxt-link
            ></v-list-item-title
          >
        </v-list-item>
        <v-list-item v-if="getCurrentUser.role === 'employee'">
          <v-list-item-title
            ><nuxt-link
              exact
              to="/validatesignins"
              class="white--text text-decoration-underline"
              >Valider inscriptions</nuxt-link
            ></v-list-item-title
          >
        </v-list-item>
        <v-list-item v-if="getUserConnected">
          <v-list-item-title
            ><v-btn
              class="white--text text-decoration-underline"
              @click="disconnect"
              >Se déconnecter</v-btn
            ></v-list-item-title
          >
        </v-list-item>
        <v-list-item
          v-if="
            getUserConnected && getCurrentUser.role === 'employee' && isDevEnv
          "
        >
          <v-list-item-title>
            <v-btn
              class="white--text text-decoration-underline"
              color="warning"
              @click="injectToDatabase"
            >
              Injecter données
            </v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppMenu',

  data() {
    return {
      notConnectedLinks: [
        {
          name: 'Accueil',
          page: '/'
        },
        {
          name: 'Connexion',
          page: '/login'
        },
        {
          name: 'Inscription',
          page: '/signin'
        }
      ],
      connectedLinks: [
        {
          name: 'Accueil',
          page: '/'
        },
        {
          name: 'Catalogue',
          page: '/catalog'
        },
        {
          name: 'Emprunts',
          page: '/borrowed'
        }
      ],
      isDevEnv: process.env.env === 'DEV'
    }
  },

  computed: {
    ...mapGetters(['getUserConnected', 'getCurrentUser'])
  },

  methods: {
    disconnect() {
      this.$store.commit('disconnect')
      this.$router.push('/')
    },
    injectToDatabase() {
      this.$store.dispatch('injectToDatabase')
    }
  }
}
</script>

<style scss scoped>
.brand {
  font-size: 1.4rem;
}
</style>
