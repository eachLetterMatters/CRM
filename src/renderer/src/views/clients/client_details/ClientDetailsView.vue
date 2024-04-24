<template>
  <div class="view-container">
    <div class="left">
      <div class="top">
        <h1 class="title-name">{{ client.name }}</h1>
        <p>
          <img class="icon" src="../../../assets/icons/ic--phone.svg" />
          {{ client.phone_number }}
        </p>
        <p>
          <img class="icon" src="../../../assets/icons/ic--www.svg" />
          {{ client.www }}
        </p>
        <p>
          <img class="icon" src="../../../assets/icons/ic--facebook.svg" />
          {{ client.fb }}
        </p>

        <button @click="removeClient(client.id)">testowe usuń</button>
      </div>
      <div class="bottom">
        <!-- Miejsce na liste osób -->
        <PersonList/>

      </div>
    </div>
    <div class="right">Miejsce na historie i akcje</div>
  </div>
</template>

<script>
import PersonList from './PersonList.vue';
// import { shell} from 'electron'
// const { shell } = require('electron')


export default {
  components: {
    PersonList,
  },
  data() {
    return {
      client: {},
    };
  },
  methods: {
    // openInBrowser(link){
    //     window.api.openInBrowser(link);
    //     // shell.openExternal('https://' + link);
    // },
    removeClient(id) {
      window.api.removeClient(id);
      this.$router.push({ name: "clients" });
    },
  },
  mounted() {
    // console.log(this.$route.params.id);
    window.api
      .getClient(this.$route.params.id)
      .then((client) => {
        console.log(client);
        this.client = client;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.left {
  display: flex;
  /* background: yellow; */
  width: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.right {
  display: flex;
  background: #ffffff33;
  width: 48%;
  align-items: center;
  justify-content: center;
  margin: 1% 1% 1% 1%;
  border: 3px solid var(--dark-white);
  border-top-right-radius: 35px;
  border-bottom-right-radius: 35px;
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
  border-top-left-radius: 35px;
  color: var(--dark-background-1);
  margin: 1% 1% 1% 1%;
  /*  */

  flex-direction: column;
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
  border-bottom-left-radius: 35px;
  color: var(--dark-background-1);
  margin: 1% 1% 1% 1%;
}

.title-name {
  font-size: 48px;
}

.klient {
  /* background: red; */
  height: 100%;
  display: flex;
  background: var(--dark-white);
  align-items: center;
  justify-content: center;
}

</style>