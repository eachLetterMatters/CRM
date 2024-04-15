<template>
  <div class="view-container">
    <div class="left">
      <div class="top">Miejsce na szybkie notatki</div>
      <div class="bottom">Miejsce na akcje do wykonania</div>
    </div>
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
  /* background: yellow; */
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.top {
  display: flex;
  /* background: green; */
  height: 48%;
  width: 98%;
  align-items: center;
  justify-content: center;
  border: 3px solid var(--dark-white);
  background: #ffffff33;
  border-radius: 35px;
  color: var(--dark-background-1);
  margin: 1% 1% 1% 1%;
}

.bottom {
  display: flex;
  /* background: blue; */
  height: 48%;
  width: 98%;
  align-items: center;
  justify-content: center;

  border: 3px solid var(--dark-white);
  background: #ffffff44;
  border-radius: 35px;
  color: var(--dark-background-1);
  margin: 1% 1% 1% 1%;
}
</style>