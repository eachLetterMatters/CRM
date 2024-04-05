<template>
    <div class="view-container">
      Dzień dobry
    </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello, Home!'
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
  color: red;
}
</style>