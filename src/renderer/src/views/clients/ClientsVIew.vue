<template>
  <AddClientForm v-if="showAddForm" @closeForm="toggleAddForm" />
  <div class="main-container">
    <div style="width: 100%; height: 100%">
      <!-- FILTER PANEL -->
      <div class="filer-panel">
        <input
          class="text-input"
          type="text"
          v-model="searchValue"
          placeholder="Search title.."
        />

        <!-- ?is_active ?is_commercial ?ocena -->
        <!-- <button class="filter-button" :style="{ backgroundColor: currentColor }" @click="changeState"> -->
        <button class="filter-button" @click="changeCommercialState">
          <img
            src="../../assets/icons/government.svg"
            :class="getGovernmentIconClass()"
          />
          <img
            src="../../assets/icons/company.svg"
            :class="getCompanyIconClass()"
          />
          <!-- {{ currentState }} -->
        </button>

        <button class="filter-button" @click="changeActiveState">
          <img
            src="../../assets/icons/bulb-off.svg"
            :class="getInactiveIconClass()"
          />
          <img
            src="../../assets/icons/bulb-on.svg"
            :class="getActiveIconClass()"
          />
          <!-- {{ currentState }} -->
        </button>
      </div>
      <!-- CLIENT LIST -->
      <ul style="width: 100%; display: flex; flex-direction: column">
        <ClientItem
          v-for="(clientData, index) in filteredClients"
          :key="index"
          v-bind:client="clientData"
        />
      </ul>
    </div>

    <div class="floating-container">
      <div class="floating-add" @click="toggleAddForm()">+</div>
    </div>
  </div>
</template>

<script>
import AddClientForm from "./AddClientForm.vue";
import ClientItem from "./ClientItem.vue";

export default {
  data() {
    return {
      allClients: [],
      showAddForm: false,
      searchValue: "",
      currentCommercialState: 1,
      currentActiveState: 1,
    };
  },
  components: {
    ClientItem,
    AddClientForm,
  },
  methods: {
    changeMessage() {
      this.message = "Hello, World!";
    },
    // addClient(){
    //   // window.api.addClient();
    //   // window.api.getNames()
    //   // .then((names) => {
    //   //   this.allClients = names;
    //   // })
    //   // .catch((err) => {
    //   //   console.log(err);
    //   // });
    // },
    toggleAddForm() {
      this.showAddForm = !this.showAddForm;
      // this.getPersons();
    },
    changeCommercialState() {
      this.currentCommercialState = (this.currentCommercialState + 1) % 3;
    },
    changeActiveState() {
      this.currentActiveState = (this.currentActiveState + 1) % 3;
    },
    getGovernmentIconClass() {
      if (this.currentCommercialState == 1) return "icon-light";
      else return "icon-dark";
    },
    getCompanyIconClass() {
      if (this.currentCommercialState == 0) return "icon-light";
      else return "icon-dark";
    },
    getInactiveIconClass() {
      if (this.currentActiveState == 1) return "icon-light";
      else return "icon-dark";
    },
    getActiveIconClass() {
      if (this.currentActiveState == 0) return "icon-light";
      else return "icon-dark";
    },
  },
  computed: {
    filteredClients() {
      return this.allClients.filter((client) => {
        const nameMatch = client.name
          .toLowerCase()
          .includes(this.searchValue.toLowerCase());
        const phoneMatch = client.phone_number
          .toLowerCase()
          .includes(this.searchValue.toLowerCase());
        const commercialMatch = (this.currentCommercialState == 2 || this.currentCommercialState == client.is_commercial);
        const activeMatch = (this.currentActiveState == 2 || this.currentActiveState == client.is_active);
        return (nameMatch || phoneMatch) && ( commercialMatch && activeMatch);
      });
    },
    currentState() {
      return this.states[this.currentStateIndex].name;
    },
    currentColor() {
      return this.states[this.currentStateIndex].color;
    },
  },
  mounted() {
    window.api
      .getClients()
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
.main-container {
  margin: auto;
  height: 88%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  background: linear-gradient(var(--light-background), white);
  padding: 0 0 10px 0px;
  /* background: red; */
}

.floating-container {
  /* background: yellow; */
  position: fixed;
  width: 100px;
  height: 100px;
  bottom: 0;
  right: 0;
  margin: 25px 25px;
}

.floating-container:hover .floating-add {
  transform: translatey(-3px);
  transition: all 0.3s;
  /* background: var(--dark-blue); */
}

.floating-add {
  position: absolute;
  width: 65px;
  height: 65px;
  background: var(--dark-blue);
  bottom: 0;
  border-radius: 50%;
  /* left: 0; */
  right: 0;
  color: white;
  line-height: 65px;
  text-align: center;
  font-size: center;
  font-size: 23px;
  z-index: 99;
  cursor: pointer;
}

.filer-panel {
  margin: 0 5% 0 5%;
  width: 90%;
  height: 45px;
  /* background-color: var(--light-blue); */
  /* background-color: var(--primary-color); */
  background-image: linear-gradient(
    to right,
    var(--dark-blue),
    var(--dark-mint)
  );
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.text-input {
  margin-left: 40px;
  background-color: var(--light-background);
  border: 1px solid transparent;
  border-radius: 35px;
  padding: 8px 12px;
  font-size: 15px;
  width: 200px;
  height: 30px;
  box-sizing: border-box; /* Include padding and border in element's total width and height */
  outline: none;
}

.filter-button {
  width: 70px;
  height: 30px;
  margin-left: 30px;
  /* padding: 0px 30px; */
  border: none;
  /* color: white; */
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 35px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: var(--light-background);
}

.icon-light {
  height: 20px;
  /* https://isotropic.co/tool/hex-color-to-css-filter/ */
  filter: invert(100%) sepia(100%) saturate(409%) hue-rotate(178deg)
    brightness(101%) contrast(84%);
}

.icon-dark {
  height: 20px;
  /* https://isotropic.co/tool/hex-color-to-css-filter/ */
  filter: invert(55%) sepia(32%) saturate(3822%) hue-rotate(166deg)
    brightness(95%) contrast(92%);
}
</style>