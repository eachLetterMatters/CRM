<template>
  <div class="view-container">
      <div class="left">Miejsce na akcje do wykonania</div>
      <div class="right">Miejsce na szybkie notatki</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Hello, Home!",
    };
  },
  methods: {
    changeMessage() {
      this.message = "Hello, World!";
    },
  },
};
</script>

<style scoped>
.left {
  display: flex;
  /* background: blue; */
  height: calc(100% - 32px);
  /* width: 50% - 24px; */
  width: calc(76% - 24px);
  align-items: center;
  justify-content: center;

  border: 3px solid var(--dark-white);
  background: #ffffff44;
  /* background: red; */
  border-radius: 35px;
  color: var(--dark-background-1);
  margin: 16px 8px 16px 16px;
  /* margin: 16px 0px 16px 0px; */
}

.right {
  display: flex;
  /* background: green; */
  height: calc(100% - 32px);
  /* width: 50% - 24px; */
  width: calc(24% - 24px);
  align-items: center;
  justify-content: center;
  border: 3px solid var(--dark-white);
  background: #ffffff33;
  /* background: yellow; */
  border-radius: 35px;
  color: var(--dark-background-1);
  margin: 16px 16px 16px 8px;
  /* margin: 16px 0px 16px 0px; */
}

</style>