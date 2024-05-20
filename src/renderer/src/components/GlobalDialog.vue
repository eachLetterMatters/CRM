<template>
  <div v-show="displayDialog" class="backdrop">
    
    <h1>TEST</h1>
    <button @click="closeDialog">Rozumiem</button>
  </div>
</template>

<script>
import { store } from "../store/store";

export default {
  data() {
    return {
      displayDialog: false,
    };
  },
  methods:{
    closeDialog(){
        this.displayDialog = false;
    }
  },
  mounted(){
    store.emitter.on("showDialog", (a) => {
      this.displayDialog = true;
    });
  }
}

</script>

<style scoped>
.backdrop {
  top: 0;
  left: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.65);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
</style>