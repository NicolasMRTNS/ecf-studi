<template>
  <main>
    <AppHeader />
    <AppPresentation />
  </main>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppPresentation from '~/components/AppPresentation.vue'

export default {
  components: { AppPresentation, AppHeader },
}
</script>

<style lang="scss" scoped></style>
