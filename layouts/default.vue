<template>
  <v-app>
    <div class="content">
      <AppMenu />
      <Nuxt />
    </div>
    <AppFooter />
  </v-app>
</template>

<script>
import AppMenu from '@/components/AppMenu.vue'
import AppFooter from '@/components/AppFooter.vue'
export default {
  components: {
    AppMenu,
    AppFooter,
  },
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
