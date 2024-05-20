<template>
  <div class="view-container">
    <div class="task-list" style="width:100%;">
      <ul style="width: 100%; height:100%; display: flex; flex-direction: column;">
        <ClientItem
          v-for="(clientData, index) in allClients"
          :key="index"
          v-bind:client="clientData"
        />
      </ul>
    </div>

    <div class="floating-container">
      <div class="floating-add" @click="addClient()">+</div>
    </div>
  </div>
</template>

<script>
import ClientItem from "./ClientItem.vue";

export default {
  data() {
    return {
      message: "Hello, Cients!",
      allClients: [],
    };
  },
  components: {
    ClientItem,
  },
  methods: {
    changeMessage() {
      this.message = "Hello, World!";
    },
    addClient(){
      window.api.addClient();
      window.api.getNames()
      .then((names) => {
        this.allClients = names;
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },
  computed: {
    // allClients() {
    //   data = window.api
    //     .getNames()
    //     .then((names) => {
    //       console.log(names);
    //       return names;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       return ["dodupy", "siema"];
    //     });
    //     return data;
    // },
  },
  mounted() {
    window.api.getNames()
      .then((names) => {
        this.allClients = names;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>

.floating-container{
  /* background: yellow; */
  position: fixed;
  width: 100px;
  height: 100px;
  bottom: 0;
  right: 0;
  margin: 25px 25px;
}

.floating-container:hover .floating-add{
  transform: translatey(-3px);
  transition: all 0.3s;
  /* background: var(--dark-blue); */
}

.floating-add{
  position:absolute;
  width: 65px;
  height:65px;
  background: var(--theme-color);
  bottom: 0;
  border-radius: 50%;
  /* left: 0; */
  right: 0;
  color: white;
  line-height: 65px;
  text-align: center;
  font-size:center;
  font-size: 23px;
  z-index: 99;
  cursor: pointer;
}


</style>