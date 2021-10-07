<template>
  <v-alert
    v-if="!closeAlert"
    outlined
    :type="success ? 'success' : 'error'"
    text
    @click="close()"
  >
    <slot></slot>
    (Cliquez pour faire disparaître)
  </v-alert>
</template>

<script setup>
export default {
  name: 'AppToast',

  data() {
    return {
      closeAlert: false
    }
  },

  props: {
    success: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    close() {
      this.closeAlert = !this.closeAlert
    }
  }
}
</script>

<style lang="scss" scoped></style>
