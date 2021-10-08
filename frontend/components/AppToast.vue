<template>
  <v-alert dismissible :type="success ? 'success' : 'error'" text>
    <slot></slot>
  </v-alert>
</template>

<script setup>
export default {
  name: 'AppToast',

  props: {
    success: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
