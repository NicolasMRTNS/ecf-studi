<template>
  <v-card>
    <section class="app-header" role="img">
      <h1 class="text-center">Médiathèque La Chapelle-Curreaux</h1>
    </section>
    <p class="text-center">
      Votre médiathèque est dans le regret de vous informer que nous sommes
      actuellement fermés en raison des mesures gouvernementales.
    </p>
    <p class="text-center">
      Nous restons cependant à votre disposition, en vous permettant l'accès
      depuis votre ordinateur ou smartphone.
    </p>
    <p class="text-center">
      N'hésitez donc pas à vous créer un compte ou vous connecter pour profiter
      de toute votre médiathèque.
    </p>
  </v-card>
</template>

<script setup>
export default {
  name: 'AppHeader'
}
</script>

<style lang="scss" scoped>
h1 {
  font-family: 'Lobster', 'Courier New', Courier, monospace;
  font-style: normal;
  font-size: 3em;
  letter-spacing: 0.03em;
  line-height: 1;
  margin-bottom: 20px;
  color: #eee;
}

.app-header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  width: 100%;
  height: 60vh;
  overflow: hidden;
  background-size: cover !important;
  background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 28%,
      rgba(0, 0, 0, 0.65) 100%
    ),
    url(~assets/image-mediatheque.jpg) no-repeat center center scroll;
}

p {
  font-size: 1.2em;
  margin: 5px 0;
}

div :last-child {
  padding-bottom: 10px;
}
</style>
