<template>
  <v-app>
    <div class="content">
      <AppMenu />
      <AppToast v-if="getSigninSuccess" :success="true"
        >Votre inscription est bien enregistrée. Vous allez être
        redirigé.</AppToast
      >
      <AppToast v-if="getUserConnected" :success="true"
        >Vous êtes maintenant connecté.</AppToast
      >
      <AppToast v-if="getUserValidated" :success="true">
        {{ getUserValidatedMessage }}
      </AppToast>
      <AppToast v-if="getBookRegistered" :success="true">
        {{ getBookRegisteredMessage }}
      </AppToast>
      <AppToast v-if="getError" :success="false">{{
        getErrorMessage
      }}</AppToast>
      <Nuxt />
    </div>
    <AppFooter />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import AppMenu from '@/components/AppMenu'
import AppToast from '@/components/AppToast'
import AppFooter from '@/components/AppFooter'

export default {
  name: 'AppLayout',

  components: {
    AppMenu,
    AppToast,
    AppFooter
  },

  computed: {
    ...mapGetters([
      'getSigninSuccess',
      'getUserConnected',
      'getUserValidated',
      'getUserValidatedMessage',
      'getBookRegisteredMessage',
      'getBookRegistered',
      'getError',
      'getErrorMessage'
    ])
  }
}
</script>

<style>
html {
  font-family: 'Blinker', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: #f5f5f5;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.content {
  min-height: calc(100vh - 70px);
  padding-left: 16px;
  padding-right: 16px;
}

@media (max-width: 768px) {
  .content {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
