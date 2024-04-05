<template>
  <div class="view-container">
    Klienci
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello, Cients!'
    };
  },
  methods: {
    changeMessage() {
      this.message = 'Hello, World!';
    }
  }
};
</script>

<style scoped>
/* Your component-specific CSS goes here */
h1 {
  color: blue;
}
</style>